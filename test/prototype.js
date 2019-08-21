function Person() {
  
}
Person.prototype.name ='abin'
var person = new Person();

console.log(person.name);
console.log(person.__proto__ === Person.prototype)
console.log(Person === Person.prototype.constructor)
console.log(Person.prototype.__proto__ === Object.prototype)
/**
 * Person: 构造函数
 * person: 实例对象
 * Person.prototype: 实例原型
 * 
 * prototype: 
 *  函数的 prototype 属性, 指向 调用该构造函数而创建的实例原型
 *  每一个javascript对象在创建的时候都会关联另一个对象即原型, 每一个对象都会从原型继承属性
 * 
 * __proto__: 
 *  除null之外的对象都会有,该属性会指向该对象的原型
 *  person.__proto__ === Person.prototype
 * 
 * constructor: 
 *  每个原型都会有的属性, 指向该原型的构造函数
 *  Person.prototype.constructor === Person
 * 
 * 原型的原型
 *  Person.prototype.__proto__ === Object.prototype
 */
