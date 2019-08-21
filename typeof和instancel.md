## Typeof

`typeof` 对于基本数据类型, 除了null 都可以给出正确的判断。
两种使用: `typeof(1)、typeof 1`
```type='javascript'
  typeof 1 // number
  typeof 'a' // string
  typeof false // boolean
  typeof undefined // undefined
  typeof a // undefined
  typeof Symbol() // symbol
  typeof null // object
```
`typeof` 对于对象, 除了函数都会显示 `object`
```type='javascript'
  typeof [] // object
  typeof {} // object
  typeof console.log // function
```

## instanceof
`instanceof` 正确的判断对象的类型
内部机制: 通过判断对象的原型链中能不能找到类型的prototype;
```type='javascript'
function instanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype;
  // 获得对象的原型
  left = left.__proto__;
  // 判断对象的类型是否等于类型的原型
  while(true) {
    if(left === null) {
      return false;
    }
    if(left === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}
```
```type='javascript'
let a = [];
let b = {};
a instanceof Array; // true
b instanceof Object; // true
```