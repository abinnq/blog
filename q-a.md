## 1. EC
1. 如何计算css 选择器权重?
  - !important
  - 内联样式 
  - id选择器
  - 类选择器class
  - 伪类选择器(:hover)
  - 属性选择器([title='xxx'])
  - 标签选择器(p)
  - 通配符选择器(*)
  - 浏览器自定义

2. Javascript 内置对象有那些?
  - Date 时间对象
  - string字符串对象
  - Math 数学对象
  - Number 数值对象
  - Array 数组对象
  - Function 函数对象
  - Arguments 函数参数对象
  - Boolean 布尔对象
  - Error 错误对象
  - Object 基础对象

3. 补全代码
```js
  function getType(args){

  }
```


4. 写出下面代码输出什么? 为什么?
  ```js
  console.log(1 + 2 + '3'); // 33
  console.log('3' + 2 + 1); // 321
  ```
  - 根据运算符的优先级, 确定结合顺序, 从左往右, 
  - 类型的强制转换即
  - 1+2 = 3, 3+'3' = 33 
  - '3' + 2 = '32', '32' + 1 = '321'

  - 如果是 相减, 会将双方先number一下
  - '2' - 1 = 2
  - '2' - 'a' = NaN

5. 下面代码输出结果, 描述过程
  ```js
  var a = 10;
  (function a () {
    console.log(a);
    var a = b = 100;
    console.log(a)
  })()
  console.log(a + b)
  // undefined
  // 100
  // 110
  // 函数内本质上是执行了 var a = undefined; window.b = 100; 
  
  ```

6. 下面代码运行结果是什么?
  ```js
    function F1() {
      this.name = 'f1';
    }
    function F2() {
      this.name = 'f2';
      return {};
    }

    console.log(new F1().name); // 'f1'
    console.log(F1().name); // error: property 'name' undefined
    console.log(new F2().name); // undefined 
    console.log(F2().name); //undefined
  ```
7. 写一个函数将字符串 "get-computed-style" 转成小驼峰;
  ```js
  function upperCase(str) {
    return str.replace(/-\w/g, function(x){
      return x
    })
  }
  ```


8. 同步和异步编程有什么区别和优缺点?
  - 同步: cpu是在等待中度过的, 等待上一个任务完成才继续执行
  - 异步: 把耗时的任务都先注册一个callback或者event之后切换回来, cpu就可以继续执行任务了, 等待callback回来了,再继续执行
  - 同步优缺点: 效率低耗时, 但是执行流程清晰
  - 异步优缺点: 效率高节省时间, 会占用更多的资源, 不易于流程控制

  *js异步编程的4种方法*
    callback、事件监听、发布/订阅、promise

9. 什么是事件委托,有什么作用?
  把元素响应事件委托给另外一个元素, 绑定到父级元素,  通过事件冒泡机制, 通过event.target 来判断


10. http 请求get和post的区别?
  - get请求可以被缓存, post不能
  - get请求内容有长度限制(浏览器不同), post 请求内容放在请求体
  - post 支持更多的请求类型, 切不对类型有限制
  - post 相对get安全点, get明文请求

11. jsonp的原理?
  应对跨域而产生了jsonp
  动态的创建script标签, 发送get请求, 并指定callback函数, 服务端返回数据作为callback函数参数

12. cookie、session、sessionStorage和localStorage的区别?
  - session: 服务端保存的数据结构, 用来跟中用户状态, 可以保存在集群、数据库和文件中
  - cookie: 客户端保存信息的一种机制, 每次都会携带在header中 客户端和服务端都可以设置, 大小4K左右, 可以设置过期时间, 可以设置path, 不能用cookie的浏览器 可以使用url重写的方式在url上带sid来实现
  - localStorage: 一直存在, 除非手动清理。大小5M左右, 数据是字符串, 存时用`JSON.stringfy` 取值是需要使用`JSON.parse`
  - sessionStorage: 页面关闭就清理, 也是5M左右

## 2.WM
1. web开发中会话跟中的方法有那些?
  - cookie
  - session
  - url重写
  - 隐藏表单域

2. 浏览器地址输入url到显示页面的步骤(以http为例)
  1. 检查浏览器缓存, 如果缓存有不过期可用缓存就准备呈现, 呈现;
  2. DNS解析: 将域名转换成IP地址, 具有缓存机制, 浏览器缓存、系统缓存(配置的hosts)、路由器缓存、DNS提供商缓存、 DNS提供商轮询
  3. TCP 连接: 三次握手
  4. 发送HTTP请求Request
  5. 接受HTTP请求Response
  6. 关闭TCP连接, 四次挥手
  7. 检查状态码
  8. 准备呈现
  9. 呈现

  *呈现过程*
    1. 先拿到文件, 如果是gzip就需要先解压, 然后根据对应浏览器解析器解析html、css、js
    2. 解析html创建DOM树, 解析css,创建CSSOM树, 并行执行
    3. 遇到`script`标签会先看有`async`和`defer`, 前者:会并行下载并执行js。后者会先下载,等html解析完成后再顺序执行。如果以上都没有, 会阻塞渲染流程, 等js下载并执行完成, (此处说明script标签应该放在最后面)
    4. 初始的HTML被完全加载和解析后会触发`DOMContentLoader`事件
    5. 结合CSSOM树和DOM树创建render树, 确定页面样式和布局
    6. 生成Render树的过程中, 浏览器开始调用GPU绘制合成图层, 将内容呈现在屏幕上

