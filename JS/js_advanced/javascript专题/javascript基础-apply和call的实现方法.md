### call 

> call 方法在使用一个指定的this的值和若干个指定的参数值的前提下调用某个函数或者方法<br>

```
var foo = {
    value:1
};
function bar(){
    console.log(this.value)
}
bar.call(foo); // 1
```
**注意两点**
- call改变了this的指向，指向到了foo
- bar函数执行了
- 
**模拟实现第一步**

```
// 当调用call的时候，把foo对象改造成如下：
var foo = {
    value:1,
    bar:function(){
        console.log(this.value); //1
    }
}
foo.bar() // 1
```
> 这样就实现了让bar的this指向了foo ，但是这个时候foo增加了一个属性，这不符合要求

- 想法1： 可以运行完之后吧foo中多余的函数给删除了
```
// 举个例子
foo.bar()
delete foo.bar()

```
**得出实现**

```
Function.prototype.call1 = function(context){
    context.bar1 = this;// this代表bar
    context.bar1(); // 1
    delete context.bar1;
}

var bar = function(){
    console.log(this.value);
}
var foo = {
    value:1
};
bar.call1(foo); //打印出1 bar函数执行打印了1，将bar的this换成了foo


```

**考虑1**
> call方法除了可以上传this，同时也可以上传其他参数，但是这个方法肯定还不行<br/>
> 猜想：在call1调用的时候就传入参数

```
Function.prototype.call1 = function(context){
    context.bar1 = this;
    context.bar1(name,age)
    delete context.bar1;
}
var bar = function(name,age){
    console.log(this.value,name,age)
}
var foo = {
    value:1
};
bar.call1(foo,"david","25")
```
> 由于当前传入的参数不固定，所以没办法直接在调用bar函数的参数给他传入具体的值，所以这种方法行不通<br/>

**尝试2**
> 利用当前参数arguments为类数组

```
// 实现
Function.prototype.call1 = function(context){
    context.bar1 = this;
    var arg = []
    for(let i=1;i<arguments.length;i++){
        arg.push(arguments[i])// 得到从第2个参数开始的内容 第一个为`this`
    }
    // 考虑传入参数
    context.bar1(arg.join(','))//?
    delete context.bar1;
}
var bar = function(){
    console.log(this.value,arguments[1],arguments[2])
}
var foo = {
    value:1
};
bar.call1(foo,"david","25")
```
**用join传进去话**
![image](D58B511EAC8E47ADB18BF143AFE44F67)<br>
> 这个时候他并不是以一个多字符传进去的，所以不能使用join<br/>
**eval**
>可以使用eval来调用context.bar1函数

```
// 实现
Function.prototype.call1 = function(context){
    context.bar1 = this;
    var arg = []
    for(let i=1;i<arguments.length;i++){
        arg.push(arguments[i])// 得到从第2个参数开始的内容 第一个为`this`
    }
    // 考虑传入参数
   eval('context.bar1(arg)')//?
   delete context.bar1;
}
var bar = function(){
    console.log(this.value,arguments[1],arguments[2])
}
var foo = {
    value:1
};
bar.call1(foo,"david","25")
```
> 使用eval来解析一个字符串型的函数调用，这个时候eval会把参数里面的arg自动调用Array.toString()方法，转成一个数组

**思考3**
> call方法是可以直接传入null的，让bar的this直接指向window<br/>

```
//最终版实现
// 实现
Function.prototype.call1 = function(context){
    context.bar1 = this;
    var arg = []
    for(let i=1;i<arguments.length;i++){
        arg.push(arguments[i])// 得到从第2个参数开始的内容 第一个为`this`
    }
    // 考虑传入参数
   let result = eval('context.bar1(arg)')//?
   delete context.bar1;
   return result;
}
var bar = function(){
    console.log(this.value,arguments[1],arguments[2])
    return {
        value:this.value,
        name:arguments[1],
        age:arguments[2]
    }
}
var foo = {
    value:1
};
bar.call1(foo,"david","25")
```

**apply的实现方式和call的实现方式基本一样**

```
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window; // 判断当前是否是对象，如果不是，则直接让当前对象指向window
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```