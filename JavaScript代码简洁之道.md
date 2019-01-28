## Table of Contents
  1. [变量](#变量)
  2. [函数](#函数)
  3. [对象和数据结构](#对象和数据结构)
  4. [类](类)

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

### 功能应该只做一件事
这是迄今为止软件工程中最重要的规则。
当函数执行多个操作时，它们更难以编写，测试和推理。
**Bad:**
```javascript
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if(clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Good:**
```javascript
function emailClients(clients) {
  clients
    .filter(isActiveClient)
    .forEach(email)
}
function isActiveClient(client) {
  const ClientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

### 函数的名字应该描述出其作用
**Bad:**
```javascript
function addToDate(date, month) {
  // ...
}
const date = new Date();
// 无法从名称得知参数作用
addToDate(data, 1);
```

**Good:**
```javascript
function addMonthToDate(date, month) {
  // ...
}
const date = new Date();
addMonthToDate(1, date)
```

### 函数应该只有一个抽象级别
函数嵌套过多，应当拆出，否则将难以编写、测试和阅读。
**Bad:**
```javascript
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

**Good:**
```javascript
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach((node) => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach((token) => {
    syntaxTree.push( /* ... */ );
  });

  return syntaxTree;
}
```

### 删除重复代码
重复代码将不利于维护、阅读和测试，
使用模块、函数、类处理重复代码中的差异，应该遵循Classes部分中规定的SOLID原则
**Bad:**
```javascript
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

**Good:**
```javascript
function showEmployeeList(employees) {
  employess.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();
    const data = {
      expectedSalary,
      experience,
    };

    switch (employee.type) {
      case 'manager':
        data.portfolio = employee.getMBAProjects();
        break;
      case 'developer':
        data.githubLink = employee.getGithubLink();
        break;
    }

    render(data);
  });
}
```

### 设置对象默认属性
**Bad:**
```javascript
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
};

function createMenu(config) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```

**Good:**
```javascript
const menuConfig = {
  title: 'Order',
  buttonText: 'Send',
  cancellable: true
};

function createMenu(config) {
  config = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);
}

createMenu(menuConfig);
```

### 不要传 flag参数
通过flag的true 或者 false, 来判断执行逻辑,违反了一个函数干一件事的原则
**Bad:**
```javascript
function createFile(name, temp) {
  if(temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Good:**
```javascript
function cretaeFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  fs.create(`/temp/${name}`);
}
```

### 避免副作用(第一部分)
函数接收一个值,返回一个新值，除此之外都被称为副作用。 比如修改全局变量进行异步操作
当函数确实需要副作用时， 需要在唯一的地方处理。
副作用常见陷阱： 1.没有任何结构的对象之间共享状态 2.随意修改可变数据类型 3.没有在统一的地方处理副作用
**Bad:**
```javascript
let name = 'Ryan McDermott';
function splitIntoFirstAndLastName() {
  name = name.split('');
}
splitIntoFirstAndLastName();
console.log(name);
```

**Good:**
```javascript
function splitIntoFirstAndLastName(name) {
  return name.split('');
}
const name = 'Ryan McDermott';
const newName = splitIntoFirstAndLastName(name);
console.log(name, newName);
```

### 避免副作用（第二部分
基本类型通过赋值传递， 对象和数组通过引用类型传递，浅拷贝

**Bad:**
```javascript
const addItemToCart = (cart, item) => {
  cart.push({item, date: new Date()});
};
```

**Good:**
```javascript
const addItemToCart = (cart, item) => {
  return [...cart, {item, date: new Date()}];
};
```

### 不要写全局方法
永远不要污染全局变量

**Bad:**
```javascript
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
};
```

**Good:**
```javascript
class SuperArray extends Array {
 diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
 };
}
```

### 尽量使用函数式编程而非命令式
函数式变编程可以让代码的逻辑更清晰更优雅，方便测试。
**Bad:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];
let totalOutput = 0;
for (let i = 0; i < programmerOutput.length: i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

**Good:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];
const totalOutput = programmerOutput
  .reduce((totalLines, output) => totalLines + output.lineOfCode, 0)
```

### 封装条件语句

**Bad:**
```javascript
if(fsm.state === 'fetching' &&  isEmpty(listNode)) {
  // ...
}
```

**Good:**
```javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode);
}
if(shouldShowSpinner(fsmInStance, listNodeInstance)) {
  // ...
}
```

### 尽量别用“非”条件句

**Bad:**
```javascript
function isDOMNodeNotPresent(node) {
  // ...
}

if(!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Good:**
```javascript
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}
```

### 避免使用条件语句
Q: 不使用if 改如何做？
A: 绝大多数场景可以使用多态来代替。
Q: 为什么要多态？ 而非条件语句？
A: 让代码简单易读，如果出现了条件判断说明函数并非只做了一件事， 违反了函数单一原则。
**Bad:**
```javascript
class Airplane {
  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

**Good**
```javascript
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

### 避免类型检查(第一部分)
javascript是无类型的，意味着传参是任意类型的，这很可怕,
很多时候需要类型检查，这就需要在设计api式就要考虑进去类型的
**Bad:**
```javascript
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location('texas'));
  }
}
```

**Good:**
```javascript
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location('texas'));
}
```

### 避免类型检查(第二部分)
如果需要静态类型检查， 比如字符串 整数等 推荐使用TypeScript

**Bad:**
```javascript
function combine(val1, val2) {
  if(typeof val1 === 'number' && typeof val2 === 'numer'
  || typeof val1 === 'string' && typeof val2 === 'string') {
    return val1 + val2
  }
  throw new Error('Must be of type String or Number');
}
```

**Good**
```javascript
function combine(val1, val2) {
  return val1 + val2;
}
```

### 不要过渡优化
现代浏览器已经在底层做了很多优化，过去的很多优化方案都是无效的，会浪费时间和沉于代码
[现代浏览器优化内容](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
**Bad:**
```javascript
// 在旧浏览器中每次使用未缓存的list.length， 每次迭代都需要计算 造成不必要的计算
// 现代浏览器已经做了优化
for (let i = 0; len = list.length; i < len; i++) {
  // ...
}
```

**Good:**
```javascript
for(let i = 0; i < list.length; i++ ) {
  // ...
}
```

### 删除弃用代码
很多时候代码已经没用了， 担心以后会用到，舍不得删除
如果你忘了无用代码会一直都在，
放心删除，代码库历史版本可以找的到

**Bad:**
```javascript
function oldRequestModule(url) {
  // ...
}
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**Good:**
```javascript
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

## 对象和数据结构

### 使用gte、和set操控数据
在操作数据时打日志，方便跟踪。在set 时很容易对数据进行校验

**Bad:**
```javascrip
function makeBankAccount() {
  // ...
  return {
    balance: 0
  };
}
const account = makeBankAccount();
account.balance = 100;
```

**Good:**
```javascript
function makeBankAccount() {
  let balance = 0;

  function getBalance() {
    return balance;
  }

  function setBalance(amount) {
    balance = amount;
  }

  return {
    getBalance,
    setBalance,
  };
}
const account = makeBankAccount();
account.setBalance(100);
```

### 使用私有变量
使用闭包来创建私有变量
**Bad:**
```javascript
const Employee = function(name) {
  this.name = name;
};

Employee.prototype.getName = function getName() {
  return this.name;
};
const employee = new Employee('John Doe');
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined
```

**Good:**
```javascript
function makeEmployee(name) {
  return {
    getName() {
      return name;
    }
  };
}
const employee = new Employee('John Doe');
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
```

### 类

