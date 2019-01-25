## 变量

### 使用有意义且常用的单词命名
**Bad:**
```javascript
const yyyymmdstr = moment().format('YYYY/MM/DD');
```

**Good:**
```javascript
const currentDate = moment().format('YYYY/MM/DD');
```

### 尽量保持命名统一 使用相同类型的词汇
**Bad:**
```javascript
getUserInfo();
getClientData();
getCustomerRecord();
```

**Good:**
```javascript
getUser();
```

### 使用可以被搜索的名字
每个常量应该被命名
**Bad:**
```javascript
// 8640000 是什么含义？
setTimeout(blastOff, 8640000);
```

**Good:**
```javascript
const MILLISEXONDS_IN_A_DAY = 8640000;
setTimeout(blastOff, MILLISEXONDS_IN_A_DAY);
```

### 使用解释变量
**Bad:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
```

**Good:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

### 临时变量也要有意义
**Bad:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((l)=> {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // 不观看上下文无法理解 l 代表什么
  dispatch(l);
});
```

**Good:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((location)=> {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ..
  dispatch(location);
});
```

### 避免重复的前缀
如果定义了car 没必要在car下再定义carColor 直接定义color即可
**Bad:**
```javascript
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue',
};
function paintCar(color){
  Car.carColor = color;
}
```

**Good:**
```javascript
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue',
};
function paintCar(color){
  Car.color = color;
}
```

### 使用默认参数
**Bad:**
```javascript
function createMicrobrewery(name) {
  const breweryNmae = name || 'Hipster Brew Co.';
  // ...
}
```

**Good:**
```javascript
function createMIcrobrewery(name = 'Hipster Brew Co.') {
  // ...
}
```

## Function 函数

### 参数越少越好
如果参数超过两个，使用 解构语法，不用考虑参数顺序

**Bad:**
```javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

**Good:**
```javascript
function createMenu({title, body, buttonText, cancellable}) {
  // ...
}
createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
});
```
