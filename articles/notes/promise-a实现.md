## 一. Promise 与 Promise/A+

  Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一。
  Promise/A+ 是 Promise 最小的一个规范。包括
    - Promise 状态
    - then 方法
    - Promise 解析过层 
  只有一个`then` 方法, 没有`catch`、`race`、`all`等方法
  ECMAscript 6 Promise 是符合Promise/A+ 标准之一。

  - [阮老师 ES6](http://es6.ruanyifeng.com/#docs/promise)
  - [Promise/A+规范](https://promisesaplus.com/)
  - [Promise/A+规范 中文翻译](https://github.com/kaola-fed/blog/blob/10d31a751d71d5af616612160c69654a19899b2e/source/_posts/%E3%80%8C%E8%AF%91%E3%80%8DPromisesA%2B%E8%A7%84%E8%8C%83.md)
  - [Promise/A+ Test](https://github.com/promises-aplus/promises-tests)

## 二. 具体实现

1. PromiseA 大体框架
  *举个栗子:*
  
  ```js
  let p = new Promise(function(resolve, reject) {
    resolve('200');
})
  
  p.then(data => {
    console.log(data);
  }, err => {
    console.log('err', err)
})
  
  // 200
  ```
  *分析一下:*
    1. new Promise 返回一个promise对象, 接受一个`executor`执行器函数, 立即调用函数。
    2. `executor` 接收两个参数`resolve`、`reject`, 同时这两个参数也是函数。
    3. Promise 实例具有状态, 默认`pending`(等待), 执行器调用resolve后,实例状态变为`resolved`(成功)。 执行器调用reject,实例状态变为`rejected`(失败)。
    4. Promise 实例状态一经改变, 将不能再修改。
    5. promise 实例 都有 `then`方法。then 方法中有两个参数。`onResolved`成功回调函数, `onRejected`失败回调函数
  6. 执行器`executor`调用`resolve`后, then中`onResolved`将会执行, 当执行器`executor`调用`reject`后, then方法第二个参数`onRejected`将会执行。
  
  *实现一下:*
  ```js
  // promise 三个状态
  var PENDING = 'pending';
  var RESOLVED = 'resolved';
  var REJECTED = 'rejected';
  function PromiseA (executor) {
    // 保存一下this, 防止this出现指向不明
    var _this = this; 
    // 初始化 promise 的值
    _this.data = undefined;
    // 初始化 promise 的状态
    _this.status = PENDING;
    function resolve(value) {
      // 在pending时修改对应状态, 和 promise 值
      if(_this.status === PENDING) {
        _this.status = RESOLVED;
        _this.data = value;
      }
    }
    function reject(reason) {
      // 在pending时修改对应状态, 和 promise 值
      if(_this.status === PENDING) {
        _this.status = REJECTED;
        _this.data = reason;
      }
    }
    executor(resolve, reject);
}
  
  PromiseA.prototype.then = function(onResolved, onRejected) {
    var _this = this;
    // 状态是成功状态, 立即执行成功回调, 并传入其值
    if(_this.status === RESOLVED) {
      onResolved(_this.data);
    }
    // 状态是失败状态, 立即执行失败回调, 并传入其值
    if(_this.status === REJECTED) {
      onRejected(_this.data);
    }
}
  
  module.exports = PromiseA;
```
  
2. 异步执行, then方法多次调用
  *举个栗子:*
  ```js
  let p = new PromiseTest(function(resolve, reject) {
    setTimeout(() => {
      resolve('200');
    }, 1000)
  })

  p.then(data => {
    console.log(1, data)
  }, err => {
    console.log('err', err)
  })

  p.then(data => {
    console.log(2, data)
  }, err => {
    console.log('err', err)
  })
  // 1, '200'
  // 2, '200'
  ```

  *分析一下:*
  结果将会在一秒中之后打印, 即`then`方法的失败和成功回调是在promise 的异步执行完之后才触发的, 
  所以 在调用`then` 方法的时候 promise 的状态并不是成功或者失败, 
  先将成功或者失败的回调函数保存起来,等异步执行完成后再执行对应的成功或者失败回调函数。
  then 方法可以调用多次, 所以保存时需要使用数组

  *实现一下:*
  ```js
  function PromiseA (executor) {
    // ...

    // 保存成功和失败的回调函数
    _this.resolvedCallbacks = [];
    _this.rejectedCallbacks = [];

    // 调用成功函数
    function resolve(value) {
      // 在pending时修改对应状态, 和 promise 值
      if(_this.status === PENDING) {
        _this.status = RESOLVED;
        _this.data = value;
        _this.resolvedCallbacks.forEach(function(fn) {
          fn();
        });
      }
    }
    // 调用失败函数
    function reject(reason) {
      // 在pending时修改对应状态, 和 promise 值
      if(_this.status === PENDING) {
        _this.status = REJECTED;
        _this.data = reason;
        _this.rejectedCallbacks.forEach(function(fn) {
          fn();
        });
      }
    }
  }

  PromiseA.prototype.then = function(onResolved, onRejected) {
    // ...

    // 状态是等待, 将回调函数保存起来
    if(_this.status === PENDING) {
      _this.resolvedCallbacks.push(function() {
        onResolved(_this.data);
      })
      _this.rejectedCallbacks.push(function() {
        onRejected(_this.data);
      })
    }
  }
  ```

3. 错误捕获
  *举个栗子:* 
  ```js
  let p = new PromiseA((resolve, reject) => {throw new Error('error')});
  p.then(data => {
    console.log(data);
  }, err => {
    console.log('err', err)
  })
  // err Error: error
  ```
  
  *分析一下:*
  Promise 出错时会直接改变到失败状态, 并将失败原因传递过去。
  直接对执行函数`executor` 进行异常处理, 出错就进入`reject`函数。

  *实现一下:*
  ```js
  function PromiseA (executor) {
    // ...
    try {
      executor(resolve, reject);
    } catch (reason) {
      reject(reason);
    }
  }
  ```
4. then方法链式调用
  *举个栗子:*
  ```js
  let p = new Promise(function(resolve, reject) {
    resolve('200');
  })

  p.then(data => {
    console.log(1, data)
    throw Error('oooo')
  }, err => {
    console.log('1err', err)
  }).then(data => {
    console.log(2, data);
  }, err => {
    console.log('2err', err)
  }).then(data => {
    console.log(3, data)
  }, err => {
    console.log('3err', err)
  })
  console.log('start');

  // start
  // 1 '200'
  // 2err Error: oooo
  // 3 undefined
  ```
  *分析一下:*
  1. promise 是异步执行函数。 故先打印`start`, 使用`setTimeout` 保证执行顺序。
  2. Promise 实例调用`then` 方法后, 返回了一个新的Promise实例,
  3. 该Promise 执行成功或者失败的结果, 传递给下一个promise实例的`then`方法 `onResolved`或`onRejected` 回调的参数。
  4. Promise 实例链式调用 `then` 时, 当任何一个`then`执行出错时, 链时调用的下一个`then`时会执行错误的回调, 
  5. 返回值未定义即`undefined`, 再次调用会执行成功的回调, 即上面的 `3 undefined`。

  *实现一下:*
  ```js

  function PromiseA (executor) {
    // ...
    function resolve(value) {
    // 在pending时修改对应状态, 和 promise 值
      setTimeout(function() {
        if(_this.status === PENDING) {
          _this.status = RESOLVED;
          _this.data = value;
          _this.resolvedCallbacks.forEach(function(fn) {
            fn();
          });
        }
      })
    }

    function reject(reason) {
    // 在pending时修改对应状态, 和 promise 值
      setTimeout(function() {
        if(_this.status === PENDING) {
          _this.status = REJECTED;
          _this.data = reason;
          _this.rejectedCallbacks.forEach(function(fn) {
            fn();
          });
        }
      })
    }
  }

  PromiseA.prototype.then = function(onResolved, onRejected) {
    var _this = this;
    var promise2;
    promise2 = new PromiseA(function(resolve, reject) {
      // 异步执行, 保证调用顺序
      setTimeout(function() {
        // 状态是成功状态, 立即执行成功回调, 并传入其值
        if(_this.status === RESOLVED) {
          // then方法执行 异常处理, 错误进入执行reject
          try {
            var x = onResolved(_this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason)
          }
        }
        // 状态是失败状态, 立即执行失败回调, 并传入其值
        if(_this.status === REJECTED) {
          var x = onRejected(_this.data);
          resolvePromise(promise2, x, resolve, reject);
        }
      
        // 状态是等待, 将回调函数保存起来
        if(_this.status === PENDING) {
          _this.resolvedCallbacks.push(function() {
            var x = onResolved(_this.data);
            resolvePromise(promise2, x, resolve, reject); 
          })
          _this.rejectedCallbacks.push(function() {
            var x = onRejected(_this.data);
            resolvePromise(promise2, x, resolve, reject);
          })
        }
      })
    })
    return promise2;
  }

  function resolvePromise(promise2, x, resolve, reject) {
    resolve(x);
  }
  ```
5. 值的穿透
  *举个栗子:*
  ```js
  let p = new Promise(function(resolve, reject) {
    resolve('200');
  })

  p.then()
  .then(null, err => {
    console.log('1err', err)
  })
  .then(data => {
    console.log(data)
  }, err => {
    console.log('2err', err)
  })
  // '200'
  ```
  *分析一下:*
  当上一个`then`没有传递回调参数, 或者参数为`null`时, 需要将值传递给下一个`then`方法
  `then`方法的两个参数都是可选参数`onResolved` 和 `onRejected`, 
  故, 判断回调函数是否为函数, 就把`then`的参数留空并且让值穿透到后面。

  *实现一下:*
  ```js
  PromiseA.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value};
    onRejected = typeof onRejected === 'function' ? onREjected : function(reason) {throw reason};
    
    // ...
  }
  ```
6. 循环引用
  *举个栗子:*
  ```js
  let p = new Promise(function(resolve, reject) {
    resolve('200');
  })

  var p2 = p.then(() => {
    return p2;
  })

  p2.then(() => {
    console.log(1)
  }, err => {
    console.log('err1', err)
  })
  // err1 TypeError: Chaining cycle detected for promise
  ```
  *分析一下:*
  上述代码, 让 p 的`then`方法回调自己, 就会产生循环回调, 
  故, `then` 方法中的回调函数不能是自己本身

  *实现一下:*
  ```js
  function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
      return reject(new TypeError('循环引用'));
    }
  }
  // ...
  ```

7. resolvePromise 函数实现
  *resolvePromise 涉及到的Promise/A+ 规范*
    - 将每个 Promise 实例调用`then`后返回的新 Promise 实例称为 promise2，将 `then` 回调返回的值称为`x`
    - promise2 不可以和 `x` 为同一个对象, 自己等待自己, 循环引用。
    - 如果`x`是一个对象或者函数且不是`null`，就去取 `x` 的 then 方法，如果 `x` 是对象，防止`x` 是通过 `Object.defineProperty` 添加 `then` 属性，并添加 get 和 set 监听，如果在监听中抛出异常，需要被捕获到，`x.then` 是一个函数，就当作 `x` 是一个 Promise 实例，直接执行`x` 的 `then` 方法，执行成功就让 `promise2` 成功，执行失败就让`promise2` 失败，如果 `x.then` 不是函数，则说明 `x` 为普通值，直接调用`promise2` 的 `resolve` 方法将 `x` 传入，不满足条件说明该返回值就是一个普通值，直接执行 `promise2` 的 `resolve` 并将 x 作为参数传入；
    - 如果每次执行`x` 的 `then` 方法，回调中传入的参数还是一个 Promise 实例，循环往复，需要递归 `resolvePromise` 进行解析
    - 在递归的过程中存在内、外层同时调用了 `resolve` 和 `reject` 的情况，应该声明一个标识变量 `called` 做判断来避免这种情况

  *实现一下:*
  ```js
  function resolvePromise(promise2, x, resolve, reject) {
    var then;
    // 为了避免多次调用
    var called = false;

    if(promise2 === x) {
      return reject(new TypeError('循环回调'));
    }

    // x 如果是普通值(非 object 或 function), 直接resolve
    if(x !== null && (typeof x === 'object' || typeof x === 'function')){ 
      // 每个promise 都会有then方法, 使用_then保存, 防止出错, 使用try catch 
      try {
        then = x.then;
        if(typeof then === 'function') {
          // 确定 this 指向x
          then.call(x, function(y) {
            if(called) return;
            called = true;
            return resolvePromise(promise2, y, resolve, reject);
          }, function(e) {
            if(called) return;
            called = true;
            return reject(e);
          })

        } else {
          resolve(x);
        } 

      } catch (err) {
        if(called) return;
        called = true;
        reject(err);
      }

    } else {
      resolve(x);
    } 
  }
  ```

## 三. 测试一下
  使用 这个包[promises-aplus-tests](https://github.com/promises-aplus/promises-tests) 走下单元测试
  按其说明，需要提供一个这样的类静态函数：

  ```js
  PromiseA.deferred = PromiseA.defer = function() {
    var dfd = {}
    dfd.promise = new PromiseA(function(resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }
  ```

## 四. 扩展方法

  1. catch方法
    *举个栗子:*
  ```js
  let p = new Promise(function(resolve, reject) {
    resolve('200');
  })

  p.then(data => {
      throw new Error('eeee');
  }, err => {
      console.log('err', err)
  }).catch(err => {
      console.log(err)
  })
  // Error eeee
  ```

  *实现一下:*
  ```js
  PromiseA.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  }
  ```

  2. resolve 方法
    *举个栗子:*
  ```js
  let p = Promise.resolve('200');
  p.then(data => {
      console.log(data)
  }, err => {
      console.log('err', err)
  })
  // 200
  ```

  *实现一下:*
  ```js
  Promise.prototype.resolve = function(value) {
    return new Promise(function(resolve, reject) {
      resolve(value);
    })
  }
  ```

  3. reject 方法
    *举个栗子:*
  ```js
  let p = Promise.reject('eeee');

  p.then(data => {
      console.log(data)
  }, err => {
      console.log('err', err)
  })
  // err eeee
  ```

  *实现一下:*
  ```js
  Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
      reject(reason)
    })
  }
  ```

  4. race 方法
    *举个栗子:*
  ```js
  let p1 = new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  }) 
  let p2 = new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  }) 
  let p3 = new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  }) 

  let p = Promise.race([p1, p2, p3])
  p.then(data => {
    console.log(data)
  }, err => {
    console.log('err', err)
  })

  // 1
  ```

  *实现一下:*
  ```js
  Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
      promises.forEach(function(promise) {
        promise.then(resolve, reject)
      }) 
    })
  }
  ```

## 五. 全部代码

```js
// promise 三个状态
var PENDING = 'pending';
var RESOLVED = 'resolved';
var REJECTED = 'rejected';

/**
 * 
 * @param {function} executor 
 */
function PromiseA (executor) {
  // 保存一下this, 防止this出现指向不明
  var _this = this; 

  // 初始化 promise 的值
  _this.data = undefined;

  // 初始化 promise 的状态
  _this.status = PENDING;

  // 保存成功和失败的回调函数
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  // 调用成功函数
  function resolve(value) {
    // 在pending时修改对应状态, 和 promise 值
    setTimeout(function() {
      if(_this.status === PENDING) {
        _this.status = RESOLVED;
        _this.data = value;
        _this.resolvedCallbacks.forEach(function(fn) {
          fn();
        });
      }
    })
  }

  // 调用失败函数
  function reject(reason) {
    // 在pending时修改对应状态, 和 promise 值
    setTimeout(function() {
      if(_this.status === PENDING) {
        _this.status = REJECTED;
        _this.data = reason;
        _this.rejectedCallbacks.forEach(function(fn) {
          fn();
        });
      }
    })
  }

  // 用于处理 new PromiseA((resolve, reject) => {throw new Error('error')})
  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason)
  }
}

/**
 * 
 * @param {promise} promise2 then 执行后返回 新的Promise对象
 * @param {*} x promise中onResolved 的返回值
 * @param {*} resolve promise2的resolve方法
 * @param {*} reject promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  var then;
  // 为了避免多次调用
  var called = false;

  if(promise2 === x) {
    return reject(new TypeError('循环回调'));
  }

  // x 如果是普通值(非 object 或 function), 直接resolve
  if(x !== null && (typeof x === 'object' || typeof x === 'function')){ 
    // 每个promise 都会有then方法, 使用_then保存, 防止出错, 使用try catch 
    try {
      then = x.then;
      if(typeof then === 'function') {
        // 确定 this 指向x
        then.call(x, function(y) {
          if(called) return;
          called = true;
          return resolvePromise(promise2, y, resolve, reject);
        }, function(e) {
          if(called) return;
          called = true;
          return reject(e);
        })

      } else {
        resolve(x);
      } 

    } catch (err) {
      if(called) return;
      called = true;
      reject(err);
    }

  } else {
    resolve(x);
  } 
}

/**
 * @param {function} onResolved 成功回调
 * @param {function} onRejected 失败回调
 */
PromiseA.prototype.then = function(onResolved, onRejected) {
  var _this = this;
  var promise2;
  // 值的穿透
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value};
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {throw reason};

  return promise2 = new PromiseA(function(resolve, reject) {
    // 异步执行, 保证调用顺序
    setTimeout(function() {
      // 状态是成功状态, 立即执行成功回调, 并传入其值
      if(_this.status === RESOLVED) {
        // 针对内部
        try {
          var x = onResolved(_this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason);
        }
      }
      // 状态是失败状态, 立即执行失败回调, 并传入其值
      if(_this.status === REJECTED) {
        try {
          var x = onRejected(_this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      }
    
      // 状态是等待, 将回调函数保存起来
      if(_this.status === PENDING) {
        _this.resolvedCallbacks.push(function() {
          try {
            var x = onResolved(_this.data);
            resolvePromise(promise2, x, resolve, reject); 
          } catch (reason) {
            reject(reason);
          }
        })
        _this.rejectedCallbacks.push(function() {
          try {
            var x = onRejected(_this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason)
          }
        })
      }
    })
  })
}

PromiseA.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

PromiseA.resolve = function(value) {
  return new PromiseA(function(resolve, reject) {
    resolve(value);
  })
}

PromiseA.reject = function(reason) {
  return new PromiseA(function(resolve, reject) {
    reject(reason)
  })
}

PromiseA.race = function(promises) {
  return new PromiseA(function(resolve, reject) {
    promises.forEach(function(promise) {
      promise.then(resolve, reject)
    }) 
  })
}

//  配合使用 promises-aplus-tests 测试
PromiseA.deferred = PromiseA.defer = function() {
  var dfd = {}
  dfd.promise = new PromiseA(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = PromiseA;
```

## 六. Reference

  - [阮老师 ES6](http://es6.ruanyifeng.com/#docs/promise)
  - [Promise/A+规范](https://promisesaplus.com/)
  - [Promise/A+规范 中文翻译](https://github.com/kaola-fed/blog/blob/10d31a751d71d5af616612160c69654a19899b2e/source/_posts/%E3%80%8C%E8%AF%91%E3%80%8DPromisesA%2B%E8%A7%84%E8%8C%83.md)
  - [Promise/A+ Test](https://github.com/promises-aplus/promises-tests)
  - [剖析Promise内部结构](https://github.com/xieranmaya/blog/issues/3)

