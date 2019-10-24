## JS的内存机制
要想打造一个高性能前端应用，那么就必须要搞清楚Javascript的内存机制

### part1 数据如何存储在内存中的

```
function foo(){
    var a = 1
    var b = a
    a = 2
    console.log(a)
    console.log(b)
}
foo()

```
```
function foo(){
    var a = {name:"jack"}
    var b = a
    a.name = "jack1" 
    console.log(a)
    console.log(b)
}
foo()
```
可以看到这里仅仅是改变了a的值，b的值是没有改变的

#### Javascript是什么类型的语言

```

int main()
{
   int a = 1;
   char* b = "jack";
   bool c = true;
   return 0;
}
```
上述代码声明变量的特点是：在声明变量之前需要先定义变量类型。我们把这种在使用之前就需要确认其变量数据类型的称为静态语言

相反地，我们把在运行过程中不需要检查元素变量类型的语言称为动态语言，
虽然C语言是静态语言，但是C语言中，我们可以把其他类型数据赋予给一个声明好的变量，如：
```
c=a;
```
当前a是整型数据,c是Boolean数据,c编译器会将整型数据偷偷的转成Boolean,我们将这种偷偷转换的操作称为隐式类似转换。而支持隐式类型转换的语言称为弱类型语言，不支持隐式类型转换的语言称为强类型语言。在这点上，C和JavaScript都是弱类型语言

**JavaScript的语言类型**

**Javascript是一种弱类型，动态的语言**

- 弱类型，意味着你不需要告诉Javascript引擎这个或者那个变量是什么数据类型，Javascript引擎在运行代码的时候自己会计算出来
- 动态，意味着可以使用同一个变量保存不同类型的数据

#### 内存空间
Javascript在执行过程中，主要有三种类型内存空间，分别是代码空间，栈空间，堆空间。
原始数据的数据值都是直接保存在“栈”中的，引用类型的值都是存放到“堆”中的。
**为什么要分堆栈两个存储内容，所有数据直接存放在“栈”中不可以吗？**
答案肯定是不可以的，这是因为Javascript引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了的话，所有的数据都存放在栈里，那么会影响到上下文切换的效率，进而又影响到上下文的效率，进而又整个程序的执行效率。
所以通常情况下，栈空间都不会设置太大，主要用来存放一些原型类型的小数据。而引用类型的类型占用的空间比较大，不过去缺点是分配内存和回收内存会占用一点时间
在Javascript中，赋值操作和其他语言又很大的不同，原始类型的赋值会完整复制变量值，而引用类型复制是复制引用地址。

#### 闭包的存放

```

function foo() {
    var myName = "jack"
    let test1 = 1
    const test2 = 2
    var innerBar = { 
        setName:function(newName){
            myName = newName
        },
        getName:function(){
            console.log(test1)
            return myName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("jack1")
bar.getName()
console.log(bar.getName())
```
1. 当Javascript引擎执行到foo函数，首先编译，创建一个空的执行上下文
2. 在编译过程中，遇到内部函数setName,Javascript引擎还要对内部函数做一次快速的词法扫描，发现该内部函数引用了foo函数中的myName变量，由于是内部函数引用了外部函数的变量，所以Javascript引擎判断这是一个闭包，于是就在堆空间创建换一个“closure(foo)”的对象（这是一个内部对象，JavaScript是无法访问的），用来myName变量
3. 接着继续扫描到getName方法时，发现该函数内部还引用test1,于是JavaScript引擎又将test1添加到`closure(foo)`对象中就包含了`myName`和`test1`两个变量了。
4. 由于`test2`并没有被内部函数引用，所以test2依然保存在调用栈

![调用栈](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/cssomshuhecheng.png)