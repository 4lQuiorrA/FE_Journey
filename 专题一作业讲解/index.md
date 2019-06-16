### T1

```
console.log(a);
console.log(typeof yideng(a))
var flag = true;
if(!flag){
    var a=1;
}
if(flag){
    function yideng(a){
        yideng = a;
        console.log("yideng1");
    }
}else{
    function yideng(a){
        yideng = a;
        console.log("yideng2");
    }
}
yideng();
```

分析这段代码，先看一段简单的
```
if(false){
    function yideng(){
        console.log(yideng);
    }
}
yideng();// 输出yideng is no a function
```

深入一下

```

function yideng(){
    console.log(1);
}

function init(){
    if(false){
        function yideng(){
        console.log(2);
    }
    }
    yideng();
}
init();
```

我们分析两种情况
1. 当这段代码有init的时候，这个时候，init里面的`function`由于被`false`给限制住了，只能将函数名提升出来，所以在`init`里面就有一个`yideng`的变量名，当`yideng()`执行的时候，就直接报出`yideng is not a function`
2. 当这段代码没有init的时候，函数`yideng`被提升到最上面，然后执行`yideng()`输出`1`


```
console.log(typeof yideng()) // undefined
// 为什么是undefined呢？
if else 这里形成了词法作用域，词法作用域干什么呢-让程序按照顺序才能执行到词法作用域的地方。所以if else里面的函数暂时无法提升到最上面，所以输出undefined


// 继续看

if(true){
    function yideng(a){
        yideng = a;
        console.log("yideng")
    }
}else{
    function yideng(a){
        yideng = a;
        console.log("yideng2")
    }
}
```

- 这里能否被修改呢？能
- 看小黄书的说法，当一个函数为表达式的时候，无论在那里函数名都是不能变的。
- 这里很明显不是表达式，所以yideng是可以修改的

```
if(true){
    function yideng(a){
        yideng = a;
        console.log(typeof yideng)
        console.log("yideng")
    }
    console.log(yideng)
}else{
    function yideng(a){
        yideng = a;
        console.log(typeof yideng) 
        console.log("yideng2")
    }
}

console.log(yideng(undefined))
console.log(typeof yideng)
```

函数体内输出的的为`undefined` ，`yideng = a`仅仅在词法作用域里面将函数名改变了,所以在里面`undefined`,外面输出`function`

**在来看一个例子**
```
function yideng(){
    yideng = 1;
}
yideng();
console.log(yideng); // 1
```
上上面的例子`yideng`处于 `if(){}`中括号的块级作用域中，这个例子`yideng`处于全局的作用域中，所以改了之后就会在当前作用域生效

- 总结，在那里改变，在那里生效


### T2

```
function fn(){
    console.log(this.length); // 当this为window的时候等于页面iframe的数量
}
var yideng = {
    length:5,
    method:function(){
        "use strict";
        fn();
        argument[0]();
    }
}
const result = yideng.method.bind(null);
result(fn,1);
```
讲讲`bind(null)`的作用：将当前函数的`this`软绑定，方式其他调用的时候硬绑定了`method`的`this`,不允许修改指针;以便后续自己操作来绑定`this`;

### T3

```
function yideng(a,b,c){
    console.log(this.length); // 4
    console.log(this.callee.length) // 1
}
function fn(d){
    arguments[0](10,20,30,40,50);
}
fn(yideng,10,20,30);
```

`this.length` 表示函数的实参
`this.callee.length`函数的形参

哎？不对哇，`this.callee.length`不是指函数的形参吗？我们看`this`指的是谁？`this->fn`，指向fn，所以这段话指的是`fn的形参1`
其实直接说是函数的形参是有问题的，应该说，当函数没有人调用的时候，是指向当前函数的形参，但当有人调用的时候，这就应该要看调用函数的`this`是谁。


### T4

```
function test(){
    var a = 1;
    return function(){
        eval("")
    }
}
test()();
```

