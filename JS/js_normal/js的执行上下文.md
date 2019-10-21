### 执行上下文
```
showName()
console.log(myname)
<!-- var myname="zengweimning" -->
function showName() {
    console.log('函数 showName 被执行');
}
//=>myname is not define
```


1. 在执行过程中，若使用了未声明的变量，那么Javascript执行会报错
2. 在一个变量声明之前使用它，不会出错，但是该变量的值会为undefined，而不是定义时的值
3. 在一个函数之前使用它，不会会错，且函数能正确执行
第一个结论很好理解，因为变量没有定义，这样在执行javascript代码时，就找不到该变量，所以Javascript会抛出错误。
但是对于第二个和第三个结论就有点不好理解了
- 变量和函数为什么能在其定义之前使用？这似乎表明JavaScript代码并不是一行一行执行的。
- 同样的方式，变量和函数的处理结果为什么不一样？比如上面的执行上下文，提前使用的showName函数能打印出来完整结果，但提前使用的myname变量值却是undefined,而不是定义时使用的“zengweiming”
### 变量提升

### javascript代码的执行流程
从概念的字面意义上来看，“变量提升”意味着变量和函数的声明在物理层面上移动到了代码的最前面。但这并不准确。实际上变量和函数变量声明在代码的位置是不会改变的，而是在编译阶段被JavaScript引擎放入内存中。一段Javascript代码在执行之前需要被Javascript引擎编译，编译完成之后，才会进入执行阶段，
>
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/jszhixingliucheng.png)
>
#### 编译阶段
那么编译阶段和变量提升有什么关系呢？
为了搞清楚这个问题，可以通过那段模拟变量提升的代码
1. 变量提升部分
```
var myname = undefined;
function showName(){
    console.log('函数showName被执行');
}
```
2. 执行部分的代码
```
showName();
console.log(myname);
myname="极客时间"
```
>
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/jszhixinghuanjing.png)

>
从上图可以看出，输入一段代码，经过编译后，会生成两部分内容：**执行上下文和可执行代码**

执行上下文是Javascrip执行一段代码时的运行环境。比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如this，变量，对象以及函数等。
在执行上下文中存在一个**变量环境的对象**，该对象中保存了变量提升的内容，比如上面代码中的`myname`和`showName`
可以将变量环境简单的看作是以下结构
```
VariableEnvironment:
     myname -> undefined, 
     showName ->function : {console.log(myname)

```
了解完变量环境的结构后，接下来，我们再结合下面这段代码来分析是如何生成变量环境对象的

```
showName()
console.log(myname)
var myname = '极客时间'
function showName() {
    console.log('函数 showName 被执行');
}

```
1. 第一行和第二行，由于这两行代码不是声明操作，所以Javascript引擎不会做任何处理
2. 第三行，由于这行是经过var声明的，因此Javascript引擎将在环境对象中创建一个名为myname属性，并使用‘undefined’对其初始化
3. 第四行，Javascript引擎发现一个通过function定义的函数，所以它将函数定义存储到堆（heap）中，并在环境对象中创建了一个showName的属性，然后将该属性值指向堆中函数的位置
#### 执行阶段
Javascript引擎开始执行”可执行代码“，按照顺序一行一行地执行。下面来分析一下这个过程
- 当执行到`showName`函数时，Javascript引擎便开始在变量环境对象中查找该函数，由于变量环境存在该函数的引用，所以Javascript引擎便开始执行该函数，输出结果
- 接下来打印`myname`信息，Javascript引擎继续在变量环境对象中查找该对象，由于变量环境存在myname变量，并且其值为undefined,这时候输出undefined.
- 接下来赋值，赋值会把变量环境中的myname属性值改变

问题1:代码中出现了相同的变量或者函数怎么办？
```
function showName() {
    console.log('极客邦');
}
showName();
function showName() {
    console.log('极客时间');
}
showName(); 

```
我们分析一下完整执行流程
- 首先是编译阶段。遇到了第一个showName函数，会将该函数体存放到变量环境中。然后遇到第二个，此时第二个showName函数会将第一个showName函数覆盖掉
- 接下来是执行阶段.先执行第一次showName函数，但由于是从变量环境中查找showName函数，而变量环境中只保存了第二个showName函数，所以最终调用的是第二个函数，同样第二次调用也是。

总结：Javascript代码执行过程，需要先做变量提升，而之所以需要实现变量提升，是因为Javascript代码需要编译
- 在编译阶段，变量和函数会被存放在变量环境中，变量的默认值会被设置为undefined;在代码执行阶段，Javascript引擎会从变量环境中查找自定义变量和函数。
- 在编译阶段如果存在两个相同的函数，那么存放在变量环境中的最后定义的一个。这是因为后定义的会覆盖之前定义的