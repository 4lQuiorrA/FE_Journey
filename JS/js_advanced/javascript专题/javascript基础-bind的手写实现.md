```
Function.prototype.bind = function(oBFun){
    if(typeof oBFun !==='function'){
        throw new TypeError("请使用新版")
    }
    var bindT = this; // 第一次等于a
    var args = Array.prototype.slice.call(arguments,1);
    function exBindPro (){}
    function reBind(){
    // 当作为构造函数时，this指向实例，此时结果为true,将this指向实例，也就是new的真面目
    // 当直接调用的时候this就指向window了，所以
        return bindT.apply(this instanceof reBind?this:oBFun,args.concat(Array.prototype.slice.call(arguments)))
    }
    
    return reBind
}
var obj = {
    a:1
}
function a(){
    console.log(this.a)
}

var p = a.bind(obj,"b");
p("bb")
// 这种放置仅仅只针对于a的原型链上没有方法，一旦a的原型链上有方法了，这个方法就拿不到
```

```
Function.prototype.bind = function(oBFun){
    if(typeof oBFun !==='function'){
        throw new TypeError("请使用新版")
    }
    var bindT = this; // 第一次等于a
    var args = Array.prototype.slice.call(arguments,1);
    function exBindPro (){}
    function reBind(){
    // 当作为构造函数时，this指向实例，此时结果为true,将this指向实例，也就是new的真面目
    // 当直接调用的时候this就指向window了，所以
        return bindT.apply(this instanceof reBind?this:oBFun,args.concat(Array.prototype.slice.call(arguments)))
    }
    exBindPro.prototype = this.prototype
    reBind.prototype = new exBindPro() /// 解决new bind()
    return reBind
}
var obj = {
    a:1
}
function a(){
    console.log(this.a)
}

var p = a.bind(obj,"b");
p("bb")

```