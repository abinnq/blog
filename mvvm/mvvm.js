class MVVM {
  constructor(options) {
    let {el, data} = options;
    this.$el = el;
    this.$data = data;
    if(this.$el) {
      // 数据劫持
      new Observer(this.$data);
      new Compile(this.$el, this);
    }
  }
}