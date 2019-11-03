## MVC
  - Model: 模型, 数据保存
  - View: 视图, 用户界面
  - Controller: 控制器, 业务逻辑
　
## MVVM
  

## Vue的生命周期
  1. beforeCreate(创建前): 事件注册和组件实例刚被创建, 组件属性计算之前, 此时获取不到`data` 和`props`
  2. created(创建后): 组件实例创建完成, 属性已绑定, 但DOM未生成, `$el` 属性还不存在
  3. beforeMounted(挂载前): 相关render函数首次被调用, 实例已经完成了: 模板编译, data里面的数据和模板编译成虚拟 DOM, 未挂载到页面上。创建virtualDOM,
  4. mounted(挂载后): 生成的虚拟DOM 挂载到html页面, 递归挂载子组件, 最后挂载跟组件;
  5. beforeUpdate(更新前): 数据更新之前调用, 虚拟DOM 重新渲染和打补丁之前
  6. updated(更新后): 数据变更导致虚拟DOM重新渲染和打补丁,组件DOM已经更新到页面上
  7. beforeDestroy(销毁前): 实例销毁之前调用, 实例仍然可用。
  8. destroyed(销毁后): 实例销毁后调用, 递归销毁子组件, 最后是根组件
   
  *keep-alive*
  动态组件: keep-alive独有的生命周期, 包裹组件在切换时不会进行销毁, 而是缓存到内存中并执行`deactivated`, 命中缓存中渲染后会执行`activated`


## Vuex 状态管理

  - state: 纯放数据的状态, 不可以直接修改其内容。
  - mutations: 动态修改 Vuex 中 state的状态或数据。
  - getters: 类似vue的计算属性, 主要是用来过滤数据。
  - action: 异步处理数据的方法。

## 组件通信
**1、父子组件通信**
    父组件通过`props` 传递给子组件, 子组件通过`emit` 发送事件传递给父组件;
    2.3 以上版本可以用listeners 和 `.sync` 来通信
  
**2、兄弟组件通信**
  - 使用`this.$parent.$children` 根据组件name 查询兄弟组件
  - 使用父子组件通讯, 在父组件维护数据

**3、跨组件通信**
  - event bus 或者直接上vuex 安全舒适

## mixin 和 mixins
  - mixin: 用于全局混入, 会影响到每一个组件, 适合做组件的初始化
  - mixins: 常用的扩展组件的方式

## computed 和 watch 区别
  - computed 是计算属性,依赖于其他计算值, 会有缓存, 只有当前值变化的时候才会改变
  - watch: 监听到值的变化就会执行回调

## 组件中data 什么时候可以使用对象
  因为组件复用时,所有的组件实例都会共享 data, 如果是 data 是对象就会造成一个组件修改data会造成影响其他组件。所以需要改成 函数
  当我们使用 `new Vue`时就可以了用对象了


## vue响应原理
  - vue 内部使用`Object.defineProperty()` 劫持内部的`get`和`set`
  - 依赖收集, 然后在属性变更时,再派发更新

## Object.defineProperty 的缺陷
  无法更新: 通过下标的方式修改数组, 或者给对象新增属性, 不会触发组件的　重新渲染;
  因为Object.definePrototype 无法拦截这些操作;
  针对第一个使用重写set方法来实现, vue.set

## 为什么Vue 3.0使用Proxy?
  - 因为proxy不需要一层层递归为每个属性添加代理,一次就可以完成;
  - 原本有些数据更新无法监听到, 这个任何数据变更都可以监听到;

## new Vue 时发生了什么
  - 合并配置
  - 初始化声明周期
  - 初始化事件中心
  - 初始化渲染初始化 data、props、computed、watcher

## v-model
  v-model 是语法糖

## vue router
router.beforeEach(to,from,next)

## hash 与 history
  - hash 得益于#号,  后面的内容修改不会重新加载页面
    通过监听window.onhashchange 可以得到oldUrl 和newUrl
    hash的变化都会被浏览器记录下来, 前进和后退都可以啦

  - history 得益于HTML5
    通过pushState() 和 replaceState() 来修改url 不会重新加载页面
    pushState添加当前页面的记录
    replaceState 修改当页面的记录
  
  history 需要配置404的页面