```js
var PENDING = 'pending';
var RESOLVED = 'resolved';
var REJECTED = 'rejected';

function PromiseA(executor) {
  var _this = this;
  _this.status = PENDING;
  _this.data = undefined;
  _this.rejectedCallBacks = [];
  _this.resolvedCallBacks = [];

  function resolve(value) {
    setTimeout(function() {
      if(_this.status === PENDING) {
        _this.status = RESOLVED;
        _this.data = value;
        _this.resolvedCallBacks.forEach(function(fn) {
          fn();
        })
      }
    })
  }

  function reject(reason) {
    setTimeout(function() {
      if(_this.status === PENDING) {
        _this.status = REJECTED;
        _this.data = reason;
        _this.rejectedCallBacks.forEach(function(fn) {
          fn();
        })
      }
    }) 
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('循环引用'));
  }

  resolve(x);
}

PromiseA.prototype.then = function(onResolved, onRejected) {
  var _this = this;
  var promise2;
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) { return value;};
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason){ throw reason;};
  promise2 = new PromiseA(function(resolve, reject) {
    setTimeout(function() {
      if(_this.status === PENDING) {
        _this.resolvedCallBacks.push(function() {
          try {
            var x = onResolved(_this.data);
            resolvePromise(promise2, x, resolve, reject)
          } catch(reason) {
            reject(reason);
          }
        })
  
        _this.rejectedCallBacks.push(function() {
          try {
            var x = onRejected(_this.data);
            resolvePromise(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      }
  
      if(_this.status === RESOLVED) {
        try {
          var x = onResolved(_this.data);
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      }
  
      if(_this.status === REJECTED) {
        try {
          var x = onRejected(_this.data);
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      }

    })
  })

  return promise2;
}

PromiseA.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

PromiseA.prototype.finally = function(cb) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(cb()).then(() => value),
    reason => P.resolve(cb()).then(() => {throw reason})
  )
}

PromiseA.resolve = function(value) {
  return new PromiseA(function(resolve, reject) {
    resolve(value);
  })
}

PromiseA.reject = function(reason) {
  return new PromiseA(function(resolve, reject) {
    reject(reason);
  })
}

PromiseA.race = function(promises) {
  return new PromiseA(function(resolve, reject) {
    promises.forEach(function(promise) {
      promise.then(resolve, reject)
    }) 
  })
}
module.exports = PromiseA;
```