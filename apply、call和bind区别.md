# apply、call和bind 的区别

**相同点**

​	1. 都是用来改变函数的this对象的指向。

​	2. 第一个参数都是this要指向的对象。

​	3. 都可以利用后续参数穿参。

**不同点**

**栗子1: bind 相对于 apply、call的区别 **

```
var cat ={
  food: 'fish',
  say: function(){
    console.log('I love' + this.food)
  }
}
var dog = {food: 'bone'}
cat.say();  //I love fish
```

如果dog 也想用cat 的say方法 打出 I love bone

1. 用 apply 来实现

   ```
   cat.say.apply(dog);
   ```


2. 用 call 来实现

   ```
   cat.say.call(dog);
   ```

3. 用 bind 来实现

   ```
   cat.say.bind(dog)();
   ```

**apply 和 call 都是对函数的直接调用，而 bind 方法返回的仍然是一个函数还需要（）执行一下才能调用**

**栗子2: apply 与 call 的区别**

```
var cat ={
  food: 'fish',
  say: function(master, petColor){
    console.log(master+' family of '+petColor+'pet love '+this.food);
  }
}
var dog = {food: 'bone'}
```

 say 方法多了两个参数

1. 用 apply 来实现

   ```
   cat.say.apply(dog, ['Tony', 'white']);
   ```

2. 用 call 来实现

   ```
   cat.say.call(dog, 'Tony', 'white');
   ```


3. 用 bind 来实现

   ```
   cat.say.bind(dog, 'Tony', 'white')();
   cat.say.bind(dog)('Tony', 'white');
   ```

**apply 和 call 的区别：**

**apply的第二个参数是一个数组，数组中的元素和say方法中的按照顺序对应。**

**call后面的参数和say中的参数按照顺序对应**

***因为bind返回的是一个函数故可以在调用的时候再传参**

