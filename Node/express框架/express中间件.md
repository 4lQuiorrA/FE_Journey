#### 中间件

```
app.use("[path]",function(req,resp,next){})
// path可以不输入，默认"/"

```
**中间件的定义**
> 中间件函数能够访问请求对象（req），响应对象以及应用程序的请求（resp）/响应循环的下一个中间件函数（next）

> 中间件函数可以执行以下任务

- 执行任何代码
- 对请求和响应对象进行更改
- 结束请求/响应循环
- 调用堆栈中的下一个中间件函数

**中间件的分类**
1. 应用层中间件
2. 路由层中间件
3. 错误处理中间件
4. 内置中间件 express.static('')是express唯一的内置中间件，用于处理静态资源文件
5. 自定义中间件，第三方中间件

**应用层中间件**
```
// 没有显示安装路径的中间件，应用程序每次收到请求时都会执行
app.use(function(req,res,next){
    
})
```
```
// 显示在/user/:id路径中的中间件函数，在/user/:id路径中为任何类型的HTTP请求执行此函数
app.use("user/:id",function(req,resp,next){
    
})
```

```
以下是在安装点使用安装路径装入一系列中间件函数
app.use("/user/:id",function(req,resp,next){
    next();
},function(req,resp,next){
    next();
})
```
```
// 以下的中间件子堆栈，用于处理针对/user/:id路径的GET请求（仅仅能对于GET请求做出处理）
app.get("/user/:id",function(req,resp,next){
    console.log(req.params.id);
    next();
},function(req,resp,next){
    resp.send("SEND userID")
});
app.get("/user/:id",function(req,resp,next){
    response.end(req.params.id);// 虽然这里不执行，但是这里可以取到req.params.id    
})
```

**内置中间件**
> express.static('')


**第三方中间件**
```
// 如cookie-parser用来解析请求路径内的cookie，如果不加，用户请求req中就没有cookie
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
app.get(function(req,resp){
    console.log(req.cookie)
})
```


------------------
**中间件的意义**
> 将一个复杂的请求的处理方式，分成N个模块来进行处理，使得整个对于请求的处理方式变得规范和有序。

**中间件的实现原理**
> 实现原理讲解：express内部维护一个函数数组，这个数组表示发出响应之前要执行的所有函数，也就是中间件函数数组了,使用app.use(fn)后，传进来的fn就会push进入这个函数数组，执行完毕之后调用next方法执行函数数组的下一个函数。如果没有调用next()的话就不会被调用，也就是说，调用被终止

```
//简单实现一个中间件机制
// 1.var app = new express() 以及 var app = express()是一致的，都为express对象
function express(){
    var arr = []
 return new express()// 实现方式估计类似于jquery的实现方式吧！   
}
express.prototype.use = function(){
    this.arr.push(fn)
}
express.prototype.next = function(req, res){
     function next() {
            var task = this.arr[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }

}
```

