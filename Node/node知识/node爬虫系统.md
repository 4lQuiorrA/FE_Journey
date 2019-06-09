### 爬虫
是一种自动获取网页内容的程序。是搜索引擎的重要组成部分，因此搜索引擎优化很大程度就是针对爬虫而做出的优化。

### robots协议
robots协议是搜索引擎中非常中要的协议，其实robots协议就是一个文本文件`robots.txt`,`robots.txt`，是一个协议，而不是命令。`robots.txt`是爬虫要查看的第一个文件。`robots.txt`文件告诉爬虫服务器上什么文件是可以被查看的，搜索机器人就会按照该文件中的内容来确定访问范围，如果你通过爬虫系统爬取了用户不可访问的内容，这就涉及到法律的范畴，所以，我们需要界定搜索机器人能访问的内容。

爬虫系统就是：我们从`browsers`获取到我们想要的内容，然后给到我们自己的`websites`之后再将爬取到的信息，放到目标`source Websites`，如图所示。
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/pachong.png)


**robots.txt的重要性**

当没有`robots.txt`文件的时候

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/withoutro.png)

红色字的文件表示是本地不允许访问的，如果没有`robots.txt`文件来告诉该爬取哪些文件，就容易触发别人的隐私

**加入了robots.txt文件**
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/sitewite.png)
这样就能够过滤掉隐私信息。


### 一个爬虫系统所需要的内容
- express
- request
- cheerio

```
const express = require("express");
const request = require("request");
const cheerio =require("cheerio");
const app = express();
app.get("/",function(req,resp){
    request("https://www.baidu.com/",function(error,request,response){
        console.log(error)
        const $ = cheerio.load(response.body);
        resp.end(123)
    })
})

app.listen(3000);
```

