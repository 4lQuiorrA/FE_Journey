**简单构建一个web服务器**

```
var http = require("http");


http.createServer(
    function (request, response) {
        // 定义一个返回的头
        response.writeHead(200,
            { 'Content-type': 'text/plain' }
        );
        response.end('Hello world /n');

    }
).listen(9000);



console.log('serve open')
```

> 应用的是http模块

### 回调函数
**fs模块**
```
var fs = require("fs");
var data = fs.readFileSync("data.txt");
console.log(data.toString())
// fs.readFileSync() 同步读取文件信息
```

```
fs.readFile("data.txt",function(error,data){
    if(error){
        return console.error(error)
    }
    console.log(data.toString())
})
console.log('程序执行完毕')
// fs.readFile("文件名",callback) 异步读取文件信息
```

### 事件驱动模块

> nodejs是一个单进程单线程，不能同时处理多个事情，只能通过回调和事件来实现并发的效果

> nodejs的几乎所有的事件调用都是依据观察者模式来实现的<br/>
**事件驱动模型**

![image](EE73E236651E4B7CA4D0FAA2B0BBF62F)

> Event Loop 逐个的从事件队列中拿出一个事件然后找到事件处理函数，每处理一个，就会回到事件队列中重复这个过程。当队列中没有事件要执行的时候，Event Loop就会休眠一段时间，然后过一段时间去查询事件队列，这使得程序相当高效。整个事件驱动模型被称为非阻塞式IO或者事件驱动IO

```
// 事件处理代码流程
// 1. 引入events对象，创建eventEmitter对象
// 2. 绑定事件处理程序
// 3. 触发事件

// 1. 引入events对象，创建eventEmitter对象
var events = require("events");
var eventsemitter = new events.EventEmitter();
// 2. 绑定事件处理程序
var eventHandler = function(){
    console.log("connected")
} ;

eventsemitter.on("connected",eventHandler);

// 3. 触发事件
eventsemitter.emit("connected")
console.log("程序执行完成")
```

**补充**
> 能体现事件驱动机制本质的最简单方式就是事件的回调

> Node处理异步事件最开始使用的是回调。很久之后（也就是现在），原生JavaScript有了Promise对象和async／await特性来处理异步。

> 回调函数其实就是作为函数参数的函数

- https://segmentfault.com/a/1190000009715192
### NodeJS模块化

**模块化的概念和意义**
 1. 为了让NodeJS的文件可以相互调用
 2. 模块是NodeJS应用程序的基本组成元素
 3. 文件和模块是一一对应的，一个NodeJS文件就是一个模块
 4. 这个文件可能是Javascript代码、JSON或者编译过的C/C++扩展
 5. Node存在4类模块（原生模块和3种文件模块）

> 拓展4类模快-> 原生模块：原生模块在 Node.js 源代码编译的时候编译进了二进制执行文件，加载的速度最快。 文件模块-> 动态加载的，加载速度比原生模块慢。这三种文件模块分为：.js（通过fs模块同步读取js文件并编译执行）。.node（通过C/C++进行编写的Addon，通过dlopen方法进行加载）。.json（读取文件，通过调用JSON.parse()解析加载）。

**NodeJS的模块加载的流程**
<br/>
![image](0892F9C924634276A9556A191957BAA0)

> 首先require()文件首先在文件缓冲区中找是否在，如果是，直接在文件中exports给require文件，反之则判断当前是否是原生模块，如果是，则判断当前是否在原生模块缓冲区中，如果是，直接返回。如果不是则将加载原生模块，然后将当前模块缓存到原生模块缓冲区中。。。如果不是原生模块，则查找文件模块，载入文件模块，最后将其存在文件模块缓冲区中，最后exports出去--------

**require方法加载模块**

> require方法接受一下几个参数传递

- http、fs、path等原生模块
- ./mod或者../mod 相对路径的文件模块（一般都用相对路径来找到文件模块）
- /pathmodule/mod 绝对路径的文件模块
- mode 非原生模块的文件模块

### NodeJS的路由模块 url qs
> 我们要为路由提供请求的URL和其他需要的GET和POST参数，随后路由需要跟这些数据来执行相应的代码。<br/>
> 因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能.
> 需要的数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。解析这个参数的数据，需要加入url模块和queryString模块
**url模块和queryString模块**

![image](C439E3AE62E24FA9B9FBBDE153D0078E)

### 全局对象
> Javascript有个特殊的对象，称为全局对象（Global Object）它及其所有的属性可以在程序的任何地方访问，即全局变量

- 在浏览器全局对象中，通常window是全局对象

**在nodeJS中**
> 当你定义一个全局变量的时候这个变量同时会成为全局对象。需要注意的是，在nodejs中你不可能在最外层定义变量，因为所有用户的代码都是在模块的，而模块本身就不是最外层上下文。<br/>
> 注意：永远使用var变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险

**__filename**
> 返回当前执行的脚本名

**__dirname**
> 返回当前脚本的执行目录

**setTimeout clearTimeout setInterval clearInterval**

**console方法**
> log 向标准输出流打印字符并以换行符结束。<br>
> info 该命令的作用是返回信息性消息<br/>
> time 输出时间 表示即时开始<br/>
> timeEnd 表示即时结束

**process**
> 用来描述当前nodejs进程状态的对象。


- exit事件 在进程准备退出时触发
- beforeExit事件 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
- uncatchterException 当一个异常冒泡回到事件循环，触发这个事件
- Signal 当进程接受到信号的时候就触发

```
// 退出事件
process.on('exit',function(){
     setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
})
console.log('程序执行结束')
```

> process 属性

-  stdout 标准输出流
-  stderr 标准错误流
-  stdin 标准输入流
-  argv 文件参数数组
- execPath执行当前脚本的 Node 二进制文件的绝对路径
> process方法

**https://www.runoob.com/nodejs/nodejs-global-object.html**

### 常用工具 util模块

> util.inherits实现对象间原型继承的函数

```
util.inherits(constructor, superConstructor)
```

> util.inspect 将任意对象转成字符串的方法

```
util.inspect(object,[showHidden],[depth],[colors])
// showHidden,如果是true将输出更多因此信息，
// depth 表示递归的最大层数。
```

**可以使用underscore(http://www.bootcss.com/p/underscore/)**


### 文件系统 fs

- 文件模块中的方法均有异步和同步的方法  
- 异步的方法函数最后一个参数为回调函数，回调函数第一个参数包含了错误的信息

**fs.readFile 读取文件**

- fs.readFile(文件名,function(err,data){})
- fs.readFileSync(文件名)


**fs.open(path,flags[,model],callback) 打开文件**
> path文件的路径，flags文件打开的行为（r,r+...）,model设置文件模式

**fs.stat(path,callback) 获取文件信息**
- callback是回调函数，有两个参数error和stats，stats是fs.Stats对象

**fs.writeFile(file,data[,options],callback) 以异步模式写入文件**
> 直接打开文件的默认是w模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容

- file文件描述符
- data要写入的数据(可以是String或者Buffer对象)

**fs.close(fd,callback) 关闭文件**
- fd使用fs.open方法返回的文件描述符


**fs.ftruncate(fd,len,callback) 使用文件描述符来读取文件**

**fs.unlink(path,callback)删除文件**

**fs.mkdir(path) 创建目录**

**fs.readdir(path,callback) 查看目录**

**fs.rmdir(path,callback) 移除目录**