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
**与ES6的差别**