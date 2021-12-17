# tsconfig

## noImplicitAny

ts 有隐式类型推断。开启后隐式 any 的推断会被检查并报错。

```typescript
// x被隐式推断成any,抛出错误
function getNum(x) {
  return x;
}
// problems: Parameter 'x' implicitly has an 'any' type.
```

```typescript
// 主动声明x是any避免错误
function getNum(x: any) {
  return x;
}
```

```typescript
// 这种情况不会报错，因为隐式推断成undefined
let y;
console.log(y);
```

```typescript
// 这种情况也不会报错，因为赋值的时候类型推断成number
let z;
z = 123;
console.log(z);
```

## strictNullChecks

默认情况 undefined 和 null 是其他类型的子类型，也就是其他类型变量可以被赋值 null 或 undefined。开启后会检查这种情况并报错。

```typescript
let num: number = undefined;
// problems:Type 'undefined' is not assignable to type 'number'.
```

## noEmitOnError

ts 默认即使编译报错也会生成 Js 文件，这一项设置 true,可以在报错的时候，不生成 js
