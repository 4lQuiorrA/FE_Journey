当JavaScript代码执行一段可执行代码（executable code）,创建对应的执行上下文（executable context）
对于每个执行上下文，都有三个重要属性：
- 变量对象（Variable object ,VO）
- 作用域链（Scope chain）
- this
### 变量对象（Varibale Object）
变量对象是与执行上下文相关的数据作用域，存储了在上下文定义的变量和函数声明

### 全局上下文

>全局对象：全局对象是预定义的对象，作为JavaScript的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。

### 函数上下文
在函数上下文，我们用活动对象（activation object,AO）来表示变量对象。
活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在Javascript环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫activation Object,而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问

活动对象是在进入函数上下文时候被创建的，它通过函数的arguments属性初始化。arguments属性值是Arguments对象

### 执行过程
执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：
1. 进入执行上下文
2. 代码执行
举个例子：
```
function foo(a){
    var b = 2;
    function c(){};
    var d = function(){};
    b = 3;
}
foo(1);
```
变量对象初始化
AO = {
    arguments:undefined
}

进行执行上下文
当进入执行上下文时，这时候还没有执行代码
变量对象会包括：
1. 函数的所有形参（如果是函数上下文）
    - 由名称和对应值的一个变量对象的属性被创建
    - 没有实参，属性值设为undefined
2. 函数声明
    - 由名称和对应值（函数对象（function-object））组成一个变量对象的属性被创建
    - 如果变量对象已经存在的相同名称的属性，则完全替换这个属性
3. 变量声明
    - 由名称和对应值（undefined）组成一个变量对象的属性创建
    - 如果变量名称跟已经声明的形式参数或者函数相同，则变量声明不会干扰已经存在的这类属性
AO ={
    arguments :{
        0:1,
        length:1
    },
    a:1,
    b:undefined,
    d: undefined
    c:reference to function c(){},
    d: undefined
}
### 代码执行
在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

AO = {
    arguments:{
        0:1,
        length:1
    },
    a;1,
    b:3,
    c:reference to function c(){},
    d:referenece to functionExpression "d"
}

### 总结
1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括Arguments对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值