## 继承

*原型链*
将一个类的实例赋值给另一个类的原型

缺点: 多个实例会对引用类型的数据修改

```js
function superType(name) {
  this.name = name;
}
function subType() {};
subType.prototype = new superType()
```

*构造函数*
在子类的构造函数内调用父类的构造函数

缺点: 只能继承父类实例上的属性和方法
```js
function superType(name) {
  this.name = name;
}
function subType() {
  superType.call(this);
};
```

*组合式继承*
```js
function superType(name) {
  this.name = name;
}
function subType() {
  superType.call(this);
};
subType.prototype = new superType();
subType.constructor = subType;
```

*寄生组合式*
创建超类原型的一个副本

```js
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
function superType() {}

function subType() {
  superType.call(this)
}
```

