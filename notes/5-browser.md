## http 1 2 的区别
*http1.0*
  - 无连接: 浏览器每次请求都会建立一个TCP连接, 服务端处理完就断开了TCP连接
  - 服务器不跟踪每个客户端也不记录过去的请求

*http1.1*
  - 持久化连接 默认开启Connection: keep-alive
  - 请求管道化
  - 增加缓存处理
  - 增加host字段

*http2.0*
  - 头部压缩
  - 服务器推送
  - 多路复用

## DOMContentLoaded vs load
  - load: 当页面资源及其依赖资源完全加载时方可触发
  - DOMContentLoaded: html文档被加载解析完成触发

*文档解析*
  浏览器会对数据结构自上而下的进行分析: 首先开启下载进程, 对所有资源进行下载。 同时主线程会对文档进行解析

  - Script: 
    `async`不会阻止解析, 并行下载, 下载完便立即执行, 
    `defer` 不会阻止解析, 并行下载 等待DOMContentLoader触发才解析 
    什么都没有, 阻塞后续内容的解析, 并且加载并执行完才开始解析DOM　
  - link: 不会阻塞后续解析,

*执行顺序*
  async一定在load前执行, 可能会在DOMContentLoaded前执行
  - html还没解析完成, `async`脚本加载完成, HTML停止解析 会去执行脚本, 脚本执行完 触发DOMContentLoaded
  - html解析完成触发DOMContentLoaded, `async`才加载完, 然后执行脚本
  defer将不会影响文档的解析,等到html解析完成才会执行脚本, 然后触发DOMContentLoaded


## 如何判断 元素是否在可视窗内
```js
var windowH = document.documentElement.clientHeight; // 窗口可视高度
var scrollTop = document.documentElement.scrollTop; // 页面滚动距离顶部高度
var testDOMTop = testDOM.offsetTop; // 元素位于整个文档的高度
if( testDOMTop <= windowH + scrollTop) // 出现在屏幕上啦
```
*第二种*
el.getBoundingClientReact().top <= viewPortHeight

## 防抖 与 节流
*防抖*
任务频繁触发情况, 只有超过指定间隔才会触发

例如: 输入框搜索联想
举个例子: 吃鸡游戏加血, 加到一半放弃, 下次需要重头开始
```js
function debounce(fn, delay=50){
  let timer= null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(this, args)
    }, delay)
  }
}
```

*节流*
单位内时间只触发一次
例如: 监听页面是否滚动到底部了吗
举个例子: fps射击游戏, 即使鼠标一直按着, 子弹是匀速射出的

```js
function throttle(fn, delay=50){
  let flag = true;
  return (...args) => {
    if(!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay)
  }
}
```

## apply、call、bind
第一个参数都是this要指向的对象
apply第二个是arguments
call第一个参数后都是序列化参数
bind返回一个函数需要手动执行一下, 接收是apply一样
*apply*
```js
Function.prototype.apply = function(){
  let [context, args] = arguments;
  context = context || window;
  context.fn = this;
  context.fn(args);
  delete context.fn;
  return context;
}
```