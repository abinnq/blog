## for
 - for `break`: 终止循环, `continue`: 跳出当前这次循环, `return`: 终止循环

## every 与 some
  - every: 每一项返回true, 最后才返回true, 否则是false;
  - some: 遇到返回true时就返回, 否则返回false;

## map、forEach、reduce、filter之间的区别
  - map: 不修改原数组, 会返回一个新的数组, 故可以链式操作
  - forEach: 会修改原数组, 返回undefined
  - reduce: 不会改变原数组, 会返回单个返回值
  - filter: 不会改变原数组, 会返回一个过滤后的新数组, 可以链式操作

## indexOf 与 lastIndexOf
  找到第一个就返回下标, 否则返回-1
  indexOf 正向查找, lastIndexOf 反向查找

## includes与find、findIndex
  - includes: 有则返回true, 没有返回false
  - find: 找到第一个返回值为true的,并将其返回, 没有则返回undefined
  - findIndex: 返回第一个符合条件的下标, 没有则返回-1

## concat
  - concat: 合并数组或值

## slice、
  - slice: 裁减数组, 返回一个新的数组, 不会改变原数组
  接收两个参数: 开始位置, 结束位置(默认从前往后, 负数代表从后往前)

## split、join
  - split 字符转数组
  - join 数组转字符串, 接收参数代替,

## 实现
  *reduce*
  ```js
  // Arr.reduce(fn(result, current, currentIndex, array), initValue)
  Array.prototype.reduce = function(fn, initValue) {
    initValue = null;
    var i = 0;
    var arr = this;
    while(i < arr.length) {
      i++;
      initValue = fn(initValue, arr[i], i, arr);
    }
    return initValue;
  }
  ```

  *filter*
  ```js
  // Arr.filter(fn(current, currentIndex, arr), context)
  Array.prototype.filter = function(fn, context) {
    var arr = this;
    var temp = []
    for(var i=0, len = arr.length; i < len i++) {
      var result = fn.call(context, arr[i], i, arr);
      if(result) temp.push(result);
    }
    return temp;
  }
  ```

  *map*
  ```js
  // Arr.map(fn(current, currentIndex, arr), context)
  Array.prototype.map = function(fn, context) {
    var arr = this;
    var temp = [];
    for(var i=0,len = arr.length; i< len; i++) {
      var result = fn.call(context, arr[i], i, arr);
      temp[i] = result;
    }
    return temp;
  }
  ```

## 数组判断
  - `Array.isArray(arg)`
  - `Object.prototype.toString.call(arg).split(' ')[1].slice(0, -1).toLowerCase()`

## 数组降维
```js
  // 二维
  Array.prototype.concat.apply([], arr)

  // 多维
  function fn(arr) {
    return arr.reduce((result, current) => {
      return result.concat(Array.isArray(current) ? fn(current) : current);
    })
  }
```

## 
var arg = Array.prototype.call(arguments);

## 获取页面元素及其个数
```js
var allTag = document.getElementsByTagName('*');;
var tags = [];
var res = {};
for(var i =0, len =allTag.length; i < len; i++) {
  tags.push(allTag[i].tagName.toLowerCase())
}
tags.forEach((tag) => {
  res[tag] = (res[tag] || 0) + 1;
})
```