使用chrome浏览器中`Memory`模块来查看变量的状态
举栗说明
```
function Yideng(name){
    this.name = name;
}
var s1 = new Yideng("ming");
var s2 = new Yideng("wei");
//s1 = null;
```

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/memorykuaizhao.png)

**Distance表示引用的距离。距离根节点的距离**

**当`s1=null`的时候，可以看到`Yideng`下面的s1不见了，这是因为s1被GC给回收了**
- 但是要记住赋值给null，GC不一定会立马回收掉该对象。(会在下一轮执行GC的时候被回收)


再看一段代码

```
function Yideng(name){
    this.name = name;
}
let YidengFactory = function(name){
    let student = new Yideng(name);
    return function(){
        console.log(student);
    }
}
let p1 = new YidengFactory("老远");
p1();
p1 = null;
```

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/bibaomemroy.png)

这段代码执行后，我们发现了`Yideng`还在内存中？为什么？**根本原因是，闭包里面的匿名函数一直在里面无法被GC掉**

但是我们发现Distance竟然没有了：但是为什么还留着呢？**虽然这个时候，当前 student和Yideng的连线断了，但是仍然要随时准备被new重新和Yideng连接**
distance代表为了是否在引用，如果没有，就没有在引用了
**堆栈的基本解释**

- 栈（stack） 栈stack为自动分配的内存空间，它由系统自动释放；
- 堆（heap） 堆heap是动态分配的内存，大小不定也不会自动释放。
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/duizhan.png)

- 基本类型 （Undefined、Null、Boolean、Number和String）
 基本类型在内存中占据空间小、大小固定 ，他们的值保存在栈(stack)空间，是按值来访问
- 引用类型 （对象、数组、函数） 
 引用类型占据空间大、大小不固定, 栈内存中存放地址指向堆(heap)内存中的对象。是按引用访问的

 **栈内存中存放的只是该对象的访问地址， 在堆内存中为这个值分配空间 。 由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小的固定的，因此可以将内存地址保存在栈内存中。 这样，当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。**


 回到原题中

 我们通过`debugger`来调试看看
- 这个有`eval`的时候
 ![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/youeval.png)

- 没有`eval`的时候

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/meiyoueval.png)


- 可以看到在[[Scope]]里面的内容有明显的变化，这就可以表示当前变量`a`是没有被`GC`掉的

除了这种方法,还有一种方法叫做快照，查看方式比较简单。前面已经展示了。

总结：eval不对词法作用域上的任何变量解绑，eval无法解析自己里面字符串的内容。eval的作用范围是：自己当前处于的作用域。所以这个题目的解决方法是：将`eval`改成`window.eval`为什么可以这样做。加上了`window`，可以让eval认为当前是要在window的作用域范围内执行。在window范围内是没有`a`的

**扩展一下**
```
var a = "京程"
function init(){
    var a = "一灯";
    var test = new Function("console.log(a)");
    test();
}
```

不去掉引号打印`京程`,去掉引号打印`一灯`，为什么呢？`""`的作用会默认将里面的内容进行全局作用域的词法绑定，如果没有引号也就没有绑定全局的功能了。

```
var obj = {
    apple:"京程"
}
with(obj){
    yideng = "苹果"
}
console.log(obj.yideng);
```
`with`会在`obj`查询当前对象上有没有这个对象，如果有则赋值，没有则将当前内容绑定到全局上。
特别注意：`GC`一旦遇到`with`会放弃所有变量的回收。

### T5

```
class BWM extends Car{
    constructor(color){
        super(color);
    }
    yideng(){
        console.log(111);
    }
}
BWM.prototype.yideng = function(){
    console.log(2222)
}
const bwm = new BWM("yellow");
bwm.yideng(); //2222
```
为什么输出`2222`？因为ES6就是js的语法糖，在`BWM`的原型上有一个`yideng`的方法，再次定义之后，就被重写成输出`2222`

