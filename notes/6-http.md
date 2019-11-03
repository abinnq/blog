## http 1 2 的区别
*http1.0*
  - 无连接: 浏览器每次请求都会建立一个TCP连接, 服务端处理完就断开了TCP连接
  - 服务器不跟踪每个客户端也不记录过去的请求

*http1.1*
  - 持久化连接 默认开启Connection: keep-alive, 一个连接里面的请求是排队串行单线程请求, 前面的请求完成后面的才开始, 一旦请求超时后面的请求会被阻塞,同一域名下的请求最大数量为6个
  - 增加缓存处理
  - 增加host字段

*http2.0*
  - 头部压缩
  - 服务器推送
  - 多路复用: 一个TCP连接中存在多条流, 可以发送多个请求, 对端通过帧来标识属于那个请求, 从而避免了请求头阻塞问题

## HTTP Code
  *2xx 成功*
    200 成功
    204 请求成功响应报文不包含实体
    206 范围请求
  
  *3xx 重定向*
    301 永久重定向
    302 临时重定向
    303 期望使用GET请求获取
    304 资源未改变
  
  *4xx 客户端错误*
    400 请求报文语法错误
    401 请求没有认证信息
    403 请求认证信息权限不够
    404 没有找到请求资源
  
  *5xx 服务器错误*
    500 服务器内部错误
    501 不具备完整的请求功能
    503 暂时服务不可用停机维护这样
    505 http版本不支持

## 跨越
  浏览器不能执行其他网站脚本, 同源策略: 域名、协议、端口 一致

1. jsonp
  script标签不受同源影响, 故动态创建script标签, 发起get请求通过callback函数来传递数据, 即函数的参数;
  只能发get请求

2. window.name

3. nginx转发请求

4. node中间层代理

5. webpack devServer.proxy

6. cors(跨域资源共享)
  - Access-Control-Allow-Origin: 设置那些源请求可以访问
  - Access-Control-Allow-Method: 设置那些请求方法
  - Access-Control-Allow-Credentials: 是否携带cookie
  - Access-Control-Max-Age: 预检测最大存活时间单位秒, -1每次都会进行预检请求options
  
  *简单请求*
  - 请求方法为之一: 
    GET、POST、HEAD

  - http头信息不超过以下字段:
    Accept: 能接收的媒体类型
    Accept-language: 能接收的语言列表
    Content-language: 内容使用的语言
    Last-Event-Id: 
    Content-Type: 内容类型

  - Content-type: 不超过下面三种
    text/plain XML的编码方式
    multipart/form-data: 表单上传文件
    application/x-www-form-urlencoded: 

  *非简单请求*
  类似请求类型为PUT或者 Content-type: 是application/json 序列化后的json字符串
  当跨域请求时, 先判断是不是非简单请求, 不是简单请求再看下Max-age有没有过期, 如果过期啦, 则会发送options请求code204
