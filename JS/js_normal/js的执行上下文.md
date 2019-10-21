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
1. 