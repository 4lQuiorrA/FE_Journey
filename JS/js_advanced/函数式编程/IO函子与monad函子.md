### IO函子（实现输入输出操作）
在真实的编程世界中，不可能所有的东西都是纯的，一定会有肮脏的地方：比如js中，document.documentElement、window、localStorage；为什么呢？这几个变量都依赖于浏览器，随时都可能会发生变化，当然在函数式编程中，也自然要用到脏操作的时候，那就疑问了：函数式编程是一个由纯函数编程所组成的。所以这个时候我们需要将我们的脏操作交给我们IO函子来解决这些脏操作。

来关注IO函子的几点基础内容
- IO函子跟前面几个Functor不同的地方在于，它的value是一个函数。它把一些不纯的操作（比如:IO，网络请求，DOM）包裹到一个函数内，从而延迟这个操作的执行。所以我们认为，IO包含的是被包裹的操作的返回值。

`延迟这个操作?所以有`
- IO其实也算是一个惰性求值
- IO负责了调用链积累了很多很多不纯的操作，带来的复杂性和不可维护性

在纯函数中，规定：固定的输出，必须要对应固定的输出。但是在实际编程中函子可能接受的内容是一个脏的IO操作，就比如：文件的读取，文件内部的内容会导致不同的输入，但是可能会得到不同的输出，所以他会是一个不纯的操作。那怎么办？所以IO函子想了一个双全的方法，既能让io操作执行，同时让函数内部保持一个纯的状态：假设IO函子接受一个`filename`，如果读取在函数内部执行了，那整个函数就不是纯函数了，但是如果把IO操作包起来，然后return出去，利用惰性求值的特性了，让文件的读取的操作延迟在外面操作，这个时候文件读取的操作外面执行就跟里面整个函数毫无关联了，这样就保证了函数的纯度。举个例子：

```

// ES5的写法 IO函子的实现
import _ from 'loadsh';
var compose = _.flowRight; // 一个组合函数的功能，在之前的文章提过，将右值作为左值的参数
var IO = function(f){
    this._value = f;
}
IO.of = x=>new IO(_=>x);
IO.prototype.map = function(f){
    return IO.of(compose(f,this._value))
}

//实际操作
var fs = require("fs");
var readFile = function(filename){
    return new IO(function(){
        return fs.readFileSync(filename,'utf-8');
    })
}
readFile('./user.txt');
```
虽然在这里读取文件是一个不纯的操作，但是readFile是一个纯函数，每一次执行，都返回一个IO函子；你需要再次调用IO函子的value值才能进行这步读写操作，而这样的操作直接让IO函子变成了一个纯函数。

注意这段代码隐藏的一些问题，我们会发现每次执行了readFile("")返回的是一个IO函子，我们可以通过IO函子的方法再去调用map方法在去生成一个IO函子，从而实现链式调用：
```
readFile('./user.txt')
.map(tail)
.map(print)
```



### Monad函子

即使现在提供了Maybe函子，Either，IO函子，这么多Functor,但是依然有问题无法解决掉
1. 如何处理嵌套Functor呢？
```
// 函子是一个容器，按照情况来说，能够包含任何内容，所以当value = Functor的时候呢？应该怎么处理,如：
Maybe.of(
  Maybe.of(
    Maybe.of({name: 'Mulburry', number: 8402})
  )
)
```

2. 如何处理⼀个由⾮纯的或者异步的操作序列呢?

Monad函子为我们提供了这些问题的解决方案

1. Monad就是一种设计模式，表示一个运算过程，通过函数拆解成互相连接的多个步骤。你只要提供下一步运算所需要的函数，整个运算就会自动执行下去
2. Promise就是一种Monad
3. Monad让我们避开了嵌套地狱，可以轻松进行深度的嵌套的函数式编程，比如IO和其他异步任务。
3. IO其实就是一种Monad函子。

```
class Monad extends Functor{
    join(){
        return this.value;
    }
    flatMap(f){
        return this.map(f).join();
    }
}
```
Monad函子的作用是，总是返回一个单层的函子，他有一个flatMap方法，与map方法相同，唯一的区别，他生成了一个嵌套的函子，他会取出后者内部的值，保证返回的始终是一个单层的容器，不会再内部嵌套的情况。

