### express

**题外话**
> --save 与--save-dev的差别  --save将安装的文件只作为开发版本时时候的包，同时加入到开发环境的依赖包中，--save-dev将安装的文件加入到开发版本同时加入到生产环境的依赖包中<br>

**一个特别需要跟express一起安装的包**
- body-parser nodejs中间件，用于处理JSON,raw,text以及URL的数据（比如post请求）
- cookie-parser 这就是一个解析Cookie的工具，通过req.cookies可以取得传过来的cookie，并把他们转成对象
- multer nodejs中间件，用于entype="multiply/form-data"(设置表单MIME编码)的表单数据

**body-parser的使用方式**
```
var bodyParser = require("body-parser")
var urlencodeParser = bodyParser({extend:false});
app.post("/",urlencodeParser,function(){})
```



