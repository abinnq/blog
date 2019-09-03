
## UDP 协议

**1.UDP与TCP的区别是什么?**
  1. UDP协议是面向无连接的, 不需要在正式传递之前连接双方
  2. UDP只是数据的搬运工, 不能保证有序且不丢失的传递到对端
  3. UDP 对比TCP 更加轻量化

**2.面向无连接**
  - 在发送端, 应用层将数据传递给传输层的UDP协议, 只会给数据增加一个UDP头, 标识一下UDP协议。
  - 在接收端, 网络层将数据传递给传输层, UDP只去除IP报文头, 就进行传输了, 不进行其他操作。

**3.不可靠性**
  - 由于是面向无连接的, 未连接直接发送
  - 发送数据不关心是否全部接收数据
  - 不会根据网络环境进行拥塞控制, 以恒定的速度发送数据, 在网络差的情况下会存在丢包现象

**4.高效**
  - UDP 头部开销小, 仅有8字节, 相对于TCP的至少20字节好很多, 不需要保证数据不丢失且有序到达

**5.传输方式**
  UDP 不止支持一对一, 还支持一对多, 多对多, 也就是提供单播, 多播和广播的功能

**6.应用场景**
 -  实时要求高得 直播、网络游戏吃鸡



## TCP 协议

**1.UDP与TCP的区别是什么?**
  - TCP是有连接的, 连接前必须经过三次握手建立连接, 关闭是四次挥手, UDP是无连接的, 没有建立连接这个过程
  - TCP 是可靠的传输, TCP协议通过确认和重传机制来保证数据传输的可靠性, UDP 提供传输, 不关注是否接受
  - TCP 提供了拥塞控制, 滑动窗口等机制来保证传输质量, UDP没有 
  - TCP是基于字节流的。 将数据看做是无结构的字节流传输, 当数据太长是会分段传输, 因此TCP数据无边界, UDP 是面向报文的, 不会对数据进行拆分, 故UDP是有边界的

**2.头部**
Sequence number: TCP传输的报文都是有序的
ACknowledgement number: 表示下一个期望收到的字节编号是多少
Window Size: 还能接收多少字节,用于流量控制
- URG: 紧急指针
- ACK: 确认序号有效
- PSH: 尽可能将数据传递给接受端
- RST: 重新建立连接
- SYN: 同步序号用来发起一个连接
- FIN: 发送端完成发送任务


**3.三次握手**
  1. 客户端发送连接请求报文SYN, 客户端的状态由closed -> SYN-SEND
  2. 服务端接受到连接请求报文段, 同意连接则会发送一个应答, 应答中包含SYN+ACK, 自身数据通讯的初始序号, 发送完 服务端状态由LISTEN -> SYN-RECEIVED
  3. 客户端收到连接同意的应答后要向服务端发送一个确认报文 ACK, 客户端发送完便进入 established 状态, 服务端收到后也进入了established状态

**4.为什么两次握手不可以?**
  防止出现失效连接请求报文段, 被服务端接受的情况, 从而产生错误

**5.四次挥手**
  *TCP 是全双工的, 因此断开连接时需要两端都发送FIN和ACK*
  1. 客户端认为数据发送完成, 向服务端发送连接释放请求FIN, 客户端状态: ESTABLISHED -> FIN-WAIT
  2. 服务端收到连接释放的请求会告诉应用层释放TCP连接, 然后发送ACK包, 服务端状态:ESTABLISHED -> CLOSED-WAIT (此时服务端仍然可以向客户端发送包)
  3. 服务端如果还有没发完的数据 会继续发, 完毕后会向客户端发送FIN和ACK, 服务端状态: CLOSED-WAIT -> LAST-ACK
  4. 客户端收到释放请求, 向服务器发送确认应答ACK, 客户端状态: FIN-WAIT -> TIME-WAIT -(等待2MSL)->CLOSED, 若2MSL内不收到服务端的请求,则客户端进入CLOSED, 服务端收到应答ACK便进入CLOSED;

**6.为什么客户端要进入TIME-WAIT状态等待2MSL再进行关闭?**
  为了保证服务端能收到客户端的确认应答, 若客户端发送完成便进入CLOSED, 如果确认应答因为网络问题没有到达, 会造成服务端无法正常关闭

**7.ARQ协议**
  ARQ协议: 超时重传机制
  1. 停止等待ARQ协议: 跑个定时器等待对端回应才开始下一个, 每次上传前都会备份数据
  2. 连续ARQ协议: 发送端拥有一个发送窗口, 没有收到回应便持续发送, 通过累计确认序列号

**8.滑动窗口**
  - 发送端窗口: 已发送但未收到应答的数据、可以发送但是未发送数据, 接收方会把当前接收窗口的剩余大小写入应答报文, 发送窗口根据该值和当前网络拥塞情况设置发送窗口大小, 是动态变化的

**9.拥塞窗口**
  1. 慢开始: 传输开始时发送窗口慢慢指数扩大, 避免一开始就发送大量数据导致网络拥塞
  2. 拥塞避免: 每一个发送窗口指数只加一, 已找到最佳值
  3. 快速重传: 接收端接收报文出现失序, 接收端只回复最后一个正确的报文序号, 发送端收到3个则启动快速重传
  4. 快速恢复: 

**10.小结**
  - 建立连接需要三次握手, 断开连接需要四次挥手
  - 滑动窗口解决了数据丢包、报文序号不对、流量控制问题
  - 拥塞窗口实现了对流量的控制, 保证全天候环境下最优的传递

