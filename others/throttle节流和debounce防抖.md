函数节流与防抖

- 函数节流: 指定时间间隔只会执行一次任务
- 函数防抖: 任务频繁触发情况下, 只有触发时间超过指定间隔,任务才会执行。

## 函数节流(throttle)
场景:
  1. 鼠标不断点击触发, mouseDown(单位时间内只触发一次)
  2. 监听页面滚动时间,是否滑动到页面底部。
理解下: 函数节流就是fps游戏射速, 即使一直按着设计, 子弹的射速也是一定的。
单位时间内,只能触发一次, 如果单位时间内多次触发, 只有一次会生效
```type=js
function throttle(fn, delay = 1000) {
  let last, timer;
  return function(...args) {
    let now = +new Date();
    if(last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(this, args);
      }, delay)
      return;
    }
    last = now;
    fn.apply(this, args);
  }
}
```
   
## 函数防抖 debounce
场景: 
  1. 输入框实时请求, 搜索联想
  2. window 触发resize时, 不断调整浏览器的大小,触发这个事件
理解下: 函数防抖,就是吃鸡的加血, 加到一半,连续点击 就要重新计时加。
频繁的输入并不会直接发请求, 而是在指定间隔内没有输入时再发请求, 如果有输入则重新计时

```type=js
function debounce(fn, delay = 50) {
  var timer;
  return function(...ags) {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, ags)
    }, delay)
  }
}
```