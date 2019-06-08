### KOA
koa通过编写web应用，通过组合不同的generator,可以免除重复繁琐的回调函数嵌套，并极大提高错误处理的效率。koa不在内核方法中绑定任何中间件，仅仅提供了一些轻量优雅的函数。使得编写web应用舒服。

####　Application

Koa 依赖 node v7.6.0 或 ES2015及更高版本和 async 方法支持

**IOJS**
nodejs的fork版本，全部支持ES6,只要使用IOJS，就不用考虑ES6版本的兼容


```
var koa = require("koa");

var app = new koa();

app.use(async ()=>{
    this.body = "hello world"
})

app.listen(8080); 
```
#### 级联

这个什么意思呢？我们看段代码

```
const Koa = require("koa");
const app = new Koa();

// log中间件
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });


// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  // response
app.use(async ctx=>{
    ctx.body = "Hello world";
})

app.listen(8081)
```
当请求开始时首先请求流通过 x-response-time 和 logging 中间件，然后继续移交控制给 response 中间件。当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

这是什么意思呢？
就是当app执行中间件的时候，首先执行log，当他执行`await next()`就会跳过当前中间件执行x-response-time中间件，然后再遇到`await next()` 继续执行下一个中间件，然后下一个中间件就没有了`await next()`直接执行完，然后会逆向执行中间件，什么意思呢？就是会根据`await net()`的反向顺序来执行中间件剩下的内容`response->x-response-time->log`

#### 设置
应用程序设置是`app`实例上的属性，目前支持如下

#### app.listen
koa应用程序不是HTTP服务器1对1展现。可以将一个或多个koa应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序

```
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```
一个应用程序同时作为HTTP和HTTPS或多个地址

#### app.keys = 
设置签名的Cookie密钥

```
// 这些是可以接受的
app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
```
 这些密钥可以倒换，并在使用{signed:true}参数签名Cookie时使用。

 ```
 ctx.cookie.set("name","tobi",{signed:true})
 ```

 #### 错误处理
 默认情况下，将错误信息输出到`stderr`，除非`app.silent`为true，当`err.status`是404或者`err.expose`是true时，默认错误处理程序也不会输出错误，而去执行自定义错误处理逻辑，如集中式日志记录，这样就可以添加一个`error`事件侦听器。
 ```
 app.on('error', err => {
  log.error('server error', err)
});
 ```

 如果req/res执行期间出现错误，无法响应客户端，context实例仍然被传递

 ```
 app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});
 ```
 当发生错误 _并且_ 仍然可以响应客户端时，也没有数据被写入 socket 中，Koa 将用一个 500 “内部服务器错误” 进行适当的响应。在任一情况下，为了记录目的，都会发出应用级 “错误”。

 ### 上下文Context
 Koa Context将node的`request`和`response`对象封装到单个对象

`ctx.req`
Node的`request`对象

`ctx.res`
Node的`response`对象

绕过`Koa`的response的处理是**不被支持的**.应避免直接使用node属性

- res.statusCode
- res.writeHead()
- res.write()
- res.end()

`ctx.request`

Koa的`request`对象

`ctx.resposne`

Koa的`response`对象


`ctx.cookies`

**ctx.cookies.get(name.[option])**
获取cookies

**ctx.cookies.set(name,value,[options])**

设置cookies


`ctx.throw([status],[msg],[properties])`

该方法默认抛出一个500的状态错误，可以用来对请求回复的状态进行处理：
```
ctx.throw(404)
ctx.throw(404,"这里是一个错误")
ctx.throw(404,"这里是一个错误",{message:"haha"})
```

`ctx.respond`
为了绕过`Koa`的内置response处理，可以显示设置`ctx.respond = false`,如果想要对原始的res的对象进行处理，可以使用Koa处理response(但是Koa不支持这个对象);



#### response别名

**ctx.lastModified**
**ctx.etag**

为了配合`Cache-Control`中的no-cache,在服务端我们还需要加上头Last-Modified、Etag。收到带Last-Modified这个头，下次浏览器发送request就会带上If-Modified-Since或者If-Unmodified-Since,服务器收到这个request的If-Modified-Since后，通过读取他的值对比资源存在的Last-Modified,服务器就告诉浏览器是否可以使用缓存。Etag是一个更加严格的验证，他是根据文件的内容生成Etag(数据签名)，收到带Etag这个头，下次浏览器发送request就会带上If-Match或者If-Non-Match,服务器收到这两个之后同时也对比资源存在的Etag，服务器就告诉浏览器是否使用缓存

Cache-Control属性
- no-cache　可以在本地缓存，也可以在代理服务器缓存，但是这个缓存要服务器验证通过才能使用
- no-store 彻底的禁用缓存，本地和代理服务器都不缓存，每次都从服务器中取


### request请求

`request.fresh`
检查请求缓存是否新鲜，也就是内容没有改变


### response

`response.status` 
设置或者获取响应状态码
常见的响应状态码(部分我平常遇到的)
- 100 continue 服务器收到消息，等待客户端继续发送数据
- 200 ok请求成功
- 201 create 创建
- 204 nocontent 请求成功了，但是服务器没有返回任何内容
- 206 partial content 请求成功了，但是由于请求的内容过大，无法返回
- 300 Multiple Choices 是一个用来表示重定向的响应状态码,表示该请求拥有多种可能的响应
- 301 Moved Permanently 永久重定向
- 302 重定向
- 304 not modified 条件请求
- 400 bad request
- 401 unauthorized 没有授权
- 403 forbidden 拒绝访问
- 404 not found 没有找到
- 405 method not allowed 请求的方式不允许
- 408 request  timeout 请求超时
- 500 网关服务错误
- 502 bad gateway

`response.redirect(url)`
执行302重定向
ctx.status状态默认是302
当执行重定向的时候，必须将响应状态进行改变，如：

```
ctx.status = 301;
ctx.redirect("/url")
```

