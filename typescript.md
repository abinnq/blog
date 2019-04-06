# TypeScript 了解一下
## Table of Contents
  1. [什么是TypeScript](#什么是TypeScript？)
  2. [安装与运行TypeScript](#安装与运行TypeScript)
  3. [基础](#基础) 
  4. [对象的类型--接口](#对象的类型--接口)
  5. [数组的类型](#数组的类型)
  6. [函数的类型](#函数的类型)
  7. [声明文件](#声明文件)
  8. [内置对象](#内置对象)
  9. [类型别名](#类型别名)
  10. [字符串字面量类型](#字符串字面量类型)
  11. [元组](#元组)
  12. [枚举](#枚举)
  13. [类](#类)
  14. [类与接口](#类与接口)
  15. [泛型](#泛型)
## 什么是TypeScript？
  --TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

  **与Eslint的区别**
    Eslint: 代码风格和低级错误的检查;
    TypeScript: 静态类型检测;

## 安装与运行TypeScript

1. 全局安装TypeScript
  ```type='typescript'
    yarn global add typescript 
  ```
2. 编译TypeScript
  ```type='typescript'
  tsc hello.ts // 编写React时以 .tsx 为后缀
  ```
3. tsconfig.json 配置文件
  每个 TypeScript 项目都需要一个tsconfig.json来指定相关配置, VSCode 也可以运行任务 Shift+command+B 
  ```type='json'
  {
    "compilerOptions": {
    "target": "es5", // 指定代码编译成es5
    "noImplicitAny": false, // 当表达式和申明 类型为any时，是否需要发出警告
    "module": "amd", // 指定使用模块机制
    "removeComments": false, // 是否需要输出注释
    "sourceMap": false, // 是否会生成.map文件, 以便调试定位源码
    "outDir": "js" //你要生成js的目录
    }
  }
  ```
## 基础

### 1.原始数据类型
1. 布尔值类型 
  ```type='typescript'
  let isDone: boolean = false;
  let isDone: boolean = Boolean(0);
  ```
2. 数值类型
  ```type='typescript'
  let decimalLiteral: number = 6; 
  let binaryLiteral: number = 0b1010; // 二进制
  ```
3. 空值
  ```type='typescript'
  function warnUser(): void {
    console.log('this is my warning message');
  }
  ```
4. Null 和 Undefined
undefined he null 是所有类型的子类型, 
  ```type='typescript'
  let num: undefined = undefined;
  num = null;
  ```
### 2.任意值
 任意值(Any) 用来表示允许赋值为任意类型
 1. 什么是任意值
 ```type='typescript'
  let myFavoriteNumber: string = 'seven';
  myFavoriteNumber = 7 // x
  
  let myFavoriteNumber: any = 'seven';
  myFavoriteNumber = 7; // ✓
 ```

 2. 任意值的属性和方法
    在任意值上访问任何属性和方法都是允许的, 生命一个变量为任意值后, 对它的操作, 返回的内容都是任意值
  ```type='typescript'
  let anyThing: any = 'hello';
  console.log(anyThing.name); // ✓
  anyThing.seyHello(); // ✓ 
  ```
  3. 为声明类型的变量
    变量在声明的时候未指定类型,那末它被识别为任意类型
  ```type='typescript'
  let something; // 等同于 let something: any;
  something = 'seven' // ✓
  ```

### 3. 类型推论
没有明确的指定类型, TypeScript会依照类型推论(Type Inference) 的规制判断出一个类型,
定义的时候没有赋值, 则会被推断出`Any`类型, 从而不进行类型检查

```type='typescript'
let myFavoriteNumber = 'seven'; // 等同于 let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7; // x
```

### 4.联合类型

联合类型(Union Types) 表示取值可以为多种类型中的一种
```type='typescript'
let myFavoriteNumber: sting | number;
myFavoriteNumber = 'seven'; // ✓
myFavoriteNumber = 7; // ✓
```
**访问联合类型的属性或方法**

```type='typescript'
function foo(something: string | number) {
  console.log(something.length); // x number 没有length属性
  console.log(something.toString()); // ✓ toString()是string 和 number
}
```
## 对象的类型--接口
 在TypeScript 中, 使用接口(Interfaces) 来定义对象的类型。
 1. 什么是接口
    在面向对象语言中, 接口(Interfaces) 是对行为的抽象, 具体的行动由类(classes)去实现;
    TypeScript 中的接口是相对灵活的概念, 对类的一部分行为抽象,也可以描述对象的形状(Shape);
    接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
  ```type='typescript'
  interface Person {
    name: string;
    age: number;
  }
  let tom: Person = {
    name: 'Tom',
    gender: 'male', // x 不允许添加接口未定义的属性, 少的也是不可以
    age: 'seven', // x age 的接口类型为number
  };
  ```

 2. 可选属性
    可选属性用`?`表示, 该属性可以不存在
  ```type='typescript'
  interface Person {
    name: string;
    age?: number;
  }
  let tom: Person = {
    name: 'Tom',
  };
  ```
  3. 任意属性
    一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集,
  ```type='typescript'
    interface Person {
      name: string;
      age?: number;  // x  [propName: string]: string 表示 类型只能为String
      [propName: string]: string;
    }
    let tom: Person = {
      name: 'Tom',
    };
  ```
  4. 只读属性
  ```type='typescript'
  interface Person {
    readonly id: number;
    name: string;
    age?: number;
  }
  let tom: Person = {
    id: 123,
    name: 'Tom',
  };
  tom.id = 78; // x id 为只读属性
  ```
## 数组的类型

1. 表示方法
  使用类型 + 方括号 表示
  ```type='typescript'
  let anyArray: any[] = [1, 'a', 3];
  let numberArray: number[] = [1, 2, 3];
  numberArray.push('a'); // x 不允许字符类型 
  ```

2. 数组泛型
  ```type='typescript'
  let numberArray = Array<number> = [1, 2, 3];
  ```

3. 用接口表示数据
  ```type='typescript'
  interface NumberArray = {
    [index: number]: number;
  };   
  ```
  
4. 类数组
  ```type='typescript'
  function sum() {
    let args: number[] = arguments; 
  }
  ```
## 函数的类型
1. 函数的声明
  ```type='typescript'
  // 函数声明
  function sum(x, y) {
    return x + y;
  }

  // 函数表达式
  let mySum = function (x, y) {
    return x + y;
  };
  
  // 函数声明类型的定义 输入和输出
  function sum(x: number, y: number): number {
    return x + y;
  }
  sum(1,2,3); // x 输入不可多余定义
  sum(1); // x 输入不可少于定义
  ```

2. 函数表达式
  
   对等号右侧的匿名函数进行类型定义, 等号左边的mySum 是通过赋值类型进行推论而判断出来的
  ```type='typescript'
  let mySum = function (x: number, y: number): number {
    return x + y;
  };
  ```

  手动给mySum 添加类型
  ```type='typescript'
  let mySum: (x: number, y: number) => number = function (x: number, y: number) {
    return x + y;
  };
  ```
  在TypeScript 中的 `=>` 用来表示函数的定义, 左边是输入类型, 右边是输出类型
  在ES6中`=>` 叫做箭头函数

3. 用接口定义函数的形状
  
  ```type='typescript'
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
  }
  ```

4. 可选参数
  用`？` 表示可选参数, **注意** 可选参数后面,不能再出现必选参数
  ```type='typescript'
  function buildName(firstName: string, lastName?: string) {
    return lastName ? lastName + ' ' + firstName : firstName;
  }

  buildName('tom', 'cat');
  ```
5. 参数默认值
  TypeScript会将添加了默认值的参数识别为可选参数, 此时*可选参数必须接在必需参数后面* 就不受限制了
  ```type='typescript'
  function buildName(firstName: string, lastName: string = 'abin') {
    return firstName + ' ' + lastName;
  }
  ```

6. 剩余参数
  用`...rest` 的方式获取函数中的剩余参数, rest参数只能是最后一个参数
  ```type='typescript'
  function push (array: any[], ...items: any[]) {
    items.forEach(function(item) {
      array.push(item);
    });
  }
  ```
7. 重载
  重载允许一个函数接受不同数量或类型的参数,作出不同的处理, 
  ```type='typescript'
  function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
  }
  ```

  ```type='typescript'
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
          return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
          return x.split('').reverse().join('');
      }
    }
  ```

## 7. 声明文件

## 8.内置对象
javascript 中有很多 内置对象 ,它可以直接在TypeScript中当作定义好的类型

1. ECMAScript 的内置对象
  Boolean、Error、Date、RegExp等 可以将变量定义为这些类型
  ```type='typescript'
  let b: Boolean = true;
  let e: Error = new Error('error occurred');
  ```

2. DOM 和 BOM 的内置对象
  Document、HTMLElement、Event、NodeList(节点集合)等
  ```type='typescript'
  let body: HTMLElement = document.body;
  let allDiv: NodeList = document.querySelectorAll('div');
  ```

3. TypeScript 核心库的定义文件
   Math、

4. 用TypeScript 写 Node.js
   Node.js 不是内置对象的一部分, 需要引入第三方声明文件
  ```type='typescript'
  npm install @types/node --sav-dev
  ```

## 9.类型别名
类型别名用来给一个类型起个新名字 关键字 `type`
```type='typescript'
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 10. 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串;
```type='typescript'
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventName) {
  // do something
}

handleEvent(document.getElementById('hello'), 'click'); // ✓
handleEvent(document.getElementById('word'), 'dbclick'); // x 不在event 的约束取值范围内
```

## 11. 元组
  数组合并了相同类型的对象, 元组合并了不同类型的对象
  ```type='typescript'
  let abin: [string, number];
  abin[0] = 'abin'; // ✓
  abin = ['abin']; // x
  abin = ['abin', 18]; // ✓
  abin.push('aaa'); // ✓
  abin.push(true); // x 添加了越界元素 没有Boolean类型
  ```

## 12. 枚举
使用`enum` 关键字来定义枚举, 用于取值被限定在一定范围内的场景
1. 举个例子
  枚举成员会被赋值为 从 **0**开始递增的数字同时也对枚举名进行反响映射
```type='typescript'
enum Days {Mon, Tue};
// 会被编译为
var Days;
(function (Days) {
  Days[Days['Mon'] = 0] = 'Mon';
  Days[Days['Tue'] = 1] = 'Tue';
})(Days || (Days = {}));

console.log(Days);  // Days {0: "Mon", 1: "Tue", Mon: 0, Tue: 1}
```
2. 手动赋值
TypeScript 不会对重复取值报错,会覆盖, 建议不要怎么操作
```type='typescript'
enum Days {Mon = 2, Tue = 1, Wed};
// 会被编译为
var Days;
(function (Days) {
  Days[Days['Mon'] = 2] = 'Mon';
  Days[Days['Tue'] = 1] = 'Tue';
  Days[Days['Wed'] = 2] = 'Wed';
})(Days || (Days = {}));
// Days['Wed'] = 2
```

手动赋值可以不是数字, 但是需要类型断言
```type='typescript'
enum Days {Mon = 2, Tue = <any> 's'};
// 编译为
var Days;
(function (Days) {
    Days[Days["Mon"] = 2] = "Mon";
    Days[Days["Tue"] = 's'] = "Tue";
})(Days || (Days = {}));
```

手动赋值为小数或负数, 后续增长仍然为 `1`
```type='typescript'
enum Days {Mon = 0.1, Tue, Med};
// 编译为
var Days;
(function (Days) {
    Days[Days["Mon"] = 0.1] = "Mon";
    Days[Days["Tue"] = 1.1] = "Tue";
    Days[Days["Med"] = 2.1] = "Med";
})(Days || (Days = {}));
```
3. 常数项和计算所得项
  枚举的类型：常数项(上面例子都是)、计算所得项 `'red'.length` 就是计算所得项
  ```type='typescript'
  enum Color {Red ='red'.length};
  enum Colors {Red ='red'.length, Blue}; // x 计算所得项后面未手动赋值会报错
  ```
4. 常数枚举
  使用 `const enum` 定义的枚举类型, 不可包含计算成员
  ```type='typescript'
  const enum Directions {
    up,
    down,
  };
  
  let directions = [Directions.up, Directions.down];
  // 编译结果

  var directions = [0 /*up*/, 1 /*down*/];
  ```

5. 外部枚举
  使用 `declare enum` 定义的枚举类型 declare定义的类型, 只是用于编译时的检查 

## 13. 类
类的概念
- 类(Class): 定义了一件事物的抽象特点, 包含它的属性和方法
- 对象(Object): 类的实例, 通过`new` 生成
- 面向对象(OOP): 封装、继承、多态
- 封装(Encapsulation): 将对数据的操作细节隐藏起来, 只暴露对外的接口。外部调用也不需要细节, 就能通过对外提供的接口来访问该对象, 同时保证了外界无法更改对象内部的数据
- 继承(Inheritance): 子类继承父类, 子类除了拥有父类的所有特性外, 还有一些更具体的特性
- 多态(Polymorphism): 由继承产生了相关的不同的类, 对同一个方法可以有不同的响应比如 `Cat` 和 `Dog` 都继承自 `Animal` , 但是分别实现了自己的`eat`方法程序会自动判断出来该如何执行`eat` 方法
- 存取器(getter & setter): 用于改变属性的读取和赋值行为
- 修饰符(Modifiers): 修饰符是一些关键字,用于限定成员类型的性质。 比如 `public` 表示公有属性或者方法
- 抽象类(Abstract Class): 抽象类提供其他类继承的基类, 抽象类不允许被实例化, 抽象类中的抽象方法必须在子类中被实现
- 接口(Interfaces): 不同类之间你公有的属性或方法,可以抽象成一个接口, 接口可以被类实现, 一个类只能继承自另一个类, 但可以实现多个接口

ES6 中类的用法
1. 属性和方法
  使用 `class` 定义类, 使用 `constructor` 定义构造函数。
  通过`new` 生成新实例的时候, 会自动调用构造函数
  ```type='javascript'
  class Animal {
    constructor(name) {
      this.name = name;
    }
    sayHi() { 
      return `my name is ${this.name}`;
    }
  }
  let a = new Animal('abin');
  console.log(a.sayHi('abin'));
  ```
2. 类的继承
  使用`extends` 关键字实现继承, 子类中使用 `super`关键字来调用父类的构造函数和方法。
  ```type='javascript'
    class Cat extends Animal {
      constructor(name) {
        super(name);
        console.log(this.name);
      }
      sayHi() {
        return 'Meow,' + super.sayHi(); // 调用父类的sayHi()
      }
    }
    let c = new Cat('abin');
    console.log(c.sayHi()); // Meow, my name is abin
  ```

3. 存取器
  使用getter 和 setter 可以改变属性的赋值和读取行为
  ```type='javascript'
  class Animal {
    constructor(name) {
      this.name = name;
    }

    get name() {
      return 'tom';
    }
    set name(value) {
      console.log('setter: ' + value);
    }
  }

  let a = new Animal('abin');
  a.name = 'abin'; // setter: abin
  console.log(a.name); // tom
  ```
4. 静态方法
  使用 `static` 修饰符修饰的方法称为静态方法,它们不需要实例化, 而是直接通过类来调用
  ```type='javascript'
  class Animal {
    statice isAnimal(a) {
      return a instanceof Animal;
    }
  }

  let a = new Animal('tom');
  Animal.isAnimal(a); // true
  a.isAnimal(a);
  ```
**Typescript 中类的用法**
三种修饰符
- `public`  修饰的属性和方法是公有的, 可以在任何地方被访问
```type='typescript'
  class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
  }
  let a = new Animal('cat');
  console.log(a.name); // cat
  a.name = 'dog';
  console.log(a.name); // dog
```

- `private` 修饰的属性和方法是私有的, 不能在声明它类的外部访问到
```type='typescript'
  class Animal {
    private name;
    public constructor(name) {
      this.name = name;
    }
  }
  let a = new Animal('cat');
  console.log(a.name); // x name 属性是私有的 只能在类中修改

  // 编译成
  var Animal = (function() {
    function Animal(name) {
      this.name = name;
    }
    return Animal;
  })();
  var a = new Animal('cat');
  console.log(a.name);
```
private 修饰的属性或方法，在子类中也是不允许访问的
```type='typescript'
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name); // x
    }
}
```
- `protected` 修饰的属性和方法 是受保护的, 类似 private, 区别是它在子类中也是允许被访问的
```type='typescript'
class Animal {
    protected name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}
```

**抽象类**
`abstract` 用于定义抽象雷和其抽象方法
1. 抽象类不允许被实例化
  ```type='typescript'
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    public abstract sayHi();
  }

  let a = new Animal('cat'); // x 
  ```
2. 抽象类必须被子类实现
  ```type='typescript'
  abstract class Animal {
      public name;
      public constructor(name) {
          this.name = name;
      }
      public abstract sayHi();
  }

  class Cat extends Animal {
      public eat() {
          console.log(`${this.name} is eating.`);
      }
  }

  let cat = new Cat('Tom');
  ```
  使用 cat 继承了 抽象类Animal, 但是没有实现方法 sayHi, 故报错

  3. 正确使用抽象类
    ```type='typescript'
    abstract class Animal {
        public name;
        public constructor(name) {
            this.name = name;
        }
        public abstract sayHi();
    }

    class Cat extends Animal {
        public sayHi() {
            console.log(`Meow, My name is ${this.name}`);
        }
    }

    let cat = new Cat('Tom');
    ```
**类的类型**
```type='typescript'
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHiy(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('cat');
console.log(a.sayHi()); // My name is cat
```

## 14. 类与接口

 **类实现接口**
  一个类只能继承自类一个类, 不同的类之间有一些共同的特性, 这时候就可以把特性提取成接口, 用 `implements` 关键字
  
  举个例子： 门是一个类, 防盗门是门的子类, 防盗门有报警器的功能, 可以给防盗门加个报警器的方法, 但是, 这时候有另外一个类, 车, 也有报警器的功能, 就可以把报警器提取出来, 作为一个接口, 防盗门 和车都去实现它

  ```type='typescript'
  interface Alarm {
    alert();
  } 

  class Door { 
  }

  class SecurityDoor extends Door implements Alarm {
    alert() {
      console.log('SecurityDoor alert');
    }
  }

  class Car implements Alarm {
    alert() {
      console.log('Car alert');
    }
  }
  ```

  **一个类实现多个接口**
  ```type='typescript'
  interface Alarm {
    alert();
  }

  interface Light {
    lightOn();
    lightOff();
  }

  class Car implements Alarm, Light {
    alert() {
      console.log('Car alert');
    }

    lightOn() {
      console.log('Car light on');
    }

    lightOff() {
      console.log('Car light off');
    } 
  }
  ```
  **接口继承接口**
  ```type='typescript'
  interface Alarm {
    alert();
  }

  interface LightableAlarm extends Alarm() {
    lightOn();
    lightOff();
  }
  ```
  **接口继承类**
  ```type='typescript'
  class Point {
    x: number;
    y: number;
  }

  interface Point3d extends Point {
    z: number;
  }

  let point3d: Point3d = {x: 1, y: 2, z: 3};
  ```
  **混合类型**
  使用接口来定义函数需要符合的形状
  ```type='typescript'
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
  }
  ```
## 15. 泛型
  泛型(Generics) 是指在定义函数、接口或类的时候, 不预先指定类型, 在使用的时候再指定类型
  ```type='typescript'
  function createArray(length: number, value: any): Array<any> {
    let result = [];
    for(let i =0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }

  createArray(3, 'x');
  ```