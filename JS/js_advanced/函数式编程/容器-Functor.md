### 范畴与容器

1. 我们可以把“范畴”想象成一个容器，里面包含了两样东西:值（value）,值的变形关系，也就是函数

2. 范畴论使用函数，表达范畴之间的关系。

3. 函数不仅可以用于一个范畴之中值的转换，还可以用于将一个范畴转成另一个范畴。而这就涉及到了函子（`Functor`）

4. 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位，他首先是一种范畴，也就是一个容器，包含了值和变形关系，比较特殊的是：它的变形关系可以作用于每一个值，将当前容器变形成另一个容器

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/fanchou.png)

#### 函子 Functor
- 对于jquery中$(...)返回的对象并不是一个原生的DOM对象，而是对于原生对象的一种封装，这在某种意义上就是一种“容器”（但它并不函数式）
- Functor(函子)遵守一些特定规则的容器类型
- Functor是一个对于函数调用的抽象，我们赋予容器自己去调用函数的能力。把东西装进容器，只留出一个接口map给容器外的函数，map一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如果操作这个函数，以至于可以拥有惰性求值、错误处理、异步调用等等特性。
- 任何具有map方法的数据结构，都可以当作函子的实现。

很抽象，我们举个例子
```
var Container  = function(x){
    this._value = x;
}
// 函数式编程一般约定，函子内部有一个of方法

Container.of = x=>new Container(x);
// Container.of("abc");

// 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器
Container.prototype.map = function(f){
    return Container.of(f(this._value));
}
Container.of(3).map(x=>x+1).map(x=>"Result is "+x);
// ES6的写法

class Container {
    constructor(val){
        this.valule = val;
    }
    public function of (x){
        return new Container(x);
    }
    public function map(f){
        return Container.of(f(this.value));
    }
    
}
Container.of(3).map(x=>x+1).map(x=>"Result is "+x);

```
#### 代码解析
f代表变形关系，this.value代表源函子的值，经过f变形函数的操作，得到新的函子

**of作用**
- 生成一个新的函子
可能注意到了每次生成一个新的函子的时候，使用了new命令，这个地方太像面向对象编程了。
所以函数式编程一般约定，函子有一个of方法，用来生成新的容器（注意这个地方千万不能把of方法写在原型链上。否则就需要去new才能访问到。）.
```
Functor.of = function(){
    return new Functor(val);
}
Functor.of(2).map(function(two){
    return two+2;
})
```

**map**
`Functor`是一个函子，他的`map`方法接受函数f作为参数，然后返回一个新的函子，里面包含的值是被`f`处理过的`(f(this.value))`
一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器中。
上面的例子说明，函数式编程里面的运算，都是通过函子来完成的，即运算不直接通过值，而是针对这个值的容器---**函子**. `Functor`本身具有对外的接口（map方法）。各种函数就是运算符，通过接口接入容器，引发容器内的值发生变形。

- 接受外部的变形关系
- 作用于本身的值，同时生成一个新的函子，将本身的值发生变形成新的内容，映射到新的函子中。


### Maybe函子
**条件运算if是最常见的运算之一，函数式编程里面，使用 Maybe 函子表达。**
函子接受各种函数，处理容器内部的值。但是这里有个问题，容器内部的值可能是一个空值（比如null），而外部函数又没有处理空值的机制，如果传入空值很可能就出现错误。


```
Functor.of(null).map(function(s){
    return s.toUpperCase();
})
// 报错TypeError
class Maybe extends Functor{
    map(f){
        return this.value?Maybe.of(f(this.value)):Maybe.of(null);
    }
}
Maybe.of(null).map(function(s){
    return s.toUpperCase();
})

```

```
var Maybe = function(x){
    this.value = x;
}
Maybe.of = function(x){
    return new Maybe(x);
}
Maybe.prototype.map = function(f){
    return this.Nothing()?Maybe.of(null):Maybe.of(f(this.value));
}
Mayby.prototype.Nothing = function(){
    return (this.value===null||this.value===undefined);
} 
```
// 新的容器我们称为Maybe函子（为了判断函子内中要改变的值是否存在）


### Either函子

**条件运算if...else是最常见的运算之一，函数式编程里面，使用 Either 函子表达。**
1. 正常的容器能做的事情实在太少了，`try/catch/throw` 并不是纯的，因为他从外部接受了我们传入的函数，并且如果在函数在运行时出错了就会抛弃他的返回值

```
// 怎么理解呢？我们看一段代码

function add(a,b,c){
    return a+b+c;
}
function partial(fn,a){
   try{
        return function(b,c){
        fn(a,b,c);
    }
   }catch(error){
       console.error(error);
   }
}
```
正常操作是传入值是不会出现问题的，当函数执行错误的时候就会放弃return，最后走catch的路，最后让一个本该是纯函数的函数，变得不纯了

2. Promise是可以调用catch来集中处理错误的

```
new Promise((resolve,reject)).then(fn).then(fn).catch(function(error){
    console.error(error)
})
```

3. 事实上Either并不只是用来做错误处理的，他表示了`逻辑或(||)`，范畴学里的coProduc.

---

Either函子内部有两个值：`左值（Left）`和`右值（Right）`.右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

```
// ES6的写法
Class Either extends Functor(){
    constructor(left,right){
        this.left = left;
        this.right = right;
    }
    map(f){
        return this.right?Either.of(this.left,f(this.right)):Either.of(f(this.left),this.right);
    }
    
}
Either.of = function(left,right){
    return new Either(left,right);
}
var addOne = function(x){
    return x+1;
}
Either.of(5,6).map(addOne);  // 5,7
Either(1,nul).map(addOne) // 2,null


```

```
// ES5的写法
var Left = function(x){
    this.value = x;
}
var Right = function(x){
    this.value = x;
}
Left.of = function(x){
    return new Left(x);
}
Right.of = function(x){
    return new Right(x);
}

/*两者不同的地方*/
Left.prototype.map = function(f){
    return this;
}
Right.prototype.map = function(f){
    return Right.of(f(this.value));
}
```
在ES5的实现方法上，左值和右值在map的实现方式上有很大的差距，Right.map行为仍然是执行外部传进来的变形函数，但是Left.map就不同了，他直接将调用的this返回回去了。**基于这个现象，Left可以用传输一个错误的信息**

```
// 我们在看一个例子：基于Left错误处理的例子

var getAge = use=>user.age?Right.of(use.age):Left.of("Error");

getAge({name:'stark',age:21}).map(age=>"Age is"+age); // 当age存在的时候
getAge({name:"stark"}).map(age=>"Age is"+age).map(age=>age++); // Age is Error

```
Left 可以让调用链中的任意一环的错误立刻返回到调用链尾部。不用在像在ES6中，在of内部去判断他当前是否存在，然后进行相关的操作，可以直接在第一层错误的时候就捕捉到错误信息。再也不用去一层一层的try..catch


### AP函子

如果函子里面的value是一个函数，而不是一个单纯的值了，那应该怎么办呢，用我们之前用的Maybe函子和Either函子显然无法解决；
这个时候就要引入能解决的函子-AP函子

```
class AP extends Functor{

    ap(F){
        return AP.of(this.val(F.val));
    }

}
AP.of = function(f){
    return new AP(f)
}
AP.of(addTwo).ap(Functor.of(2));
var addTwo = function(x){
    return x+1;
}
```
实际上就是利用AP函子的父类，也就是Functor首先存储第二次传输的要计算的内容，同时要变形的函数传入AP函子中，然后利用AP函子的将传进来的函数执行，并返回执行后的结果。



