class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    if(this.el) {
      // 1. 先把真实DOM移入到内存中 fragment
      let fragment = this.node2fragment(this.el);
      // 2. 编译 => 提取想要的节点 v-model 和文本节点 {{}}
      this.compile(fragment);
      // 3. 把编译好的 fragment 再赛回到页面中
      this.el.appendChild(fragment);
    }
  }

  isElementNode(node) {
    return node.nodeType === 1;
  }

  node2fragment(el) {
    // 文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  isDirective(name) {
    return name.includes('v-');
  }

  compileElement(node) {
    // v-model v-text
    let attrs = node.attributes; 
    Array.from(attrs).forEach(attr => {
      // 属性名是否包含v-
      let attrName = attr.name;
      if(this.isDirective(attrName)) {
        let expr = attr.value;
        let [,type] = attrName.split('-');
        CompileUtils[type](node, this.vm, expr);
      }
    })
  }

  compileText(node) {
    // {{}}
    let expr = node.textContent;
    let reg = /{\{([^}]+)\}\}/g;
    if(reg.test(expr)) {
      CompileUtils['text'](node, this.vm, expr)
    }
  }

  compile(fragment) {
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if(this.isElementNode(node)) {
        // 元素节点
        this.compileElement(node);
        this.compile(node);
        return;
      }
      // 文本节点
      this.compileText(node);
    });
  }
}

CompileUtils = {
  getVal(vm, expr) {
    // message.a.b
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);

  },

  getTextVal(vm, expr) {
    return expr.replace(/{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    });
  }, 

  text(node, vm, expr) {
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm, expr);
    expr.replace(/{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue) => {
        // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
        updateFn && updateFn(node, this.getTextVal(vm, newValue));
      });
    });
    updateFn && updateFn(node, value);
  },

  setVal(vm, expr, value) {
    expr = expr.split('.');
    return expr.reduce((prev,next,currentIndex)=>{
        if(currentIndex === expr.length-1){
            return prev[next] = value;
        }
        return prev[next];
    },vm.$data);
  },
  
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater'];
    new Watcher(vm, expr, (newValue) => {
      updateFn && updateFn(node, newValue);
    });
    node.addEventListener('input', (e) => {
      let newValue = e.target.value;
      this.setVal(vm, expr, newValue);
    })
    let value = this.getVal(vm, expr);
    updateFn && updateFn(node, value);
  },

  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value
    }
  }
}