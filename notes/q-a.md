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
    let objType = Object.prototype.toString.call(args);
    return objType.split(' ')[1].slice(0, -1).toLowerCase();
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

    // 'f1': new 的关键字会改变this的指向其构造函数
    console.log(new F1().name);

    // F1()函数的运行返回是undefined, 取undefined.name
    console.log(F1().name); // error: property 'name' undefined

    // undefined: 构造函数内有return 对象, this会指向这个对象
    console.log(new F2().name);
     
    // F2的运行结果, 获取的是F2()的运行结果{}.name 得到undefined
    console.log(F2().name); //undefined
  ```
7. 写一个函数将字符串 "get-computed-style" 转成小驼峰;
  ```js
  function upperCase(str) {
    return str.replace(/-\w/g, function(x){
      return x.toUpperCase();
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

## ZM
1. 
```js
  var timer1 =(cb, time) => {
    (function loop() {
      cb();
      setTimeout(loop, time);
    })();
  }
  var timer2 = (cb, time) => {
    cb();
    setInterval(cb, time);
  }
```
- timer1 和timer2 实现了什么功能, 执行结果上会有什么区别?
- 模拟requestAnimationFrame方法的话应该参考那种实现
- timer1中调换cb()和setTimeout的先后顺序会有什么影响

q1: 循环调用cb()函数, timer1 会等cb函数执行完毕后执行, 
q2: timer1 
q3: cb函数执行时间忽略不计, 无明显区别

2. 
```js
  function gtn(listArr) {
    var getObjType = Object.prototype.toString;
    var res = {};
    listArr.forEach(item => {
      var key = getObjType.call(item).split(' ')[1].slice(0, -1);
      res[key] = (res[key] || 0) + 1;
    });
    return res;
  }
```
- 第五行中key和item 是什么关系, 用正则表达式 实现该功能
- 第六行的作用是什么?
- 怎么提高上面函数的健壮性

q1: key 是 item 的类型(Null、Undefined、String、Boolean、Number、Object、Array、Date, Math、Error、Arguments)
  var key = getObjType.call(item).match(/^\[object\s(.*)\]$/)[1];
q2: 记录该类型出现的次数
q3: 增加对参数的判断 Array.isArray(listArr)。

3. 
```js
(function() {
  console.log(1);
  setTimeout(function() {console.log(2)}, 0);
  new Promise(function(resolve, reject) {
    console.log(3);
    resolve(4)
  }).then(function(val) {
    console.log(val)
  })
  console.log(5);
})()
```
  - 上面代码执行后打印结果是什么, 为什么
  - 用自执行函数包裹执行代码可以解决什么问题

  q1: 1 3 5 4 2 setTimeout属于宏任务, Promise.then属于微任务
  q2: 全局污染, 命名冲突

4. 
```js
for(var i=0; i < 5; i++) {
  setTimeout(function() {
    console.log(i)
  }, i * 1000)
}
```
- 上面代码输出结果是什么?
q1: 5 5 5 5 5 


5. 
- 函数abc用来剔除字符串中连续出现的重复字符, 比如接受aaabbcc输出abc;
补充一下实现逻辑
```js
function abc(inputString) {
  let result = [];
  let pre = null;
  inputString.split('').forEach((item) => {
    if(item !== pre) {
      result.push(item);
      pre = item;
    }
  });
  return result.join('');
}
// 正则
function abc(inputString) {
  return inputString.replace(/(\w)\1/gi, '$1');
}
```

6. 在一个空白页面上, 创建100个元素, 给每个元素一个独立的背景色, 点击每个元素时,被点元素背景色保持不变, 其他元素的背景色必须全部发生变化, 并且这一百个元素的背景色不能重复
a、建议使用vue或react实现
b、推荐使用随机色做背景
```js
<ul id="app" @click="handleClick">
  <li 
    v-for="(item, index) in colorList"
    :key="index"
    :style="{backgroundColor: item}"
    :data-index="index"/>
</ul>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      colorList: [],
    },

    created() {
      this.colorList = this.getColorList();
    },
    methods: {
      randomColor() {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        return `rgb(${r}, ${g}, ${b})`;
      },

      getColorList() {
        return [...Array(100)].map(() => this.randomColor());
      },

      handleClick(e) {
        if(e.target.nodeName.toLowerCase() === 'li') {
          const index = e.target.dataset.index;
          this.setColorList(index);
        }
      },

      setColorList(index) {
        const clickColor = this.colorList[index];
        let randomList = this.getColorList();
        randomList[index] = clickColor;
        this.colorList = randomList;
      }
    },
  })
</script>
```

7. 如何统计页面加载时间
  performance
  开始加载: window.performance.timing.navigationStart



## D
1. css居中自适应
  *圣杯布局*
  主要是利用内边定位(最外层需要min-width)
  container
    padding-left: Lw
    padding-right: Rw
  main
    float: left
    width: 100%
  left
    position: relative
    left: -Lw
    margin-left: -Rw
  right
    position: relative
    right: -w
    margin-right: -w
  
  *双飞燕布局*
  利用嵌套div的利用主列的外边距定位
  main-wrap
    float: left
    width: 100%
  main
    margin-left: Lw
    margin-right: Rw
  left
    float: left
    margin-left: -Lw
  right
    float: left
    margin-right: -Rw

2. 输入URL到页面发生了什么

3. 前端性能优化

4. promise

5. 浏览器缓存
  *强缓存*
    - expires 设置过期时间, 受限于本地时间
    - cache-control no-store(不缓存), no-cache(资源被缓存, 下一次会验证资源是否过期) max-age(过期时间) 

  *协商缓存*
    last-modified: 文件的最后修改日期, 打开后也会修改日期
    ETag: 类似文件指纹

6. set、map、obj的区别
  *Map 和 Object*
    Object的键只能是string或symbol, 需要用其他方法获取size长度例如Object.keys().length
    Map的键: 任意基本类型或对象, 可以用size获取长度

  *Set 和 Array*
    Set内不可以有重复元素
    Array可以有重复元素

  *for of 和 for in*
    for of: 遍历对象的值
    for in: 遍历对象的键
  
7. http 123的区别
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
    - 多路复

8. vue原理 
  使用Object.definePrototype递归监听对象, 需要new Dep的实例对象
  利用getter里去收集依赖, 放进dep的订阅数组,
  利用setter里去派发更新, 如果数据有更新这个通知dep订阅数组的事件

9.  diff算法
  *为什么要使用虚拟DOM*
  渲染真实的DOM开销是非常大的, 如果修改了某个数据, 直接渲染到真实DOM, 会引起整个DOM树的重绘和回流

  - 使用js对象模拟DOM, 将DOM的数据提取出来, 以对象的形式模式属性结构
  - 当virtual Dom的某个节点数据发生改变后, 会生成一个新的Vnode
  - 然后Vnode和oldVnode作对比, 得出差异patch, 
  - 然后将补定作用在真实的DOM上

  *diff流程*
    当数据发生改变时, set方法会调用Dep.notify, 通知所有订阅者watcher
    订阅者就会调用patch 得到差异补丁, 打在真实DOM上, 更新对应视图

  *Vnode 和 oldVnode对比*
  Vnode 和 oldVnode都是对象
    - 如果Vnode和oldVnode同层节点不一样, 则会直接用Vnode替换oldVnode
    - 如果Vnode和oldVnode同层节点一样, 则会比较同层子节点


10. AST语法树
  源代码的抽象结构以树状形式表现出来, 类似json 一样的格式
  - js反编译,语法解析
  - babel编译ES6语法
  - 代码高亮
  - 关键字匹配
  - 作用域判断
  - 代码压缩

11. webpack原理

12. event loop
  - js 内核加载代码到执行栈
  - 执行栈依次执行主线程同步任务, 遇到异步任务则添加到回调事件的回调队列中, 微任务添加到微任务队列中, 宏任务添加到宏任务队列, 直到当前代码执行完成
  - 开始调取微任务队列中的回调事件放到执行栈, 全部执行完毕
  - 开始依次调取宏任务队列中的中任务,若过程中在遇到宏任务或者微任务, 都放到对应队列中, 本轮宏任务执行完毕再把本轮产生的微任务放置到执行栈中执行
  - 循环上述流程 就是event loop
  宏任务: setTimeout、setInterval、I/O
  微任务: promise process.nextTick

13. 数组扁平 reduce
*reduce*
  ```js
  function flatten(arr) {
    return arr.reduce((result, current) => {
      return result.concat(Array.isArray(current) ? flatten(current) : current);
    }, [])
  }
  ```
*apply*
```js
Array.prototype.concat.apply([], arr);
```

14.  时针与分针角度
```js
function calcium(h, m) {
  if(h>24 || m > 60) return;
  // 时针: 一小时走 360/12=30度, 一分钟走 360/12/60=0.5度
  // 分针: 一分钟走 360/12/5= 6度
  // h%12 取余
  var hDeg = h%12*30 + m*0.5;
  var mDeg = m * 6;
  return Math.abs(hDeg - mDeg);
}
```

## HP
1. vue.use都做了什么
  安装vue插件 插件接受参数有两个类型
  - Object: 需要有个install方法被调用
  - Function: 将被作为install方法将vue以参数传入

2. vue.nextTick
  vue在修改数据后, 视图不会立即更新, 而是等同一事件循环中的所有数据变化完成后, 再进行视图的更新
  DOM 更新结束后延迟执行
  *例子*
    通过变量控制input隐藏到显示时, 然后获取其焦点就需要nextTick了 

3. object.create 与 new 的区别
  *new object()*
    - 创建一个空对象
    - 将空对象的原型赋值为构造函数的原型
    - 更改构造函数内部this, 将其指向新创建的空对象
    ```js
    var person = new Person();

    //1. 创建一个空对象
    var o = new Object();

    //2. 将空对象的原型指向构造函数
    o.__proto__ = Person.prototype;

    //3. 将构造函数内部的this指向新对象
    Person.call(o) 

    //4. 将创建的对象返回
    person = o;
    ```

4. 手写bind函数
```js
Function.prototype.bind2 = function(context) {
  let self = this
  const [_this, arg] = arguments;
}
```
5. 多维数组降维
```js
function fn(arr) {
  return arr.reduce((r, c) => {
    return r.concat(Array.isArray(c) ? fn(c) : c);
  }, [])
}
```
6. 1px问题
  获取屏幕像素比 window.devicePixelRatio
  根据像素比设置meat name=viewProt的 initial-scale 和

## NK
1. 执行结果
```js
function Foo() {
  var i = 0;
  return function() {
    console.log(i++); 
  }
}
 
var f1 = Foo(), f2 = Foo();
f1();
f1();
f2();
```
  - 此处拆解 console.log(i); i = i+1; 
  - 第一步得到 i=0; 打印0
  - 第二部 因为返回的是个匿名函数(闭包), 所以局部变量i一直在内存中, 此时i = 1返回1
  - 第三部 因为Foo 是function 保存在堆内存中, 然后f2 指向的是新对象function() {...} 同第一步一样 得到i =0; 打印0


## DC
1. 使 `a == 1 && a == 2 && a == 3` 等true
  ```js
  // 1.重写a的toString方法
  const a = {
    i: 1,
    toString: function() {
      return a.i ++
    }
  }
  a == 1 && a == 2 && a == 3

  // 2. 数组toString 隐士调用join方法
  var a = [1,2,3];
  a.join = a.shift;
  a == 1 && a == 2 && a == 3 
  ```

2. opacity visibility display 特性, 隐藏父元素如何让子元素显示
  *opacity* 设置透明度 0-1
    占据空间、子元素不显示, 不会产生回流
    `自身绑定事件可触发`, 不一定会触发重绘

  *visibility* 元素是否可见 hidden(隐藏)、visible(显示)
    占据空间、自身绑定事件无法触发
    `子元素设置(visible)显示`、不会产生回流, 会产生重绘、transition生效
    
  *display* 元素显示类型 none(隐藏)
    不占据空间、子元素不显示、自身绑定事件无法触发, 会产生回流, 会产生重绘
    transition不生效

3. footer沉底效果的实现,  写出flex和非flex版
  ```js
  //html wrap{content, footer}

  //css: 使用min-height 和 flex
  wrap{
    min-height: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
  }
  
  // css: min-height + margin-top: auto
  wrap{
    min-height: 100%
    display: flex
    flex-direction: column
  }
  footer{
    margin-top: auto
  }

  // css: position + padding
  wrap{
    min-height: 100%
    position: relative
    padding-bottom: 100px
  }
  footer{
    height: 100px
    position: absolute
    bottom: 0
  }
  ```

4. vue的生命周期流程 一个不漏讲出来

5. vue双向绑定

6. 深拷贝，如果有一些东西在原型里，怎么实现深拷贝？
```js
function deepClone(target, map = new Map()) {
  if(typeof target === 'object' && target !== null) {
    var cloneTarget = Array.isArray(target) ? [] : {};
    if(map.get(target)) {
      return target;
    }
    map.set(target, cloneTarget)
    for(const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

7. 箭头函数和普通函数的区别
  - 箭头函数不会创建自己的this, 他的this指向的是作用域链上一层继承的this
  - 箭头函数没有自己的argument, 访问的是上一层作用域链的this, 在最外层会报错
  - 箭头函数没有没得原型 prototype
  - 箭头函数的this 不能直接改变, 想改变就修改他作用域上一级的this

8. box-sizing的值和区别?
  - content-box: 默认值。 width = width
  - border-box: width = border + padding + 内容宽度

9. jQuery的$(document).ready()和onload的区别？
  - $(document).ready() DOM结构绘制完毕就执行
  - onload 是等页面内所有元素类似图片加载完毕才执行

10. transform：translateX(-50%)和margin-left: -50%的区别？
  - translateX(-50%): 是相对自身的位移
  - margin-left: -50%, 是相对与父容器的宽度

11. 伪类和伪元素的区别
伪类: :active、:focus、:hover、:link、:first-child、:lang(指定元素中使用的语言)
伪元素: :before、:after、first-line、
伪类: 是类作用于标签的状态
伪元素: 是元素, 作用于内容本身

12. before和after的content属性？
  一个在元素内容前插入, 一个在元素内容后插入, display: inline 类型

13. 