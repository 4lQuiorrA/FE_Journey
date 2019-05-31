### 路由
> 路由是由一个URI、HTTP请求（GET、POST）和若干个句柄组成，他的结构如下app.METHOD('path',[callback],callback),app是express对象的一个实例

**路由有一个专用的英文单词叫controller**

> 标准路由 /controller/action  一个controll对应多个 action

> next()

```
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
// 句柄，指的是处理一个请求的函数
```

**express 路由正则! 因为路径可能是字符串、字符串模式或者正则表达式**
#### 路由的处理程序
> 你可以提供多个回调函数，以类似于中间件的行为来处理请求。唯一的例外是这些函数可以调用next('route')来绕过剩余路由的回调。<br>
> 路由处理程序的形式可以是一个函数，一组函数或者两者之间的结合

```
// 单个函数可以处理路由
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

```
```
// 多个函数可以处理路由
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

```
// 一组回调函数可以处理一个路由
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0,cb1,cb2]);
```
```
// 两者的结合
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```


**响应的方法**
- res.end 结束响应进程
- res.json 发送 JSON 响应
- res.render 呈现视图模板
- res.send 发送各种类型的响应



**app.route**
> 可以使用app.route为路由创建可链接的路由处理程序。因为在单一位置指定路径，可以减少冗余和输入错误

```
app.route("/look")
    .get(function(){
        
    })
    .post(function(){
        
    })
    .put(function(){
        
    })
    .delete(function(){
        
    })
    
```
**express.Router**
> 可以用来创建可以安装的模块化路由处理程序

```
// 举个例子

var express = require("express");
var router = express().Router;
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});
module.exports = router;


// 应用程序中
var birds = require('./birds');
...
app.use('/birds', birds);
、、此应用程序现在可处理针对 /birds 和 /birds/about 的请求，调用特定于此路由的 timeLog 中间件函数。

```

**路由的结束**
> 一旦有消息被传输出去，那么传输就结束了，比如当一个句柄内被resp.send或者resp.end返回内容的时候，后面的resp.send或者resp.end就不会再执行了，但是每个句柄内的逻辑还是会执行的，仅仅返回给客户端的数据被停止了而已

