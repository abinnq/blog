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