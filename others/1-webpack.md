## webpack
**1、webpack 与grunt、gulp的区别**
- Grunt和Gulp: 是基于任务和流的, 做的是一系列的链式操, 完成大部分重复任务
- webpack: 基于模块, 递归构建出一张依赖关系图, 然后将这些模块打包成一个或多个bundle

**2、webpack构建过程**
  1. 初始化参数: 从配置和shell语句中读取合并参数
  2. 开始编译: 根据参数初始化编译对象, 加载所有插件, 执行run方法开始编译
  3. 确定入口: 根据配置文件中的entry找出所有入口文件
  4. 编译模块: 从入口文件, 开始调用所有配置的Loader进行模块编译, 然后找出依赖继续递归本步骤, 直到所有依赖文件都经过了本步骤
  5. 完成模块编译: 经过上一步骤, 得到了每个模块编译后的依赖关系
  6. 输出资源: 根据入口和模块之间的依赖, 组装成一个包含多个模块的chunk包, 添加到输出列表,这是最后可以修改输出内容的机会
  7. 输出完成: 确定好输出内容, 根据配置输出文件名和路径, 把文件写入到文件系统

**3、Loader和Plugin的区别**
  - loader: 解析器, webpack只能解析js, 这时就需要Loader加载和解析非Js文件, 翻译成新的文件, 链式操作
  - Plugin: 插件, plugin是可以扩展webpack的功能, webpack在运行周期中会进行广播事件, plugin监听这些事件, 在合适的时机通过webpack提供的api 改变输出结果

**4、常见的Loader**
  - file-loader: 将文件输出到文件夹中, 通过相对路径引用
  - url-loader: 在文件很小的情况以base64方式注入到代码中
  - source-map-loader: 加载额外的Source Map文件, 方便调试
  - image-loader: 加载压缩图片文件
  - babel-loader: ES6转化成ES5
  - css-loader: 加载CSS 支持模块化、压缩、文件导入
  - style-loader: 将打包好的CSS 以style形式插入到html
  - eslint-loader: Eslint检测js代码


**5、常见的Plugin**
  - define-plugin: 定义环境变量
  - html-webpack-plugin: 简化html创建
  - uglifyjs-webpack-plugin: 通过`UglifyES`压缩ES6代码

**6、webpack优化**
*加快构建速度*
  - 优化Loader的搜索范围, inClude 包含文件, exClude 忽略文件
  - HappyPack 插件, 线程并行打包
  - externals 第三方库脱离webpack 打包, 类似 vue vue-router
  - dellPlugin 提前打包引入
  - 代码压缩 webpack-parallel-uglify-plugin 
  - 提取公共代码 CommonsChunkPlugin, 多入口情况下

*减小chunk包体积*
  - externals 第三方库脱离webpack 打包, 类似 vue vue-router 
  - 按需加载: 本质上是需要用时当使用时再去下载这个文件返回一个promise, 成功后执行回调
  - 代码压缩, 删除无用代码