3. 如何进行网址性能优化
  *1.网络传输优化*
  - 利用缓存: 静态资源使用md5 hash后缀, 强缓存(expires,etag)
  - 减少资源请求: 雪碧图, 合并CSS
  - 减少请求资源体积: 提取公共代码, 删除注释, 代码压缩、服务器开启gzip压缩, 删除非必要cookie
  - 图片优化: 雪碧图, 优先使用JPEG, 图片压缩, 使用字体图标矢量图、小图片使用base64(压缩进js或者css都可以进行缓存)
  - 使用CDN
  - 异步加载非必要文件
  - 不要404 资源文件

  *2.页面渲染优化*
    重绘: 当前节点需要更改外观, 不会影响布局
    回流: 布局或者几何属性的改变, 影响布局
    - 使用translate替代top等方向值的改变
    - 使用visibility替代display: none
    - 频繁使用动画地方需要转化为新的图层, 避免影响其他节点
    - 减少DOM深度, 多使用伪类元素
    - 图片渲染前指定大小, 防止图片加载引起回流
  
  *3.js阻塞性能*
    - 将JS放在页面底部
    - 避免空的img的src为空

4. CSS选择器有那些?
  - !important
  - 内联style
  - id选择器
  - class类选择器
  - 伪类选择器
  - 属性选择器([title="xxx"])
  - 标签选择器
  - 通配符*
  - 浏览器自定义

5. 什么是闭包,闭包有什么用?
  简洁: 有权限访问其他函数内作用域变量的函数

  详细: 
    在js中, 变量的作用域属于函数作用域, 在函数执行后作用域就会被清零, 内存也会随着回收
  但是由于闭包是建立在一个函数内部的子函数, 可以访问上级函数的作用域, 即使上级函数执行完成, 作用域也不会销毁, 此时的子函数边称为闭包
  
  作用: 读取函数的变量, 让其变量一直存在
  垃圾回收机制: 
    - 引用计数(老): 如果没有引用指向该对象即零引用, 就会被回收
    - 标记清除(新): 

6. javascript有那些方法定义对象
  - 字面量: var obj = {};
  - 构造函数: var obj = new Object();
  - Object.create: var obj = Object.create(Object.prototype);

7. 用CSS创建一个三角形的原理
  利用transparent使三条边透明, width为0
  ```css
    width: 0;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 10px 10px 20px 10px
  ```

  画半圆
  ```css
    width: 200px;
    height: 100px;
    border-radius: 100px 100px 0 0;
    background-color: red;
  ```

8. 让Chrome 支持小于12px的字体
  - 缩放: transform:scale(0.5)
  - 使用图片

9. js有那些内置对象
  1. date: 时间对象
  2. string: 字符串对象
  3. number: 数字对象
  4. boolean: 布尔对象
  5. array: 数组对象
  6. arguments: 参数数组
  7. function: 函数对象
  8. math: 数学对象
  9. error: 错误对象
  10. object: 基础对象

10. javascript 如何实现继承?
  1. 构找函数继承
    ```js
      function Parent(value) {
        this.value = value;
      }
      var Child = new Parent('bb');
      console.log(Child.value); // bb
      console.log(Child instanceof Parent); // true
    ```

  2. 组合继承
    ```js
      function Animal(name) {
        this.name = name || 'Animal';
      }
      function Cat(value) {
        Animal.call(this, value)
      }
      Cat.prototype = new Animal();
      var cat = new Cat('bb')
      console.log(cat.name); // bb
      console.log(cat instanceof Animal); // true
    ```  

  


11. 异步加载js 的方式有那些
  - defer: 会等html解析完成再执行
  - async: 一旦可用则异步执行
  - 动态创建script标签
  - 有条件的动态插入, Jquery的`$(document).ready`

12. 数组和对象有那些原生方法, 列举一下

13. 用js实现千位分割符
  ```js
  function parseToMoney(str){
    let re = /(?=(?!\b)(\d{3})+$)/g; 
    return str.replace(re,','); 
  }
  ```
14. 解释一下CSS3的Flexbox(弹性盒布局模型), 以及适用场景

15. 对Node的优缺点提出自己的看法


## MTL
1. 如何画个三角形, 和半圆;

2. CSS3动画

3. HTML5

4. 如何判定是移动端, 以及在那一层去做
  判断userAgentInfo
    Android、iPhone、SymbianOS、Windows Phone、iPad、iPod
    
5. 移动端rem


## YZ
1. 实现div垂直水平居中
  - position: absolute; top: 50%; transform: translateY(-50%);
  - display: flex; align-items: center;

2. vue如何实现状态管理

3. post 和get的区别

4. 如何处理多张大图上传

5. 如何实现双向数据绑定

6. 实现对象的深拷贝

7. ES6/ES7 常用的内部函数

8. vue 路由按需加载
  1. webpack 中 require.ensure() 实现按需加载
  2. 使用动态的import 语法
   
9.  js 延迟加载的方法
  3. 没有defer 和async, 浏览器会立即加载并执行脚本, 然后再继续解析document
  4. defer 不阻止解析document, 并行加载js, 等待DOMContentLoaded 再执行defer里的js
  5. async 不阻止解析document, 并行加载async里面的js, 加载完便立即执行

  defer、async、动态插入script标签

1.  常用的排序方法

