# 前端异常监控

## 背景
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
- vue `Vue.config.errorHandler`
- react `componentDidCatch`
- angular `ErrorHandler`
- minApp `onError`和函数劫持

## 监控系统搭建方案
- 自建: 自行可以规划定义一套完善的监控系统。需要人力重新开发
- [frontjs](https://www.frontjs.com/) 蒲公英
- [fundebug](https://www.fundebug.com/)
- [rollbar](https://rollbar.com/) Uber、wework
- [trackjs](https://trackjs.com/) stackoverflow
- [sentry](https://sentry.io/) 开源, 可以自建服务

上述系统除了sentry可以选择自建服务外，其他的大规模商用，都需要钱;

## sentry

### why sentry
Sentry – 正如其名「哨兵」，可以实时监控生产环境上的系统运行状态，
一旦发生异常会第一时间把报错的路由路径、错误所在文件等详细信息以邮件形式通知我们,
并且利用错误信息的堆栈跟踪快速定位到需要处理的问题。
选择 Sentry 作为前端监控系统，还因为下几点：
- 开源
- 对各种前端框架的友好支持 (Vue、React、Angular)
- 支持 SourceMap

### 环境准备
sentry 搭建方式有两种:
- 通过Python安装
- 通过Docker安装
Docker更方便管控, 也是官方推荐的安装方式, 

[安装文档](https://docs.sentry.io/server/installation/)

*注意*
内存需要2.4G

### 开始搭建
**1. 拉取 sentry-onpremise 仓库**
```bash
git clone https://github.com/getsentry/onpremise.git
```

**2. 创建服务端服务**
```bash
# sentry 10.0 初始化安装很方便
./install.sh

# 生成秘钥, 修改至
docker-compose run --rm web config generate-secret-key
```


