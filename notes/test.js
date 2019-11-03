Array.prototype.filter = function(fn, context) {
  if(typeof fn !== 'function'){
    throw new TypeError('fn is not function');
  }
  var arr = this;
  var temp = [];
  for(var i =0; i < arr.length; i++) {
    var result = fn.call(context, arr[i], i, arr);
    if(result) {
      temp.push(arr[i]);
    }
  }
  return temp;
}

Array.prototype.reduce = function(fn, initValue) {
  if(typeof fn !== 'function') {
    throw new TypeError('fn is not function');
  }
  initValue = null;
  var arr = this;
  for(var i = 0; i < arr.length; i++) {
    initValue = fn(initValue, arr[i], i, arr)
  }
  return initValue;
}

Array.prototype.map = function(fn, context) {
  var temp = [];
  var arr = this;
  for(var i =0; i< arr.length; i++) {
    var result = fn.call(context, arr[i], i, arr);
    temp.push(result);
  }
  return temp;
}


// var a = [];

// a[0] = 'b';
// a['a'] = 28;
// console.log(a.length);
// console.log(a['a'])
// console.log(a)

function deepClone(target, map = new Map()) {
  if(typeof target === 'object' && target !== null) {
    var cloneTarget = Array.isArray(target) ? [] : {};
    if(map.get(target)) {
      return target;
    }
    map.set(target, cloneTarget)
    for(const key in target) {
      if(target.hasOwnPrototype(key)){
        cloneTarget[key] = deepClone(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
