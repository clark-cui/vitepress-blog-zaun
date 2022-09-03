---
title: React 简单优化
description: React
date: 2022-09-03
tags:
  - React
---

### 优化的原因

react里的一个基本常识是re-render：当一个组件里的某个状态改变的时候，他会重新渲染，也就是重新执行所有组件代码，包括它的子组件。

所以会带来很多不必要的重新渲染。

### useMemo

useMemo的基本理念是，它允许我们在渲染之间 "记住 "一个计算值

#### 使用的场景举例

```react
function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  const time = useTime();
  
  const allPrimes = React.useMemo(() => {
    const result = [];
    
    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }
    
    return result;
  }, [selectedNum]);
  
   return (
    <-省略dom-> 
   )
```

这里App组件里有一个状态selectedNum,还有一个自定义hook导出的状态time。假如不使用useMemo包裹allPrimes，那么每当time变化的时候，就会重新执行allPrimses里面的代码，造成浪费；然而我们的allPrimes其实只跟selectedNum相关，所以我们这里用useMemo缓存函数包裹后，里面的代码就只会在selectedNum变化时执行，而不受App组件的re-render影响。



当然，这里也可以有其他的写法，我们可以把allPrimes和selectedNum包括它的dom合并成一个子组件，time和它的dom也合并成一个子组件

```react
function App(){
  
  return(
  	<Time />
    <AllPrimes />
  )
}
```

这样，他们的状态隔离开，也可以实现当time里面的状态改变的时候，不会影响别的代码去re-render。

但是，有时候，我们反而是需要把状态放到外部组件的，因为可能有别的组件也同样依赖这个状态。

```react
function App(){
  const time = useTime();
  return(
  	<Time time={time} />
    <AllPrimes />
  )
}
```

这样的话，当App组件的time状态变化的时候，其实同样会使Time组件和AllPrimes组件re-render。这个时候，就可以使用React.memo来优化

```react
const PureAllPrimes = React.memo(AllPrimes);
function App(){
  const time = useTime();
  return(
  	<Time time={time} />
    <PureAllPrimes />
  )
}
```

React.memo可以把一个组件变成pure component，pure component只有在props变化的时候，才会re-render；

当然，也可以在AllPrimes组件里，导出的时候去使用React.memo

```react
export default React.memo(AllPrimes)
```



我们来举另外一个例子

Boxes是一个pure component,只有boxes变化的时候，才会re-render;

```react
function Boxes({ boxes }) {
  return (
    <div className="boxes-wrapper">
      {boxes.map((boxStyles, index) => (
        <div
          key={index}
          className="box"
          style={boxStyles}
        />
      ))}
    </div>
  );
}

export default React.memo(Boxes);
```

App组件里引用了Boxes,并声明常量boxes传入Boxes组件里

```react
import Boxes from './Boxes';

function App() {
  const [name, setName] = React.useState('');
  const [boxWidth, setBoxWidth] = React.useState(1);
  const boxes = [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
  
  return (
    <>
      <Boxes boxes={boxes} />
      <-省略dom->
    </>
  );
}
```

当状态name变化的时候，我们期望只是re-render App组件，Boxes组件不re-render，然而Boxes组件仍然re-render了。这是因为，App组件re-render的时候，重新生成了boxes变量，尽管是同样的值，但不是一个引用，所以导致了Boxes组件的re-render

要解决这个问题，只需要使用useMemo包裹一下即可

```react
const boxes = React.useMemo(() => {
  return [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
}, [boxWidth]);
```



### UseCallback

它跟useMemo是一样的，都是缓存函数，但是他缓存的不是值，而是函数；

#### 使用场景举例

MegaBoost是一个pure component,接受一个callback回调函数，只有当callback变化的时候才会re-render

```react
function MegaBoost({ handleClick }) {
  console.log('Render MegaBoost');
  
  return (
    <button
      className="mega-boost-button"
      onClick={handleClick}
    >
      MEGA BOOST!
    </button>
  );
}

export default React.memo(MegaBoost);
```

App组件里引用了MegaBoost

```react
function App() {
  const [count, setCount] = React.useState(0);
  function handleMegaBoost() {
    setCount((currentValue) => currentValue + 1234);
  }

  return (
    <>
      Count: {count}
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click me!
      </button>
      <MegaBoost handleClick={handleMegaBoost} />
    </>
  );
}

export default App;
```

App里声明了一个状态count，一个函数handleMegaBoost并传入MegaBoost组件。

当状态count变化的时候，会触发App组件的re-render，并且重新生成一个新的handleMegaBoost传入MegaBoost组件，导致MegaBoost组件的re-render。

怎么解决这个问题呢？很简单，使用缓存函数即可

```react
const handleMegaBoost = React.useMemo(() => {
  return function() {
    setCount((currentValue) => currentValue + 1234);
  }
}, []);
```

但是，一般我们更倾向于使用useCallback

```react
const handleMegaBoost = React.useCallback(() => {
  setCount((currentValue) => currentValue + 1234);
}, []);
```

### 总结

1. 组件里一些”经过复杂的逻辑计算而得到某个值“需要使用Usememo包裹，保证组件在re-render的时候不去重复计算
2. 父子组件的场景，子组件尽量用React.memo包裹成pure component，避免父组件的re-render导致子组件跟着一起re-render
3. 父子组件的场景，父组件声明变量传入子组件的时候，尽量用useMemo包裹，避免父组件re-render导致重新生成变量，而进一步导致子组件的re-render
4. 父子组件的场景，副组件声明callback传入子组件的时候，尽量使用useCallback包裹，避免父组件re-render导致重新生成callback，而进一步导致子组件的re-render

### 引用链接

[引用链接](https://www.joshwcomeau.com/react/usememo-and-usecallback/#use-case-2-preserved-references)
