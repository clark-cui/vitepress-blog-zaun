# Why my note?

## first

### second

#### third

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number | undefined; // 因为age不一定有，可能是undefined
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```
