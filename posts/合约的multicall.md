---
title: 合约的multicall
description: 合约的multicall
date: 2023-03-20
tags:
  - 区块链
---

## 背景

我们和链上交互的时候，如果有从链上读取信息的需求，那么就需要去请求 rpc 节点。如果我们需要从一个合约的多个方法，或者是多个合约上获取信息，就需要对这些分别调用，每一个调用都会发送一个 rpc 请求。
基于此，如果我们再有类似，监听区块变化去更新数据的需求，那么 rpc 请求会非常的多，影响性能，甚至有时候会被某些节点屏蔽掉
同时，如果数据有很强的时效性，那么单独去请求，可能会导致返回的数据来源于不同的区块。

## 介绍

针对上面提到的问题，已经有人提出很好的解决方案，那就是 multicall
这减少了需要发送的单独的 JSON RPC 请求的数量（如果使用像 Infura 这样的远程节点，特别有用），同时也提供了保证，所有返回的值都来自同一个区块（像原子读取），并返回值的区块编号（给他们重要的背景，所以如果来自过时的节点，来自旧区块的结果可以被忽略）

## 实现原理

### 合约

一般用的 makerdao 的那套标准，主要的有 3 个合约：

**Multicall:**

原始合约，包含一个批量调用的聚合方法

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

contract Multicall {
struct Call {
address target;
bytes callData;
}

    function aggregate(Call[] calldata calls) public returns (uint256 blockNumber, bytes[] memory returnData) {
        blockNumber = block.number;
        returnData = new bytes[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory ret) = calls[i].target.call(calls[i].callData);
            require(success);
            returnData[i] = ret;
        }
    }

...
}
```

**Multicall2:**

与 Multicall 相同，但提供了额外的功能，允许批量内的调用失败。对于调用可能根据合同的状态而失败的情况很有用。

```Solidity
function tryAggregate(bool requireSuccess, Call[] calldata calls) public returns (Result[] memory returnData) {
returnData = new Result[](calls.length);
for (uint256 i = 0; i < calls.length; i++) {
(bool success, bytes memory ret) = calls[i].target.call(calls[i].callData);

            if (requireSuccess) {
                require(success, "Multicall2 aggregate: call failed");
            }

            returnData[i] = Result(success, ret);
        }
    }

    function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls) public returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData) {
        blockNumber = block.number;
        blockHash = blockhash(block.number);
        returnData = tryAggregate(requireSuccess, calls);
    }

    function blockAndAggregate(Call[] calldata calls) public returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData) {
        (blockNumber, blockHash, returnData) = tryBlockAndAggregate(true, calls);
    }
