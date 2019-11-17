# this

**词法作用域 or 动态作用域?**

javaScript 采用的是词法作用域, 即在编程阶段作用域就已经明确下来了

javaScript 的this机制和动态作用域类似。 在运行时才被调用的地方动态绑定

**四种绑定规则**
>大多数情况下, 函数的调用决定了this的指向。
- 默认绑定
- 隐式绑定
- 显示绑定
- new绑定

*默认绑定*

不加任何修饰符直接调用函数
```js
function foo() {
  console.log(this.a); // 1
}

var a = 1;
foo(); // 等同于 window.foo()
```

*隐式绑定*
调用位置发生在存在上下文对象的情况
```js
function foo() {
  console.log(this.a);
}

let obj1 = {
  a: 1,
  foo
}

let obj2 = {
  a: 2,
  foo
}

obj1.foo(); // 1
obj2.foo(); // 2
```
当函数调用时, 拥有上下文对象的时候, this就绑定到该上下文对象

*显示绑定*
改变函数的this到指定对象
`Function.prototype`的三个方法 `apply`、`call`、`bind`

```js
function foo(b, c) {
  console.log(this.a, b, c)
}
var bar = {
  a: 1
}
foo.apply(bar, [2,3]); // 1 2 3
foo.call(bar, 2, 3); // 1 2 3
foo.bind(bar, 2, 3)(); // 1 2 3
foo.bind(bar)(2, 3); // 1 2 3
```
- apply: 第二个参数接收的是argument, 是个数组
- call: 第二个及以后是依次传参
- bind: 返回一个函数, 需要主动调用, 传参可以放在bind 第二个及以后, 也可以放在调用里面

*new 绑定*
new 关键字的原理
new运算的具体执行过程：
    1)创建一个空对象
    2)把这个空对象的__proto__指向构造函数的prototype
    3)把这个空对象赋值给this
    4)执行构造函数内的代码
```js
// 1. 创建一个空对象
// 2. 这个空对象会被执行[[prototype]]连接
// 3. 这个空对象会绑定到函数调用的this
// 4. 如果函数没有返回其他对象, 那么这个 new表达式中会把这个空对象返回
var person = new Person();

var o = object.create();
o.__prototype = Person.prototype;
Person.apply(o);
person = o
```

```js
function Fn1() {
  this.name = 1;
}

function Fn2() {
  this.name = 1
  return {
    name: 2
  }
}

console.log(new Fn1().name); // 1
console.log(new Fn2().name); // 2
console.log(Fn1().name); // error: prototype 'name' undefined
console.log(Fn2().name); // 2
```
new 关键字会创建一个空对象, 然后调用apply方法显示 空对象的this指向将函数实例;
如果 函数内部有返回且为对象, 那么this指向这个返回对象。

*箭头函数*
箭头函数不会创建自己的this, 它只会从自己的作用域链的上一层继承this
```js
var o = {
  name: 1,
  fn: () => {
    console.log(this.name);
  }
}
var name = 2;
console.log(o.fn()); // 2
```



### this
*this的确定只需要在一个函数中确定*

1. this 指向调用他的那个对象
```js

```

2. Function调用, `fn()` 这里的fn作为单独的变量出现, 而不是属性, this 指向`window`
全局作用域下, 调用这个this, 一直指向global, 浏览器window
```js
var fn = function() {
  console.log(this);
}
fn(); // window
// fn(); 等同于 window.fn()
```

3. 被调用的对象作为一个属性出现, 带有`.`或`[]`这样的关键字,
  this指向调用前的那个对象,即`.`或`[`前的对象
```js
var bar = {
  name: 'b',
  fn: function() {
    console.log(this.name)
  }
}
var name = 'a'
bar.fn(); // 'b'
```

4. new 关键字
this 指向其构造函数, 如果构造函数返回是一个对象, this则指向这个对象
*new 实现原理*
```js
// function Person() {}
// var person = new Person();
var obj = Object.create();
obj.__proto__ = Person.prototype;
var result = Person.apply(obj);
person = (typeof result === 'object' && result !== null) ? result : obj;
// 1. 创建一个空对象obj
// 2. 将空对象obj的原型链接到 构造函数的prototype即实例原型
// 3. 执行构造函数, 将构造函数的this指向创建的obj
// 4. 如果构造函数返回一个对象, 则返回这个对象, 否则返回obj
```


```js
function Fn() {
  this.name = 'f';
}
var a = new Fn();
console.log(a.name); // f

var b = new Fn // 这种仅仅是不能传参
console.log(b); // f 
```

```js
function Fn() {
	this.name = 'f'
	return {name: 'r'}
}
var c = new Fn();
console.log(c.name); // r
```

```js
function Fn() {
	this.name = 'f'
	return null;
}
var d = new Fn();
console.log(d.name); //  f
```

5. 显示绑定 apply、call、bind
  `Function.prototype`: 第一个参数都是this要指向的对象
  - apply 第二个参数是个伪数组
  - call 第二个及以后是依次传递参数
  - bind: 返回一个函数, 需要主动调用, 传参可以放在bind 方法第二个参数依次传递, 也可以在执行时依次传递
```js
function fn(b, c) {
  console.log(this.a, b, c);
}
var bar = {
  a: 1
}
fn.apply(bar, [2, 3]);
fn.call(bar, 2, 3);
fn.bind(bar, 2, 3)();
fn.bind(bar)(2, 3);
// 上面均打印 1 2 3
```

