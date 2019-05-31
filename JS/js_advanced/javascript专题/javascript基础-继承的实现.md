### 继承的实现
```
function Car(color){
}
Car.prototype.run = function(){
    console.log('run')
}
var s = new Car()
console.log(s)

function Cuze(color){
    Car.call(this,color)
}
console.log(Car.prototype)
var _proto = Object.create(Car.prototype)
console.log(_proto)
_proto.construct = Cuze
Cuze.prototype = _proto
Cuze.prototype.gogo = function(){
    console.log('gogo')
}
var s1 = new Cuze("green")
var s2 = new Car("red")
console.log(s1)
console.log(s2)
```

```
function m (){
console.log(111)
}

m.prototype.ss = function(){
}

function c(){
    m.call(this,null) // 执行父类的构造函数
}
// 按引用传递
// 1.拿到父类原型链上的方法
// 2.不能让父类的构造函数执行两次
// 3.引用的原型链不能是按址传递的
// 4.修正子类的constructor
var _pro = Object.create(m.prototype)

_pro.construct = c

c.prototype = _pro

var ss = new c()

console.log(ss)
```