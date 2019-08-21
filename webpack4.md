## webpack4


1. webpack 与grunt、gulp的区别?
  grunt和gulp 是基于任务和流的, 类似jQuery, 找到一个或一类文件,做的一系列链式操作, 更新流上的数据, 整条链式操作就会构成一个任务, 多个任务就构成了整个web的构建流程。
  webpack 是基于入口的。 webpack会自动 递归解析入口所需要加载的资源文件, 用不同的loader处理不同的文件,用plugin 来扩展webpack功能。

2. 常见的Loader和其作用?
  - file-loader: 把文件输出到一个文件夹中, 在代码中通过相对的url去引用输出文件。
  - url-loader: 和发ile-loader 类似, 但是能在文件很小的情况下以base64方式把文件引入。
  - source-map-loader: 加载额外的Source Map文件, 方便断点调试。
  - image-loader: 加载并且压缩图片文件。
  - babel-loader: 把ES6转化ES5。
  - css-loader: 加载CSS, 支持模块化、压缩、文件导入等特性。
  - style-loader: css注入到javascript中, 通过DOM操作加载css。
  - eslint-loader: 通过eslint检查javascript代码。
  - sass-loader: 加载sass模块转化成css

3. 常见的插件Plugin有那些
  - define-plugin: 定义环境变量
  - commons-chunk-plugin: 提取公共代码
  - uglify-webpack-plugin: 通过UgligyES压缩es6代码

4. loader 和 plugin的区别?
  作用上: 
    Loader模块加载器, Webpack 将一切文件视为模块, 但是webpack原生只能解析js文件, 如果要将其他的文件打包解析就要用到loader; Loader的作用: 让webpack拥有加载和解析非javascript文件的能力。
    Plugin插件, Plugin 可以扩展webpack的功能,让webpack具有更多的灵活性。 webpack运行生命周期中会广播事件, Plugin 监听这些事件, 从打包优化到代码压缩,一直到重新定义环境变量,来改变webpack的输出结果。
  用法上:
    Loader: 在`module.rules` 中配置, 作为模块解析的规则而存在,类型为数组,每一项都是Object,test为加载什么类型文件,使用什么loader加载和使用的参数options
    Plugin: 在plugins 中单独配置, 类型为数组, 每一项都是plugin的实例, 通过构造函数传入。

5. webpack的构建流程, 从读取配置到文件输出?
  1. 初始化参数: 从配置文件和shell语句中读取与合并参数, 得出最终的参数。
  2. 开始编译: 用上一步得到的参数初始化Compiler对象, 加载所有配置的插件,执行对象的run 方法开始编译;
  3. 确定入口: 根据配置中的entry 找出所有的入口文件;
  4. 编译模块: 从入口文件出发,调用所有配置的Loader对模块进行编译, 再找出该模块依赖的模块, 再递归本步骤, 直到所有入口依赖文件都经过本步骤的处理。
  5. 完成模块编译: 在第4补使用Loader编译完所有模块后,得到每个模块被翻译后的最终内容,以及它们之间的依赖关系。
  6. 输出资源: 根据入口和模块之间的依赖关系, 组成一个个包含多个模块的Chunk, 再把每个Chunk转换成一个单独的文件加入到输出列表, 这是修改输出内最后的机会。
  7. 输出完成: 确定好输出内容, 根据配置确定好输出的内容和文件名, 把文件内容写入到文件系统。

  webpack 会在特定的时间点广播特定事件, 插件在监听到事件后会执行, 然后插件调用webpack API 来改变运行结果。

6. webpack 热更新原理?
  1. 在webpack 的watch 模式下, 文件系统中某一个文件发生修改, webpack 监听到文件变化, 根据 


7. 如何利用webpack 优化前端性能?
  - 压缩代码, 删除多余代码、注释、简化代码写法等等方式。利用webpack的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩Js文件, 利用cssnano css-loader-minimize来压缩css
  - 利用CDN加速, 在构建过程中, 将引用的静态资源路径修改为CDN上对应的路径。利用webpack 对与 output 参数和各loader的publicPath 参数来修改资源路径
  - 删除死代码, 将代码中永远不会走到的片段删除, 可以在启动webpack时增加参数`--optimize-minimize` 来实现。
  - 提取公共代码

8. 如何提高webpack 构建速度?
  - 多入口情况下, 使用CommonsChunkPlugin 来提取公共代码
  - 通过 `externals` 配置来提取常用库
  - 利用 `DllPlugin` 和 `DllReferencePlugin` 预编译资源模块 通过 `DllPlugin` 来对那些引用但是绝对不会修改的npm包来进行预编译,在 通过DllReferencePlugin 将预编译的模块加载进来
  - 使用 `Happypack` 实现多线程加速编译
  - 使用 `webpack-uglify-parallel` 来提升 `uglifyPlugin` 的压缩速度