```

**Multicall3:**

这是推荐的版本。它的 ABI 向后兼容 Multicall 和 Multicall2，但它的使用成本更低（所以你可以在一个请求中容纳更多的调用），而且它增加了一个 aggregate3 方法，所以你可以在每个调用的基础上指定是否允许调用失败。

```Solidity
function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData) {
uint256 length = calls.length;
returnData = new Result[](length);
Call3 calldata calli;
for (uint256 i = 0; i < length;) {
Result memory result = returnData[i];
calli = calls[i];
(result.success, result.returnData) = calli.target.call(calli.callData);
assembly {
// Revert if the call fails and failure is not allowed
// `allowFailure := calldataload(add(calli, 0x20))` and `success := mload(result)`
if iszero(or(calldataload(add(calli, 0x20)), mload(result))) {
// set "Error(string)" signature: bytes32(bytes4(keccak256("Error(string)")))
mstore(0x00, 0x08c379a000000000000000000000000000000000000000000000000000000000)
// set data offset
mstore(0x04, 0x0000000000000000000000000000000000000000000000000000000000000020)
// set length of revert string
mstore(0x24, 0x0000000000000000000000000000000000000000000000000000000000000017)
// set revert string: bytes32(abi.encodePacked("Multicall3: call failed"))
mstore(0x44, 0x4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000)
revert(0x00, 0x64)
}
}
unchecked { ++i; }
}
}
```

### 前端调用

> 前端调用示例基于 ethers.js

**使用 Multicall:**

```TypeScript
export async function all<T extends any[] = any[]>(
calls: ContractCall[],
multicallAddress: string,
provider: Provider,
): Promise<T> {
const multicall = new Contract(multicallAddress, multicallAbi, provider);
const callRequests = calls.map(call => {
const callData = Abi.encode(call.name, call.inputs, call.params);
return {
target: call.contract.address,
callData,
};
});
const response = await multicall.aggregate(callRequests);
const callCount = calls.length;
const callResult = [] as T;
for (let i = 0; i < callCount; i++) {
const outputs = calls[i].outputs;
const returnData = response.returnData[i];
const params = Abi.decode(outputs, returnData);
const result = outputs.length === 1 ? params[0] : params;
callResult.push(result);
}
return callResult;
}
```

**使用 Multicall3:**

```TypeScript
export async function multicall({
allowFailure = true,
chainId,
contracts,
overrides
}) {
const multicallContract = getContract({
address: chain.contracts.multicall3.address,
abi: multicallABI,
signerOrProvider: provider
});

const calls = contracts.map(({ address, abi, functionName, ...config }) => {
const { args } = config || {};
const contract = getContract({ address, abi });
const params = args ?? [];
const normalizedFunctionName = normalizeFunctionName({
contract,
functionName,
args
});
try {
const contractFunction = contract[normalizedFunctionName];
if (!contractFunction)
logWarn(
`"${normalizedFunctionName}" is not in the interface for contract "${address}"`
);
const callData = contract.interface.encodeFunctionData(
normalizedFunctionName,
params
);
return {
target: address,
allowFailure,
callData
};
} catch (err) {
if (!allowFailure) throw err;
return {
target: address,
allowFailure,
callData: '0x'
};
}
});

const params = [...[calls], ...(overrides ? [overrides] : [])];
const results = await multicallContract.aggregate3(...params);
return results.map(({ returnData, success }, i) => {
const { address, abi, functionName, ...rest } = contracts[i];

    const contract = getContract({
      address,
      abi: abi as Abi
    });
    const args = rest.args as unknown[];
    const normalizedFunctionName = normalizeFunctionName({
      contract,
      functionName,
      args
    });

    if (!success) {
      let error;
      try {
        contract.interface.decodeFunctionResult(
          normalizedFunctionName,
          returnData
        );
      } catch (err) {
        error = new ContractMethodRevertedError({
          address,
          args,
          chainId: chain.id,
          functionName: normalizedFunctionName,
          errorMessage: (err as Error).message
        });
        if (!allowFailure) throw error;
        logWarn(error.message);
      }
      return null;
    }

    if (returnData === '0x') {
      const error = new ContractMethodNoResultError({
        address,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName
      });
      if (!allowFailure) throw error;
      logWarn(error.message);
      return null;
    }

    try {
      const result = contract.interface.decodeFunctionResult(
        normalizedFunctionName,
        returnData
      );
      return Array.isArray(result) && result.length === 1 ? result[0] : result;
    } catch (err) {
      const error = new ContractResultDecodeError({
        address,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName,
        errorMessage: (err as Error).message
      });
      if (!allowFailure) throw error;
      logWarn(error.message);
      return null;
    }

});
}
```

## 问题

1. 为什么 wagmi 的 multicall 调用 allowFailure 并不是每一项都可配置？https://wagmi.sh/core/actions/multicall#allowfailure-optional

答：是这个库故意这么封装的，可以看到他把 multicall 方法接收的参数 allowFailure 在遍历 calls 的时候拼接进去了

2. 为什么上面提到的都是读方法，写方法可以 multicall 吗？

答：可可以。但是一般不建议这么做，一般写方法的聚合会在合约端实现，并不需要前端调用的时候去 multicall。因为如果需要在合约里调用合约，那么合约去实现的话，会在实现的时候有一定的优化，直接 multicall 粗暴的调用不安全，也会消耗更多的 gas。而且批量调用写合约的时候，msg.sender 和 msg.value 可能会不符合预期。所以大部分封装了 multicall 的库都会提示，他们的 multicall 方法只支持 read-only 方法的聚合调用https://docs.ethers.org/v5/api/contract/contract/#Contract--readonly

3. Dex 的首次 swap，需要先授权，再进行 swap，那这一步可以通过 multicall，来实现授权转账合并为 1 步吗？

答：不行。因为转账这步操作依赖授权的结果，这俩动作并不能同时进行。转账需要在授权的结果上链之后，才可以进行

## reference

1. https://github.com/cavanmflynn/ethers-multicall/blob/master/src/call.ts
2. https://github.com/Destiner/ethcall/blob/master/src/call.ts
3. https://github.com/wagmi-dev/wagmi/blob/main/packages/core/src/actions/contracts/multicall.ts#L110
4. https://github.com/makerdao/multicall
5. https://github.com/mds1/multicall
