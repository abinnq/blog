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
