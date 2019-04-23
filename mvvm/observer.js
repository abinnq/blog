class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    if(!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observer(data[key]); // 递归劫持
    });

  }

  // 定义数据劫持
  defineReactive(obj, key, value) {
    let _this = this;
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true, // 可枚举
      configurable: true, // 可改变
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        if(newVal != value) {
          _this.observer(newVal);
          value = newVal;
          dep.notify(); // 通知所有订阅者, 数据更新
        }
      }

    });
  }
}