## HTTP
  **1.请求的内容**
    包含三部分: 请求行、首部、实体

  **2.get和post区别**
  - get可以缓存请求, post不能
  - post相对get 会安全一点, get请求都包含在url里面
  - url有长度限制, 会影响get请求, 根据浏览器限制决定
  - post 支持更多的编码类型且不对数据类型限制

  **3.HTTP的keep-alive是什么?**
  早期http/1.0, 每次http请求都会创建一个连接, 每次连接都会费时费资源, 
  后来在http/1.0 和http/1.1使用Connection: keep-alive, 重用连接, 基于一次连接发送多次请求

　
  **4.HTTPS**
  HTTPS 是 HTTP 建立在 SSL/TLS 安全协议上的。
  - 对称加密 两边都拥有相同的密钥, 两边都知道如何将密文加密和解密;
  - 非对称加密: 具有公钥和私钥, 数据用公钥加密, 但是解密比需用私钥;
  
  **5.HTTP/2**
    - 二进制传输: 之前的传输是通过文本, 现在通过二进制
    - 多路复用: TCP连接存在多条流,发送多个请求, 旧版的chrome同意域名下最大支持6个连接, 避免头部阻塞
    - Header压缩: 压缩头部文件
    - 服务端 push: 主动推送其他资源

  **6.HTTP/3**
    - 底层协议是基于UDP协议的, 具有纠错机制, 传送时添加一个校验包, 出现丢包可以通过校验包来推算出来
　
## 模块化


## 支付相关
  微信H5支付, 传入后端paymentData 中redirect 重定向, 微信支付调起收银台后超过五秒后就会跳转, 此时如果跳转到支付结果页是不好的。

## 浏览器缓存机制
**1、缓存位置**
  1. service worker: 传输协议为HTTPS, 独立线程
  2. memory cache: 内存中的缓存, 持续性很短, 随着tab进程的释放而释放
  3. disk cache: 硬盘中的缓存
  4. push cache: 以上都没有才走这个, 只在session 会话中才用到
  5. 网络请求 

**2、缓存策略**
  *强缓存*
  1. expires: 受限于本地时间, 不会发起请求
  2. cache-control: max-age:设置过期时间、no-store: 不缓存、no-cache: 被缓存但是立即失效, 下次请求要验证缓存

  *协商缓存*
    1. last-modified: 最后的修改时间
    2. ETag 类似文件指纹

## 跨域
  **1、什么叫跨域**
    浏览器不能执行其他网站的脚本, 这是由于浏览器的同源策略导致的
    即: 域名、协议、端口均相同
  
  **2、为什么要引入同源策略**
  *同源策略限制了以下:*
  - Cookie、LocalStorage、indexedDB等存储性质内容;主要是用来防止CSRF攻击, 利用用户登录状态发起攻击 
  - 限制DOM查询
  - 限制ajax 请求
  *被允许的标签*
    `<img src="xxx">`
    `<link href="xxx">`
    `<script src="xxx">`

  **3实现跨域的方式**
    1. JSONP
      动态的创建script标签利用callback函数响应参数
      缺点: 1. 只能get请求, xss攻击跨站脚本攻击
    
    2. Cors 跨域资源共享
      最常用的方法, 需要浏览器和服务器都支持,, IE10及以上 
      *在服务器设置*
      - Access-Control-Allow-Origin: 设置那个源可以访问, * 表示任意域名
      - Access-Control-Allow-Credentials: 布尔值, 表示是否接受cookie
      - Access-Control-Allow-Methods: 允许那些方法
      - Access-Control-Max-Age: 预检测, 存活时间 毫秒单位

      *Content-type类型*
      - text/plain
      - multipart/form-data: 表单上传文件
      - application/x-www-form-urlencoded: 浏览器原生form表单
      - application/json: 序列化后的json字符串, 复杂请求, 需要走预检测 `option`请求方式

    3. document.domain
      适用于主域相同, 不同子域之间的跨域, 设置相同主域, 使检测通过
      ```js
      // a.abc.com
      // b.abc.com
      document.domain = 'abc.com';
      ```
    4. postMessage
      完全不同的跨域, HTML5引入的, 适用于多窗口间的跨页面通讯, IE11及以上
      otherWindow.postMessage(message, targetOrigin, [transfer])
      安全性: 通过event.origin来判断是否是正确的发送方
    
    5. windowName
      name值在不同的域名下加载后依旧存在, size2MB左右,
      通过iframe的src属性由外域传向本域
    
    6. location.hash
      iframe通过hash值来传递,

    7. websocket
      HTML5的持久化协议, 利用Http协议建立连接, 建立好就与http无关了

    8. nginx
      利用nginx转发请求
    
    9. node
      中间间代理

    10. webpack的devServer.proxy
      target, 指定路径

## 安全
  **XSS攻击**
  代码注入的一种攻击方式
  1. 在一些输入框直接输入恶意代码, 前端没有过滤直接存入数据库
  2. url 获取的参数, 使用都需要
  
  


## 小程序
**1、小程序生命周期**
  - onLoad: 页面加载
  - onReady: 页面初次渲染完成
  - onShow: 页面显示
  - onHide: 页面隐藏
  - onUnload: 页面卸载
  - onPullDownRefresh: 监听用户下拉动作
  - onReachBottom: 下拉到底部
  - onShareAppMessage: 点击右上角分享
  - onPageScroll: 页面滚动
  - onTabltemTap: 点击tab