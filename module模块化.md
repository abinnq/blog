# 模块化

## 什么是模块化?
  将复杂的程序依据一定的规范封装成几个文件,
  有自己的作用域内部实现是私有的, 只向外暴露特定的变量和函数。
  优点: 避免命名冲突、更好地分离 按需加载、高复用性、高维护性。

## 模块化进程
1. 全局function
  将不同的功能封装成不同的全局函数。
  缺点: 污染全局的命名空间。
  ```type='js'
  function m1() {
    // ...
  }
  function m2() {
    // ...
  }
  ```
2. namespace模式
  简单对象的封装, 采用对象写法, 避免命名冲突。
  缺点: 数据不安全, 会暴露所有模块成员,内部状态可以被改写。
  ```type='js'
  var module1 = new Object({
    _count: 0,
    m1: function() {
      // ...
    },
    m2: function() {
      // ...
    },
  });
  module1.m1(); 
  module1._count = 3; // 内部状态被改写
  ```
3. 闭包模式
  达到不暴露私有成员的问题
  ```type='js'
  var module1 = (function(){
    var _count = 0;
    var m1 = function() { // ... };
    var m2 = function() { // ... };
    return {
      m1: m1,
      m2: m2,
    }
  })();
  console.log(module1._count); // undefined
  ```
4. script load
  通过script标签引入一堆依赖, 按顺序执行。
  ```type='js'
  script(src="zepto.js")
  script(src="underscore.js")
  script(src="app.js")
  ```
## 模块化规范
1. CommonJs
  CommonJs 是Node独有的规范, 浏览器需要借助Browserify 解析。
  每个文件就是一个模块, 有自己的作用域。
  在服务端模块的加载是同步加载的, 浏览器端需要提前编译打包处理
  模块可以多次加载, 模块的加载顺序按照在代码中出现的顺序。

  引入模块: `require(xxx)`。
  暴露模块: `module.exports` 或者 `exports`(不推荐使用, 是对module.exports对象的引用)

2. AMD
  AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
  在浏览器环境,要从服务端加载模块,这是就需要异步加载,
  `require.js` 主要实现这个功能,
   require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，
   它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。
  暴露模块:
  ```type='js'
  // 定义没有依赖的模块
  define(function() {
    return module;
  })

  // 定义有依赖的模块
  define(['module1', 'module2'], function(m1, m2) {
    return module;
  })
  ```
  引入使用模块:
  ```type='js'
  require(['module1', 'module2'], function(m1, m2) {
    // do m1 m2...
  })
  ```
3. CMD
  CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

  *CMD依赖就近, AMD依赖前置*
  *对于依赖模块, CMD延迟执行, AMD提前执行*
  AMD是将需要的模块先加载完执行代码, 
  而CMD是在 require 的时候才去加载模块,加载完再执行。
  ```type='js'
  // CMD sea.js 中的main.js
  define(function(require, exports, module) {
    var addModule = require('./add');
    console.log(addModule.add(1, 1));
    // 依赖就近书写
    var squareModule = require('./square');
    console.log(squareModule.square(3));

    // 打印顺序
    // 加载 add 模块
    // 2
    // 加载 square 模块
    // 9
  })

  ```
  ```type='js'
  // AMD require.js 中 main.js
  // 依赖提前写好
  require(['./add', './square'], function(addModule, squareModule) {
    console.log(addModule.add(1, 1));
    console.log(squareModule.square(3));
  })

  // 打印顺序
  // 加载 add 模块
  // 加载 square 模块
  // 2
  // 3

  ```
4. ES6
  暴露模块: `export` 或 `export default` (模块指定默认输出, 加载时可以指定任意名字)
  引入模块: `import`

  **ES6模块与CommonJs 模块差异**
  - CommonJs 模块是运行时加载, ES6 模块是编译时输出接口
  - CommonJs 模块输出的是一个值的拷贝, ES6模块输出的是值的引用

  第一个差异: CommonJs加载的是一个对象(module.exports), 该对象只有在脚本运行完才会生成, ES6模块 不是对象, 是一种静态定义, 在代码静态解析阶段就会生成。

  第二个差异:
  CommonJs 模块输出的是值的拷贝,因为是基础数据类型, 会被缓存。
  ```type='js'
  // 输出模块 counter.js
  var counter = 3;
  function inCounter() {
    counter += 1;
  }
  module.exports = {
    counter: counter,
    inCounter: inCounter,
  };

  // 引入模块 main.js
  var mod = require('./counter');
  console.log(mod.counter); // 3
  mod.inCounter();
  console.log(mod.counter); // 3
  ```
  ```type='js'
  // 输出模块 counter.js
  var counter {
    value: 3,
  };
  function inCounter() {
    counter.value += 1;
  }
  module.exports = {
    counter: counter,
    inCounter: inCounter,
  };

  // 引入模块 main.js
  var mod = require('./counter');
  console.log(mod.counter); // 3
  mod.inCounter();
  console.log(mod.counter); // 4
  ```

  **Babel**
  ```type='js'
  // ES6
  const name = 'abin';
  const age = 18;
  export {name, age};
  ```

  ```type=js
  // Babel 编译后

  Object.definePrototype(exports, '__esModule', {
    value: true
  });

  var name = 'abin';
  var age = 18;
  exports.name = name;
  exports.age = age;
  ```
  ```type='js'
  // ES6 
  import {name, age} from './profile';

  // Babel 编译后
  'use strict';
  var _profile = require('./profile');
  ```
**webpack**
Babel 将 ES6转为 CommonJs 后, webpack 会将其包裹注入
`module`、 `exports`、`require`z这些变量。




## 模块化
**定义**
实现特定功能的相互独立的一组方法


**模块化优点**
  - 解决命名冲突
  - 提高复用性
  - 提高代码可维护性

**1、立即执行函数(闭包)**

**2、AMD和CMD**
AMD: 提倡依赖前置, 在定义模块的时候就要声明其依赖的模块
```js
define(['./a', './b'], function(a, b) {
  // todo
})
```

CMD: 提倡就近依赖(按需加载), 在需要用到的时候再去require
```js
define(['./a'], function(a) {
  var b = require('./b');
  // todo
})
```

**3、CommonJS**
目前在node 和 webpack 比较常见
每个JS文件独立存储它的模块, 像闭包一样, 
module.exports导出模块, require 引入模块

**4、Module**
ES6的解决方案
export用于导出, import 引入模块, export default 默认导出模块

