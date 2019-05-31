### this
==具名函数在其内部可以使用函数名来引用自身==
```
function foo (){
foo.count = 4 // foo 指向自身
}
```


> 需要明确的是，this 在任何情况下都不指向函数的词法作用域
>
> this 实际上是在函数被调用时发生的绑定，==它指向什么完全取决于函数在哪里被调用==

#### 绑定规则
- **默认绑定**
```
console.log(this); //window
function fun() {
 console.log(this.a) // 非严格模式下1 ，严格模式下undefined
}
var a = 1;
fun(); 
```
- **隐式绑定**
> 隐式丢失
        
> 一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说他会应用默认绑定，从而把this绑定到全局或者undefined上，取决于是否是严格模式
```
function foo(){
console.log(this.a)

}

let obj = {
    a:2,
    foo:foo
}
var bar = obj.foo
var a = 'aaa'

bar() // aaa
```
> 虽然bar 是obj.foo的一个引用，但实际上，他引用的是foo函数本身，因此此时的bar其实是一个不带任何修饰的函数调用，因此应用了默认绑定

**一种更微妙/更常见并且更出乎意料的情况发生在传入回调函数时：**
```
function foo(){
console.log(this.a)
}
function doFoo(fn){
fn() // fn其实引用的是foo,
}

var obj = {
    a:2,
    foo:foo
}
var a = 'oop,global'
doFoo(obj.foo)
```
- **硬绑定**<br/>
**由于硬绑定是一种非常常用的模式，所以ES5中提供了内置的方法Function.prototype.bind  apply call**
```
function foo(something){
console.log(this.a,something)
reuturn this.a+something
}

var obj = {
a:2
}
var bar = foo.bind(obj)
var b = bar(3)
coonsole.log(b) //5

 //bind(...)会返回一个硬编码的新函数，它会把参数设置为this的上下文并调用原始函数
```
**new绑定**
> 首先我们重新定义一下javascript中的构造函数。在javascript中，构造函数只是一些使用new操作符时被调用的函数。他并不会属于某个类，也不会实例化一个类，实际上，他甚至不能说是一种特殊的函数类型

**使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作**
- 创建（或者说构造）一个全新的对象
- 这个新对象会被执行【原型】连接
- 这个新对象会绑定到函数调用的this
- 如果函数没有返回一个其他的对象，那么new表达式中的函数调用会自动返回这个新对象
--------------

> ==隐式绑定<显性绑定==
> ==隐式绑定<new绑定==

> new和apply/call 无法一起使用，因此无法通过new foo.call(obj)来直接进行测试new 和显性绑定


> bind(...)的功能之一就是可以除第一个参数（第一个参数用于绑定this）之外的其他参数都传给下层函数（这种技术称为“部分应用”，是‘柯里化’的一种）

> apply 能用于数组的展开 可以用...实现
>
> bind    能用于柯里化

-----------
**例子**
```
this.a = 20
var p = {
    a:30,
    test:function(){
        function s(){
            console.log(this.a)
        }
        s()
    }
}
p.test() // 20
// 解析：p.test()执行了p对象里面的test函数，函数里面的函数s自己执行，跟p的this没有任何关系，所以当前this在p中找不到，这