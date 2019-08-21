// Function.prototype.call2 = function(context){
//   var argus = [];
//   for(var i = 1; i < arguments.length; i++) {
//     argus.push('arguments[' + i + ']');
//   }
  
//   var fn = Symbol('gg');
//   console.log(fn);
//   context[fn]= this;
//   eval('context[' + fn +']('+argus+')');
//   delete context[fn];
// };

// var cat ={
//   food: 'fish',
//   say: function(master, petColor){
//     console.log('I love ' + this.food + ' master ' + master.name + ' petColor ' + petColor);
//   }
// }
// var dog = {food: 'bone'}
// // cat.say();  //I love fish
// cat.say.call2(dog, {name: 'abin'}, 'black');

function deepClone(obj) {
  if(obj === null) return null;
  if(typeof obj !== 'object') return obj;
  let target = new obj.constructor();
  // for(let key in obj) {
  //   target[key] = deepClone(obj[key]);
  // }

  Object.entries(obj).map(([key,value]) => {
    target[key] = deepClone(value);
  })
  return target;
}


let a = {
  name: 'abin',
  test: {name:'t'},
  age: undefined,
  jobs: function() {},
  sex: Symbol('male'),
}



let b = deepClone(a);
a.test.name = 'tt';
// console.log(b);
var array = [1, 2, '1', 2, 1];

// 双层循环
function unique1(array) {
  var res = [];
  for(var i = 0; i < array.length; i++ ) {
    for(var j = 0; j < res.length; j++ ) {
      if(array[i] === res[j]) {
        break;
      }
    }
    if(j === res.length) {
      res.push(array[i])
    }
  }
  return res;
}

// indexOf
function unique2(array) {
  var res = [];
  for(var i = 0; i < array.length; i++) {
    if(res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
}

// 排序后去重
function unique3(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for(var i = 0; i< sortedArray.length; i ++) {
    // 第一个元素 或者 相邻的元素不相同
    var value = sortedArray[i];
    if(!i || seen !== value) {
      res.push(value)
    }
    seen = value;
  }
  return res;
}

// unique API
function unique4(array, isSorted) {
  var res = [];
  var seen;
  for(var i = 0; i < array.length; i ++) {
    var value = array[i];

    if(isSorted) {
      if(!i || value !== seen) {
        res.push(value)
      }
      seen = value;
    }

    // 没经过排序的
    if(!isSorted && res.indexOf(value) === -1) {
      res.push(value)
    }
  }

  return res;
}

// filter
function unique(array) {
  return array.filter((item, index, array) => {
    return array.indexOf(item) === index;
  })
}


console.log(unique(array));
