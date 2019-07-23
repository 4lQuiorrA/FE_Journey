### 基本安装
1. Typescript 的安装
```
npm install -g typescript
```
2. 安装完成之后键入`tsc`命令，就能看到关于`tsc`命令的内容，证明当前已经安装完成了

3. 编译文件
新建一个`app.ts`文件

```
class test{

}
```
在终端键入`tsc app.ts`文件，会发现再次生成了一个`app.js`文件

```
var test = /** @class */ (function () {
    function test() {
    }
    return test;
}());

```

### typescript 基本数据类型
- Boolean
- Number
- String
- Array
- Enum
- Any
- Void

**Boolean、Number、String**
```
var booleanType:Boolean = true;
var numberType:Number = 123;
var stringType:String = '123'
```
**Array**
```
// Array类型有两种表达方式
// 1. 第一种就是在基本数据类型后面增加[]，来表明他是一个数组
var arrayType:number[] = [1,2,3]
// 2. 第二种就是使用数组泛型: Array<数据类型>

var arrayType:Array<number> = [1,2,3]


```
当然我们接触到的大部分的数组类型都可能出现混合类型的
这个时候就要用到
**元组类型Tuple**
元组类型就提供元素类型不必相同，比如可以定义一对值分别为`string`和`number`类型的元组

```
let x:[string,number];
x = ['hello',10];
```

**枚举类型**
枚举是对Javascript类型的一个补充
枚举：当一个变量存在有限的几种取值的时候，就能够考虑使用枚举类型了，如：星期几的情况
```
enum week  {mon,tues,wed,trues,fri,sat,sun}

// 可以直接通过下标来获取内容
如：
week[0]

当然可以通过更改赋值来指定他们的下标
enum week {mon=1,tues=2,wed=3,trues=3,fri=4,sat=5,sun=6}

// 同样可以来获取每个值对应的下标
let w:week = week.mon // 1

```

**any和void类型**

1. any
当一个变量的变量类型不固定的时候，可以使用any来声明变量
```
let anyType:any = 1;
anyType = "hello world";
anyType = false;
```


2. void 
当一个函数你不想返回任何值的时候可以使用void

```
function test():void{

}
```

#### 函数默认参数和可选参数

当一个函数可能拥有一个参数或者两个参数，甚至没有参数的时候，可以使用可选参数

```
function test(arg1:string,arg2:string):void{
    console.log(arg1+' ---- '+arg2);
}
test("david","mike") // 这是有两个参数的
// 如果：
test("david") // 编译报错
```
这个时候就需要用上可选参数了

```
function test(arg1:string,arg2?:string):void{
    console.log(arg1+' ---- '+arg2);
}
test("david","mike") // 这是有两个参数的
// 如果：
test("david") 
```
在参数`arg2`后面增加一个`?`来区分他是一个可选的参数，同理也可以在`arg1`后面增加一个`?`，这样两个参数都是可选的
```
test() // 这样调用也是正确的
```

**默认参数**
可以参考Es6的默认参数

**可变参数**
我们注意到即使使用了可选参数，一个函数你很难预计到，要传递多少个参数，不可能写一长串的变量，一个一个写入`?`,所以：

```
function test(arg1:string,...arg2:array<number>):string{

}
test("david","mike","jim","hulk")
```
这个时候可以使用余下参数标识符`...`来代表剩余的参数(当然`arg1`是可以省略的 )


#### typescript重载

```
function attr(arg1:string):string;
function attr(arg2:number):number;
function attr(nameorange:any):any{
    if(nameorange&&typeof nameorange==='string'){
        alert('姓名');
    }else{
        alert('年龄');
    }
}

attr("hello"); // 姓名
attr(10); // 年龄
```

#### typescript类

```
class Classes{
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    print(){
        console.log(this.name+'----'this.age);
    }
}
```
#### 访问修饰符

`public` `private` `protected` 

```
class Person {
    public name:string
    public age:number;
    constructor(private name:string,public age:number){
        this.name = name;
        this.age = age;
    }
}
这个时候name就会从public变成private
```
#### 封装的实现

```
class Person{
    private name:string;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    print(){
        return this.name;
    }
    get _name(){
        return this.name;
    }
    set _name(newName:string){
        this.name = newName;
    }
}
let person = new Person("david",10);
person.name; // 直接报错，说明name是私有的，无法被访问到
// 这个时候需要创建一个get和set方法

person._name();  // davide
person._name("mike")
person._name(); // mike
```

#### static和引用类型的使用

**static**
```
class Person{
    static name:string;

    print(){
        return this.name+'----' // 静态变量使用this是错误的，需要通过类名来引用
        return Person.name;
    }
}
```
**引用类型**

```
class Person{
    name:string;
    constructor(name:string){
        this.name = name;
    }
}

var person:Person; // 引用类型
person = new Person("david");
person.name; 
```
#### 接口的创建
**接口的用途：用于规范一个变量的类型**
```
function printLabel(labelObj:{label:string}){
    console.log(labelObj.label)
}
var myObj = {label:"Hello"};
printLabel(myObj);
```
我们平常传入json数据这样传入复杂，这个时候可以考虑使用接口

```
interface LabelValue{
    label:string;
}
function printLabel(labelObj:LabelValue){
    console.log(labelbelObj.label)
}

var Obj = {label:'hello-1'}
printLabel(obj);
```

**接口的可选属性**
我们在之前学习了函数的可选属性
```
function(name?:string,age?:string){}
```
在接口的可选属性中也是这样的

```
interface labelValue{
    name?:string;
    age?:string;
}
function print(label:labelValue){
    console.log(label.name)
}
let value = {
    name:"david"
}
print(value);
// 在这里age和name都可以选择传或者不传
```
**接口函数类型**

```
interface LabelValue{
    (source:string,subString:string):boolean
}
var mySearch:LabelValue;
mySearch = function(source:string,subString:name){
    let index = source.search(subString);
    if(index!=-1){
        return true;
    }else{
        return false;
    }
}
mySearch("123","1")
```
**接口-数组类型**
```
interface StringArray{
    [index:number]:string; // 标志数组的下标为number类型，整个数组的类型为string
}

var myarr:StringArray // 使用引用类型，将myarr设为StringArray
myarr = ["1","3"];
myarr[0]
```

#### 实现接口
```
interface ClockInterface{
    currentTime:Date;
    setTime(d:Date);
}
class Clock implements ClocksInterface{
    currentTime:Date;
    setTime(d:Date){
        this.currentTime = d;
    }
}
```
比较一下创建接口和实现接口

1. 使用的都是interface
2. 使用的方法，创建接口是用的引用类型，实现接口使用`implements`

#### 接口的继承与混合类型

1. TS中接口的继承不仅仅支持单继承，而且还继承双继承
2. 调用接口的方法使用var s = <Square>{};因为接口不是类无法通过new来创建实例

```
interface Shape{
    shapeWidth:number;
}
interface PenShape{
    penWidth:number;
}
interface Square extends Shape,PenShape{
    squareWidth:number;
}
var s = <Square>{};
s.shapeWidth = 10;
s.squareWidth = 20;
s.penWidth = 30;
```
**混合类型**
混合类型讲的是在一个接口里面同时有多种变量的表示类型如：
```
interface Counter{
    interval:number;
    reset():void;
    (startTime:number):void;
}
var c:Counter;
c.interval = 100;
c.reset();
c(200);  
```