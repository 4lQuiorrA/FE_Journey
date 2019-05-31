### 数据类型
> 弱类型的语言<br>
- Boolean
- Number
- String
- null
- undefined
- Symbol

```
typeof NaN //number  
typeof Symbol() // symbol
typeof alert   // function
```

### 变量
- 使用var关键字：函数作用域
- 使用let关键字：块级作用域
- 直接使用：全局作用域
> const  块级作用域

### 函数

> 函数就是一个可以被外部函数调用的（或者函数本身递归调用）的子程序

**定义函数**
- 函数声明
- 函数表达式
- Function构造函数
- 箭头函数

### 对象

1. 字面量
2. 构造函数

**构造函数**
> 使用new关键字调用的就是构造函数，使用构造函数可以实例化一个对象



**函数的返回值有两种可能**
- 显式调用 return返回return后表达式的值
- 没有调用 return 返回undefined


### prototype

- ==每个函数都有一个prototype的对象属性，对象中有一个constructor属性，默认指向函数本身==
- ==每个对象独有一个__proto__的属性，属性指向其父类型的prototype==


### this

**普通函数**
- 严格模式 ：undefined
- 非严格模式：全局变量
        1.Node:global
        2.浏览器：window

### Function.prototype.apply、call

```
function isNumber(obj){
    return Object.prototype.toString.call(obj) ==='[object Number]'
}
```


### 语法
**label statement**
```
loop:
for(var i=0;i<10;i++){
    for(var j=0;j<5;j++){
        console.log(i)
        if(j===1){
            break loop;
        }
    }
}
// 跳出双循环
// 不建议javascript使用该方法 
```

**自执行函数**
```
(function(){}())
(function(){}){}
[function(){}()]


~ function(){}
!function(){}
+function(){}
-function(){}

delete function(){}
typeof function(){}
void function(){}
// 利用运算符（小括号、中括号）后面必须是表达式的原理。让函数自动执行
```

### 高阶函数
**回调函数**

**闭包**
1. 函数
2. 环境：函数创建时作用域内的局部变量

> **最基本的闭包：函数嵌套，并且对外提供访问就会产生闭包**


**使用举栗：惰性函数**
> 当函数第一次执行完之后，该函数就会一直保持对第一次执行结果的调用

```
function eventBinderGenerator(){
    if(window.addEventListener){
        return function(element,type,handler){
            element.addEventListener(type,handler,false)
        }
    }else{
        return function(element,type,handler){
            element.attachEvent('on'+type,handler.bind(element,window.event))
        }
    }
}
var addEvent  = eventBinderGenerator()

```

### 柯里化

> 见javascript进阶专题