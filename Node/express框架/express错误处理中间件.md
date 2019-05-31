**错误层中间件(非常重要)**
> 错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个，专门具有特征符 (err, req, res, next);

```
app.get('/user/:id', function (req, res, next) {
    consooole.log(123)
    res.end(req.params.id);
});
app.use(function (error, req, resp, next) {
    resp.status(500).send('Something broke!');
})
// 错误处理中间件放在前和放在后是有差别的，放在中间件/路由的最前面的话，他会捕捉进入路由之前的操作的错误，然后打印出来，如果放在一些中间件/路由后面，那么他只会捕捉这些路由的错误，在他后面的中间件/路由内出现的错误，无法捕捉到。错误处理中间件，会自动next()
```

> resp.status(500).send('Something broke'),首先send会发送“Something broke”到网页中，status(500)会是以什么样式展现呢？可以在network中看到

![image](30C11DCDE33F468CA678F4F9ABC2CBEB)

**中间件函数的响应可以采用首选的任何格式，例如。HTML错误页（resp.render()）,简单消息（resp.send等）,JSON字符串（resp.json()）**

#### 结束当前中间件的方法
- 将任何项传递到next()函数（除了'route'），那么Express会将当前请求视为处于错误状态，并跳过所有的非错误处理路由和中间件函数 
```
app.get("/",function(req,resp,next){
    resp.en("1234")
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    next(1)
  },
  function(err, req, res, next) {
    console.error(1);
    next()
  },function(err, req, res, next) {
    console.error(2);
    next()
  },function(err, req, res, next) {
    console.error(3);
    resp.json({a:1})
  });
app.listen(9001);
// 这段代码只会打印 err.stack以及1，剩下的就不会打印了
```
---
> 在实际开发中，一般会将错误中间件中的错误，存储成为错误日志，以便以后改变错误提供便利。（可以考虑log4js的外部中间件提供便利）

```

```