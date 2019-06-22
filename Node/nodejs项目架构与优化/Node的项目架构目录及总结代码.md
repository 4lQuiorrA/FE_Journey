#### 记老袁的一个优秀项目的项目文件目录

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/xiangmumulu.png)

#### 记一些优秀的代码

- router.get(/^\/(\d+)_(\d+)/, cModel.A,cModel.B,cModel.C); //  koa和express的路由可以接受正则

- var shaObj = new jsSHA(string, 'TEXT');  // 加密

   var hash = shaObj.getHash('SHA-1', 'HEX');  

- var forPound = req.headers['x-forwarded-for-pound'];  // 

- callback(new Error('Fail to parse http response to json, url:'  

  \+ reqOptions.url + '), res, body);  // nodejs最精髓的的就是对错误进行编程 ，nodejs错误要处理

- require(‘./middleware’)(app);  // 编写中间件的时候，将app传入

- async( await ctx.render(‘index.html’));