如果函数f返回的是一个嵌套函子，那么this.map(f)就会生成一个嵌套的函子。所以join方法保证了flatMap方法总是返回一个单层的函子，这意味着单层函子会被铺平依次执行

这是什么意思？举个例子
```
var fs = require("fs");
var _ = require("loadsh");
var compose = _.flowRight;
class Functor{
    constructor(val){
        this.val = val;
    }
    map(f){
        return new Functor(f(this.val));
    }
}
class Monad extends Functor{
    join(){
        return this.val;
    }
    flatMap(f){
         //1.f == 接受一个函数返回的是IO函子
        //2.this.val 等于上一步的脏操作
        //3.this.map(f) compose(f, this.val) 函数组合 需要手动执行
        //4.返回这个组合函数并执行 注意先后的顺序
        return this.map(f).join();
    }
}
class IO extends Monad{
    static of(val){
        return new IO(val);
    }
    map(f){
        return IO.of(compose(f,this.val));
    }
}
var readFile = function(filename){
    return IO.of(function(){
        return fs.readFileSync(filename,'utf-8');
    })
}
var print = function(x){
    console.log("橘子");
    return IO.of(function(){
        console.log("苹果")
        return x+"函数式"
    })
}
var tail = function(x){
    console.log(x);
    return IO.of(function(){
        return x+"【京程一灯】";
    })
}
const result = readFile('./user.txt')
    //flatMap 继续脏操作的链式调用
    // .flatMap(print);
    .flatMap(print)()
    .flatMap(tail)();

    console.log(result.val);
```

1. 首先我们readFile调用了IO.of,我们做了什么呢？传进来这么短函数
```
val = function(){
    return fs.readFileSync(filename,'utf-8');
}
```
所以说当前IO函子的val 等于这段函数

2. 接下来执行flatMap方法，我们看到IO函子本身是并没有flatmap这个方法的，继承至父类Monad

3. 然后执行flatMap方法中this.map() 执行自身的map方法（为什么是自身的map方法呢？当前为子类的实例，this指向子类的实例） 同时flatMap传进来一个（print函数：一个IO函子）
```
// 自身的map也就是执行这段代码
 map(f){
        return IO.of(compose(f,this.val));
    }
```
返回一个IO函子他的参数为compose(f,this.val) ，要注意到我们现在的this.val等于
```
val = function(){
    return fs.readFileSync(filename,'utf-8');
}
```
```
而我们的f是print函数
```

通过compose函数，我们把两个函数compose(print,this.val)然后赋值给了this.val

然后再调用join方法，将this.val返回出来，等待执行。

我们关注一下这是的this.val：他是一个由compose合成之后的函数，合成之前他是一个怎么样的函数呢print和第一个value；第一个value是什么

```
val = function(){
    return fs.readFileSync(filename,'utf-8');
}


```
将这段代码传进new IO(val) 得到的结果，得到的结果是一个什么？对，没错，一个IO函子，同理print也是一个IO函子，执行compose函数得到什么？自然也是一个IO函子，也就是第一个IO函子，作为第二个IO函子的参数!这是一个什么操作？看代码：
```
x = new IO(function(){
    return fs.readFileSync(filename,'utf-8');
})
var print = function(x){
    console.log("橘子");
    return IO.of(function(){
        console.log("苹果")
        return x+"函数式"
    })
}
```
当我们执行flatMap(print); 也就是执行了compose(print,f);这个组合函数这个组合函数如上代码：来我们执行一下，`橘子`，然后执行flatMap(print)()，执行内部返回函数 `苹果`，然后调用
```
x = new IO(function(){
    return fs.readFileSync(filename,'utf-8');
})
```
访问文件返回Hello，结合“函数式”,打印出-> Hello 函数式

按照此顺序执行flatMap(tail);
得到Hello 函数式【京程一灯】

---
这段代码就是传说中的redux的实现方法。

