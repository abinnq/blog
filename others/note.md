## react、vue 等组件业务逻辑拆分
- 框架负责渲染(*.vue、*.jsx、*.tsx)
- 状态管理负责调度(vuex、redux、mobx)
- server负责源数据: (*.js、*.ts)
  1. 通过方法暴露数据的获取和发送。
  2. 格式化相关数据格式
- test 单独针对server进行单元测试
- mock负责模拟数据来源,提供server获取
  