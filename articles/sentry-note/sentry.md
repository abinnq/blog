# sentry 

## 前端监控
当前端代码在生产运行中出现错误的时候，第一时间传递给监控系统，从而第一时间定位并且解决问题。
保证前端代码的稳定和安全，是项目可以健康的运行。

## 浅入原理
- js
前端监控原理分为异常捕获和异常上报。一般使用`onerror`捕获前端错误
```js
window.onerror = (msg, url, line, col, error) => {
  console.log(`
    错误信息: ${msg}
    错误文件地址: ${url}
    错误行号: ${line}
    错误列号: ${col}
    错误的详细信息 ${error}
  `);
}
```

`onerror`事件无法捕获网络异常的错误(资源加载失败、图片显示异常等),
promise触发reject但是没有catch来应对 
此时就需要`unhandledrejection`捕获异常, 仅支持`webkit内核`
```js
window.addEventListener('unhandledrejection', function(err) {
  console.log(err)
})
```
- vue

- react
- angular
- minApp

## sentry 
