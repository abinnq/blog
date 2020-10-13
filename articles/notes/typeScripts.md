## 一、基础

### 1.原始数据类型
> JS原始数据类型包括：String、Number、Bigint、Boolean、Null、Undefined、Symbol
> 需要注意 String、Number、Boolean 使用构造函数`new`创建的都是其对象，直接调用返回的是原始类型值
*Boolean*
```ts
let isDone: boolean = false;

// 构造函数创建的是Boolean对象， 不是boolean值
isDone = new Boolean(1); // ✗ 
// 直接调用Boolean 返回的是Boolean值
isDone = Boolean(1); // ✓
```

*Number*
```ts
let decLiteral: number = 6;
```

*String*
```ts
let name: string = 'xxx';
```

*Void*
`void` 表示没有返回值的函数，`void` 声明的变量仅可赋值为`undefined`和`null`；
```ts
function alertName():void {
  alert('my name');
}

let unusable:void = null; // ✓
let unusable:void = 1; // ✗ Type 1 is not assignable to type void;
```

*Null、Undefined*
可以用来定义原始数据类型， 并且与`void`的不同是 所有类型的子级

```ts
let n: null = null;
let u: undefined;
let num: number = u;
```

### 2.任意值
使用`any`表示允许赋值为任意类型

### 3.类型推论




## 二、进阶

### 1.类型别名
使用`type`给一个类型起一个新名字
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  return typeof n === 'string' ? n : n();
}
```


### 2.字符串字面量类型
使用`type`用来约束取值只能是某几个字符串中的一个
```ts
type EventNames = 'click' | 'scroll';
function handleEvent(event: EventName) {}

handleEvent('click'); // ✓
handleEvent('dbclick'); // ✗， event 不能为dbclick
```

### 3.元组
> 数组合并了相同类型的对象， 元组(tuple)合并了不同类型的对象;

```js
let tom: [string, number] = ['Tom', 25];
tom[0] = 'xxx'; // ✓
tom = ['tom'] // ✗ 直接对元组类型的变量进行初始化或者赋值时，需要提供元组中指定的项
tom.push('xxxx') // ✓
tom.push(true)// ✗ 添加越界元素时， 类型会被限制为元组每个类型的联合类型
```

### 4.枚举
> 使用`enum` 定义一些带名字的常量
枚举成员会被赋值从0开始增长的数字， 同时也会对枚举值到枚举名进行反向映射
```ts
enums Days {Sun, Mon, Tue};
// 等同于
var Days;
(function(Days) {
  Days[Days['Sun'] = 0] = 'Sun';
  Days[Days['Mon'] = 1] = 'Mon';
  Days[Days['Tue'] = 2] = 'Tue';
})(Days || (Days = {}))

// Days {0: 'Sun', 1: 'Mon', 2: 'Tue', Sun: 0, Mon: 1, Tue: 2}
```



### 8.泛型
> 泛型（Generics）: 在定义函数接口或类的时候，不预先指定具体类型，而在使用时在指定类型的一种特性
 
```ts
// 没有准确的定义返回值类型
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for(let i=0; i<length; i++) {
    result[i] = value; 
  }
  return result;
}
```

在函数名后添加`<T>`, `T`用来指定任意输入类型，根据类型推论自动推出来
```ts
function createArray<T>(length: number, value: T): Array<T> {
  return Array.from(new Array(length).map(() => value));
}
```

*多个类型参数*
```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
```

*泛型约束*
操作泛型变量时，事先不知道那种类型，所以不能随意操作它的属性
```ts
function loggingIdentity<T>(arg: T):T {
  console.log(arg.length);
  return arg;
}
// index.ts(2, 19): error TS2339: Prototype 'length' does not exist on type 'T'
```

使用`extends` 约束了泛型`T` 继承了`Lengthwise`

```ts
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

*泛型接口*
用接口的方式定义一个函数需要符合的形状

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: sting, subString: string) {
  return source.search(subString) !== 1;
}
```
```ts
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}
let createArray: CreateArrayFunc<any>;
createArray = function<T> (length: number, value: T): Array<T> {
  return Array.from(new Array(length)).map(() => value);
}
```

*泛型类*
泛型用于类的类型定义
```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y};
```

*泛型参数的默认类型*
TypeScript2.3以后可以给泛型中的类型参数指定默认类型
优先级：
使用泛型时指定参数类型 > 根据实际参数类型推论类型 > 默认类型
```ts
function createArray<T = string>(length: number, value: T): Array<T> {
  return Array.from(new Array(length)).map(() => value);
}
```

### 9.声明合并
> 如果定义了两个相同名字的函数、接口或类，那么他们会合并成一个类型

*函数的合并*
```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: string | number): number | string {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  }
  return x.split('').reverse().join('');
}
```

*接口的合并*
```ts
interface Alarm {
  price: number;
}

interface Alarm {
  weight: number;
}

// 等同于下面, 合并的属性类型必须是唯一的
interface Alarm {
  price: number;
  weight: number;
}
```

*类的合并*
与接口一致