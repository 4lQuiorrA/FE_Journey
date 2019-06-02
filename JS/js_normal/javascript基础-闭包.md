 ### 闭包
- 有权访问其他函数内部变量的函数 ---- 红皮书
- 保留了其他函数的词法作用域的函数 ---- 小黄书
> 其实整个javascript的运行环境就是一个最大的闭包，在javascript的最外层可以认为已经被一个函数所包裹了。所以说：闭包是什么？闭包就是一个函数。

> 当一个循环一个i的时候，要在循环中绑定一个事件，在每个事件执行的时候，要想准确取到这个i，这个时候就需要一个局部作用域，我们管这个局部作用域叫闭包(面试中最好的描述方法，即描述了闭包的定义，同时也描述了闭包的作用。)

```
function makePowerFn(power) { 
 function powerFn(base) {
 return Math.pow(base, power);
 }
 return powerFn;
}
var square = makePowerFn(2); 
square(3); // 9
```

 **容易造成内存泄漏**