```
在BWN类中增加
super.ss ="3"

bwm.ss // 3
```
为什么呢？`super`如果直接使用的话，是指向当前使用的类的，如果当做方法来使用的话是指向父类的

### T6

```
Object.prototype.a = 'a';
Function.prototype.a = "a1";
function Person(){}
var yideng = new Person();
console.log(Person.a); // 在Function原型上的a
console.log(yideng.a); // 在Object原型上的a
console.log(1..a);
console.log(1.a);
console.log()
```

`1..a`是什么哇？`1.a`又是什么
来看一个例子
```
typeof 1.
```
这里打印`number`,为什么，js有规定这种写法是有效的，就跟写浮点型是一个道理了，因为后面没有接小数位,所以就等于`1`。所以`1..a`等于`number.a`等于`"a"`
但是`1.a`没有这种写法，无法将`.`分配给谁。正确的写法应该是`(1).a`


### T7
元编程：js中没有的方法，然后通过编程让js中出现这种方法。简单来讲就是控制编程的编程。

举个例子
```
var yideng = ?
if(yideng==1&&yideng===2&&yideng===3){
    console.log('匹配')
}
```
在我们的正常思维上，这种方法不可能通过一个表达式来实现这个情况，但是通过元编程就能实现

```
var yideng = {
    [Symbol.toPrimitive]:((i)=>()=>++i)(0)
}

```
在`Symbol.toPrimitive`属性(作为值)的帮助下,一个对象可以被转换成原始值.
当操作原始值的时候,他就会执行对应的方法.

**proxy代理**

**Reflect反射**

```
function Tree(){
	return new Proxy({},handler);
}

 var handler = {
	get(target,key,receiver){
	if(!(key in target)){
	target[key] = Tree();
		}
	return  Reflect.get(target,key,receiver)
	}

}

let tree = new Tree();

tree.yideng.person = "yideng"
console.log(tree)
```

**npmjs也提供了一种reflect-metadata**
就是通过反射,直接给没有这个方法的对象,定义这种方法

/*
*使用举栗
*/
```
Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");
let metadataValue = Reflect.getMetadata(metadataKey, obj, "method");

```

### T8

```
let a = 0;
let yideng = async ()=>{
    a = a+ await  10;
    console.log(a);
}
yideng();
console.log(++a);
```
**打印的:1  10**
首先`async`是一个异步函数,所以`console.log(++a)`肯定会优于整个`yideng`函数先执行完;打印出第一个`1`
然后我们看一下`yideng`这个函数`a= a+await 10` 这句话要分为2端来执行,首先是`a+`部分,这一段代码是同步代码所以一开始`a=0`先执行 .
`async`在执行的时候会冻结执行时的变量(也就是说,在`async`函数在遇到`await`异步的时候,无法继续执行,会把内部被执行完的同步的部分给冻结住,让内部的变量不会被改变).

### T9
```
$("#test").click(function(argument){
    console.log(1);
})
setTimeout(function(){
console.log(2);
},0)
while(true){
    console.log(Math.random());
}
```
javascript分为同步执行栈和异步执行队列,
`while(true)`的执行将整个进程给阻塞了,所以,后面的异步执行队列就无法执行了.
- 解决方法:使用多线程(webwork或者使用concurrent.thread.js)

首先是最常见的`webwork demo`
html
```
<div id="test">11</div>

 $('#test').click(function() {
        alert(1);
    });
    var worker = new Worker("task.js");
    worker.onmessage = function(event){
        console.log(event.data)
    }
```
**task.js**

```
postMessage(Math.random());// 主线程通过postMessage向线程发送数据
```

- 接下来是一种简单的方法:使用concurrent.thread.js
只需要引入这个js
然后增加`type="text/x-script.multithreaded-js"`

```
<script src="./Concurrent.Thread.js"></script>
<script type="text/x-script.multithreaded-js">
$("#test").click(function(argument){
    console.log(1);
})
setTimeout(function(){
console.log(2);
},0)
while(true){
    console.log(Math.random());
}
</script>
```