## MVC
  - Model: 模型, 数据保存
  - View: 视图, 用户界面
  - Controller: 控制器, 业务逻辑
　


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

**
