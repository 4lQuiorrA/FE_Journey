### 装饰器
装饰器是一种特殊类型的声明，他可以被附加**类声明**、**方法**、**访问符**，**属性**或者**参数上**
如果要使用装饰器特性，必须要在命令或者`tsconfig.json`里面启用`experimentalDecorators`编译选项
命令行

```
tsc --target ES5 --experimentalDecorators
```

tsconfig.json
{
    "compilerOptions":{
        "target":"ES5",
        "experimentalDecorators":true
    }
}

---
**装饰器工厂**
如果我们需要定制一个装饰器如何应用到一个声明上，我们需要一个装饰器工厂函数。装饰器工厂函数就是一个简单的函数，他返回一个表达式，以供装饰器运行的时候使用

```
function color(value:string){
    return function(target){

    }
}
```

**装饰器组合**
多个装饰器可以应用到一个声明上

```
// 写法一
@f @g x
// 写法二
@f
@g 
x
```
他们的求值方式与复合函数相似，在这个模型中，当复合f和g时，复合的结果（f。g）(x)等同于f(g(x))
同样的，在Typescript里，当多个装饰器应用在一个声明上时，会进行如下步骤的操作
1. 由上往下一次对装饰器表达式求值
2. 求值结果会被当作函数，由下至上一次调用

```
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
// 打印结果是：f(): evaluated  g(): evaluated  g(): called f(): called

```
这个执行结果也就类似于f(g(x))的执行类似，通过洋葱似的执行，从外到里，从里到外的顺序

**类装饰器**
类装饰器在类声明之前被声明（紧挨着类声明），类装饰器应用于类装饰器，可以用来监视，修改或者替换类定义。类装饰器不能在声明文件中（.d.ts），也不能用于任何外部上下文中
类装饰器表达式会在运行时当作函数调用，类的构造函数作为他唯一的参数

```
function sealed(constructor:Function){
    console.log('这是类的构造函数')
}

@sealed
class Greeter{
    greeter:string;
    constructor(message:string){}
}
```

**方法装饰器**

方法装饰器表达式会在运行时被当作函数调用，传入下列3个参数
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字
3. 成员的属性描述符

```
class Greeter{
    greeting:string;
    constructor(message:string){
        this.greeting = message;
    }

    @enumerable(false)
    greet(){
        return "Hello, "+this.greeting;
    }
}

function enumerable(value:Boolean){
    return function(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        descriptor.enumberable = value;
    }
}
```

**为什么要使用装饰器工厂，因为这样可以保证这个函数被调用的时候，才会执行下一步操作**


**访问器装饰器**
访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。访问器装饰器应用在属性描述符并且可以用来监视，修改或替换一个访问器的定义

> Typescript不允许同时装饰一个成员的get和set访问器，取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上，这是因为，在装饰器应用与一个属性描述符是，他联合了`get`和`set`访问器，而不是单独分开的。

访问器装饰符会在运行的时候传入3个参数
1. 对静态成员来说是类的构造函数，对于实例成员是类的原型
2. 成员的名字
3. 成员的属性描述符

```
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}
```

**属性装饰器**

属性装饰器会在运行是当作函数被调用，传入下列2个参数
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字

> 注意：属性描述符不会作为参数传入属性装饰器，这与Typescript是如何初始化属性装饰器的有关，因为目前无法在定义个原型对象的成员是描述一个实例属性，且没办法监视或修改一个属性的初始化方法。返回值也会被忽略。因此，属性描述符只能用来监视类中是否声明了某个名字的属性。

```
class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
```

**参数装饰器**
参数装饰器表达式会在运行的时候当作函数被调用，传入下列3个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员的类的原型对象
2. 成员的名字
3. 参数在函数参数列表中的索引

> 注意：参数装饰器只能用来监视一个方法的参数是否被传入

> 参数装饰器的返回值会被忽略

```
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
```