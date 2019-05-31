### IIEF 自执行函数
> 保护内部变量，同时将内部函数需要的<br/>
> 可以让内部函数直接找到局部作用域的变量

### new调用　直接调用

```
var s = new $(".test")
var q = $(".test")

s和q的内部是一样的
为什么？
(function(window,undefined){
    var jQuery = function(selector,context){
        
        // 当使用者使用new来调用jquery的时候，其实内部他直接new
        // 相当于new jQuery()
        return new jQuery.fn.init(selector,context)
    }
    jQuery.fn = jQuery.prototype = {
        init:function(selector,context){
            
        }
    }
    jQuery.fn.init.prototype = jQuery.fn
})()


// 1.new的话，s能够访问jq的原型的方法
// 2.不能new的话，q也能直接访问jq的原型链上的方法 .val()
new jQuery
// 1.构造函数2.prototype
// new的第一步返回一个init的函数，原型链上挂载了一个init函数 没有主动执行
// init没调用，被搁置了
// jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype
// => jQuery.fn.init = jQuery
实例化方法存在这么一个关系链：

①　jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype ;

②　new jQuery.fn.init() 相当于 new jQuery() ;

③　jQuery() 返回的是 new jQuery.fn.init()，而 var obj = new jQuery()，所以这 2 者是相当的，所以我们可以无 new 实例化 jQuery 对象。

// 为什么要绕，要通过jQuery.fn.init来间接性的new jQuery
// 为什么不直接去new jQuery()
// 为了将jQuery.fn的原型链中的extends方法暴露出去，以便扩展方法
```

### 链式调用

```
var s = {
    a:function(){
        return this
    },
    b:function(){
        return this
    },
    c:function(){
        
    }
}
s.a().c()
```

### on live
> 事件委托（事件代理）<br/>
> 将事件委托到body上，通过event.target往下找内容

```
function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}
```

### 取值和赋值  $()->函数   函数的重载

```
function addMethod(obj,name,f){
    var old = obj[name]  // 第一次执行的时候old为undefined
    obj[name] = function(){
        if(arguments.length ===f.length){
        // this ===obj
            return f.apply(this,arguments)
        }else{
            return old.apply(this,arguments)
        }
    }
}
var people = {
    name:["张三","李四","王二麻子"]
}
var find0 = function(argument){
    return this.name
}
var find1 = function(name){
    var arr = this.name
    for(var i = 0;i<arr.length;i++){
        if(arr[i] =="name"){
            return `${arr[i]}在${i}位`
        }
    }
}
var find2 = function(name){
    console.log('haha')
}
addMethod(people,"find",find0) 
addMethod(people,"find",find1) 
addMethod(people,"find",find2) 
people.find() 
```

### 短路表达式

> ||先计算第一个运算数，如果可以被转换成true，则返回左边这个表达式的值，否则计算第二个运算数。<br/>
> &&遇到返回false的就直接返回false,反之则返回最右边的一个值

### $.isArray
> [Object Array] 原理判断这个String是否存在

```
$each("Boolean Number String Function Array Date RegExp Object Error").split(" ",function(i,name){
    class2type["[object"+name+"]"] = name.toLowerCase()
})
```

### $.isReady

```
var $ = ready = window.ready = function(fn){
    if(document.addEventListen){
        // 兼容非IE
        document.addEventListener("DOMContentLoaded",function(){
            document.removeEventListener("DOMContentLoaded",argument.callee,false)
            fn()
        })
    }else if(document.attchEvent){
        IEContentLoaded(window,fn)
    }
    function IEContentLoaded(w,fn){
        var d = w.document,done = false
        init = function(){
            if(!done){
                done = true
                fn()
            }
        }
        // 处理IE的一个BUG
    (function(){
        try{
            d.documentElement.doScroll("left")
            
        }catch(e){
            setTimeout(argument.callee,50)
            return
        }
        init()
    })();
    d.onreadystatechange = function(){
        if(d.readyState==='complete'){
            d.onreadystatechange = null
            init()
        }
    }
    }
    
    
}
ready(function(){alert(1)})
```