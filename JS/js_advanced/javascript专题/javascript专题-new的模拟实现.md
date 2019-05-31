**模拟实现new-思路**

1. 创建一个新对象

2. 将构造函数的作用域赋给新对象（因此this就指向了这个对象）

3. 执行构造函数的代码（为这个新对象添加属性）

4. 返回新对象

   ```javascript
   
   function newFun(constructor){
       var o = {}
       // 将o的原型指向构造函数，这样o就可以访问到构造函数原型中的属性
       o.__proto__ = constructor.prototype;
      	// 改变构造函数的this的指向到新建的对象，这样o就可以访问到构造函数中的属性
       var ret = constructor.apply(o,Array.prototype.slice.call(arguments,1))
        // 需要判断返回的值是否是对象，如果不是对象返回正常数据类型
       return typeof ret ==='object'?ret:o
       
   }
   // 再次使用上面的例子
   function Person(name, age) {
     this.name = name;
     this.age = age;
   }
   
   Person.prototype.sayName = function () {
     return `my name is ${this.name}, I'm ${this.age} years old`;
   }
   
   Person.prototype.study = function () {
     return `my name is ${this.name}`;
   }
   
   let person =  newFun(Person, 'renbo', 28);
   console.log(person.name); // renbo
   console.log(person.sayName()); // my name is renbo, I'm 28 years old
   console.log(person.study()); // my name is renbo
   
   
   ```

   

****

**Array.prototype.slice.call(arguments,1)**

> arguments是一个类数组所以无法直接使用slice方法

**当new遇到bind的时候**
```
a.bind(obj);
var aa = new a()
// 这个时候在new的时候，函数里面的this不会指向obj，而指向a的实例，bind的this会失效
```