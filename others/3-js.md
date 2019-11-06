## 1. js数据类型
  原始数据类型: null、undefined、string、boolean、number、symbol
  引用数据类型: object

  原始数据类型: 存储在栈内存, 存储的是值
  引用数据类型: 存储在堆内存, 存储的是地址(类似指针), 指向的是栈内存中的值

## 2. typeof vs instanceof
  *typeof*
    对于原始数据类型都可以正确显示除了
   `typeof null -> object`,
    `typeof function -> function` 其余都显示object

  *instanceof* 
  通过查找被判断 是否在原型上有等于值
  ```js
    function instanceof(L, R) {
      var RP = R.prototype;
      L = L.__proto__;
      while(true) {
        if(L === null) return false;
        if(RP === L) return true;
        L = L.__proto__;
      }
    }
  ```

  *如何判断是数组*
  - 使用 Array.isArray()
  - 使用 instanceof Array
  - 使用 Object.prototype.toString.call() === [object Array]
  - 使用 constructor === Array
## 3. arguments
  类数组, 是非箭头函数中都拥有的局部变量, 包含传递给函数的所有参数
  仅有length属性和索引元素
  
## 4. call、apply和bind的区别及实现?
  共同点: 将函数的this指向第一个参数
  - apply 第二个参数是个arguments
  - bind 返回一个函数需要手动调用
  - call 除了第一参数, 后续都是参数列表
  
  *实现apply*
  ```js
  Function.prototype.apply2 = function() {
    let [context, args] = arguments;
    context = context || window;
    context.fn = this;
    context.fn(args);
    delete context.fn
    return context;
  }
  ```

  *实现call*
  ```js
  Function.prototype.call2 = function() {
    var [context, ...args] = arguments;
    var context = context || window; // 为空时指向window
    context.fn = this;
    context.fn(args);
    delete context.fn
    return context;
  }
  ```

  *实现bind*
  ```js
  Function.prototype.bind2 = function() {
    let [context, ...args] = arguments;
    context = context || window;
    let _this = this;
    return function() {
      return _this.apply(context, args)
    }
  }
  ```

## 5. 手写数组排序
  *sort方法*
  ```js
  function systemSort(arr) {
    return arr.sort(function(a, b) {
      return a - b;
    })
  }
  ```

  *冒泡排序*
  ```js
  function bubbleSort(arr) {
    var len = arr.length;
    for(var i = 0; i < len-1; i++) {
      for(var j =0; j < len - 1 -i; j++) {
        if(arr[j] > arr[j+1]) {
          [ arr[j], arr[j+1] ] = [arr[j+1], arr[j]]
        }
      }
    }
    return arr;
  }

  // 加标识 如果是 1234 
  function bubbleSort2(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++) {
      var flag = false;
      for(var j =0; j < len - 1 -i; j++) {
        if(arr[j] > arr[j+1]) {
          [ arr[j], arr[j+1] ] = [arr[j+1], arr[j]]
          flag = true
        }
      }
      if(!flag) {
        break;
      }
    }
    return arr;
  }
  ```

## 6. 手写数组去重

  ```js
  function unique(arr) {
    var tempArr = [];
    for (var i =0; i < arr.length; i++) {
      if(tempArr.indexOf(arr[i]) === -1){
        tempArr.push(arr[i])
      }    
    }
    return tempArr
  }

  function unique(arr) {
    var tempArr = [];
    for (var i =0; i < arr.length; i++) {
      for(var j=0; j < tempArr.length; j++) {
        if(arr[i] === tempArr[j]) {
          break;
        }
      }
      if(j === tempArr.length) {
        tempArr.push(arr[i])
      }
    }
    return tempArr
  }
  ```

## 7. 数组降维
  *二位数组*
  利用concat合并数组, apply 第一个参数是this指向的对象, 第二个是数组参数
  ```js
  Array.prototype.concat.apply([], arr)
  ```
  *多维数组* 递归
  ```js
  var res = []
  deepFlatten = function(arr) {
    if(Array.isArray(arr)) {
      arr.forEach(item => {
        deepFlatten(item)
      })
    } else {
      res.push(arr);
    }
    return res
  }
  ```

## 8. 深拷贝实现
  *简单实现* 缺点: 循环引用就不行了
  ```js
  JSON.parse(JSON.stringify())
  ```

  ```js
  function clone(target, map = new Map()) {
    if(typeof target === 'object' && target !== null) {
      let cloneTarget = Array.isArray(target) ? [] : {};
      if(map.get(target)) {
        return target;
      }
      map.set(target, cloneTarget)
      for (const key in target) {
        cloneTarget[key] = clone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  ```

## 9. 防抖与节流
  *防抖debounce*
  任务频繁触发下,只有触发时间超过间隔才会执行
  例如: 输入框联想输入, window.resize 的改变
  吃鸡游戏加血, 加到一半停止, 需要从头再加
  ```js
  function debounce(fn, delay = 50) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
  ```

  *节流throttle*
  指定时间内只会触发一次
  例子: 监听页面是否滑动到底部
  射击游戏, 一直发子弹, 子弹射速是恒定的
  ```js
  function throttle(fn, delay = 50) {
    let flag = true;
    return (...args) => {
      if(!flag) return;
      flag = false;
      setTimeout(() => {
        fn.apply(this, args)
        flag = true;
      }, delay)
    }
  }
  ```

## 10. 函数声明与函数表达式
javaScript定义函数有两种类型: 函数声明、函数表达式

*函数声明*
```js
fn(); // success
function fn() {} 
```
JavaScript 解释器中存在一种变量声明被提升的机制,
函数声明会被提升到作用域的最前面

*函数表达式*
```js
fn(); // error: fn is not a function
var fn = function() {}

//函数表达式是在运行时进行赋值即 
//需要在赋值完成后才可以调用
// var fn = undefined;
// fn = function() {};
```
  