### 泛型的产生
当我们需要一个函数的时候，同时需要返回传递的参数的时候
```
function test(s:number):number{
    return s;
}
```
这样我们就创建出来一个传入`number`的参数，同时返回`number`类型，但是如果需要传入一个不同的类型同时返回一个不同的类型呢？所以我们可以考虑`any`

```
function test(s:any):any{
    return s;
}
```
但是这样不好，每一个参数传递进来都要进行一个类型的转换，然后得到一个新的值。这个时候就可以使用**泛型**来解决这些内容

**泛型的基本结构**
```
<T>
```
泛型一般是使用尖括号+大写字母来表示的，这个大写字母一般用`T`来表示

```
function test<T>(s:T):T{
    return s;
}
test<string>("mike")
```
可以看到泛型在使用的时候，要在调用的时候，在尖括号里面声明当前是什么类型`string`，这样的话，函数中所有带有这个`T`的都会被解析成声明的变量类型

**泛型的应用**

思考一段代码
```
function test<T>(s:T):T{
    console.log(s.length);
    return s;
}
```
这段代码是编译报错的，为什么呢？因为这个函数还没有调用之前，T的类型是无法知道的，这个时候`s`是没有`length`这个属性的
如果需要用到`length`这个属性的时候，需要将`T`指定为数组：
```
function test<T>(s:T[]):T[]{
    console.log(s.length)
    return s;
}
```

**泛型类型**
```
function Hello<T>(arg:T):T{
    return arg;
}
var myHello:<K>(arg:K)=>K = Hello;
myHello("hello")
```
这段话是什么意思呢？
1. 首先声明一个myHello是泛型`K`，同时参数`arg`也是`K`
2. 由于`Hello`也是同样的类型。
3. 当调用`myHello`的时候，就会调用函数`Hello`

**泛型接口**

写法一：
```
interface Hello{
    <T>(arg:T):T;
}
function myHello<T>(arg:T):T{
    return arg;
}
let mh:Hello = myHello;
mh<string>("weiming")
```

写法二：

```
interface Hello<T>{
    (arg:T):T
}
function myHello<T>(arg:T):T{
    return arg;
}
var mh:Hello<number> = myHello;
alert(mh(100))
```

#### 泛型类
```
class Hello<T>{
    zero:T;
    add:(x:T,y:T)=>T;
}
var myHello = new Hello<number>();
myHello.zero = 10;
myHello.add = function(x:T,y:T):T{
    return x+y;
}
alert(myHello.add(10,10));
```