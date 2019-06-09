### comet
基于HTTP长链接技术，就是当客户端向服务端发送请求之后，服务端会不停的往客户端一直发送内容。

实现comet的方法。   

1. 

```
// js
$.ajax({
    url:'data.php',
    dataType:"json",
    success:function(data){
        console.log(data);
    }
    })// 但是直接使用ajax会出现一个问题就是：我们请求了9次的内容，仅仅当整个请求完成的时候才会将内容给吐出来，所以我们使用

     var xmlHttp = new XMLHttpRequest();

        //获取值
        var username = document.getElementById("txt_username").value;
        var age = document.getElementById("txt_age").value;

        //配置XMLHttpRequest对象
        xmlHttp.open("get", "Get.aspx?username=" + username
            + "&age=" + age);

        //设置回调函数
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 3 && xmlHttp.status == 200) {
                // 让他每次请求完就打印出来。
                console.log(xmlHttp.responseText)
            }
        }

        //发送请求
        xmlHttp.send(null);

// php

header("Content-type:application/json;charset=utf-8");
header("Cache-controller:max-age=0")// 设置请求没有缓存，cache-controller在koa笔记中做出了介绍
$i=0
while($i<9){
    $i++;
    sleep(1); // 每执行1次都睡一秒
    $res = array("success"=>"ok","text"=>"我是测试的文本")
    echo json_encode($res);
    ob_flush(); // 把当前输出释放掉
    flush();
}
```

2. 


// 第二种就是前端连续调用申请函数


### WebSocket


### SSE
Server-Send Event(服务器推送数据的新方式)

- 应用的场景：股票金融这种页面数据需要实时刷新的应用
- 用到的技术：EventSource 这是浏览器内置的一个类`new EventSource("要调用的后台接口")`

SSE的简单模型是：一个客户端去从服务器端订阅一条“流”，之后服务端可以发送消息给客户端直到服务端或者客户端关闭该“流”，所以eventsource也叫作"server-sent-event"

**eventSource硬性规定**
- eventSource必须编码成`utf-8`的格式
- 消息的每个字段使用"\n"来做分割
- 并且需要下面4个规范定义好的字段：
   - Event事件类型
   - Data发送的数据
   - ID:每条事件流的ID
   - Retry:告知浏览器在所有的连接丢失之后重新开始新的连接等待时间，**在自动重新连接的过程中，之前收到的最后一个事件流ID会发送给服务器**。

使用举例
```
// 后台 此处用的是PHP
<?php
header("Content-Type:text/event-stream;charset=utf-8");
header("Access-Control-Allow-Origin:http://127.0.0.1");

echo "data:现在北京时间是:".date('H:i:s')."\n\r\n";

?>

// 前端js
var source;
function init(){
    source = new EventSource("http://localhost/ssetest/data.php");
    source.onopen = function(){
        console.log(`连接已建立${this.readyState}`);
    }
    source.onmessage = function(event){
        console.log(event.data)
        $("body").text(event.data);
    }
}
init();

// 前端html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script src="data.js"></script>


```
注意，之前提到了eventSource必须使用utf-8的字符集编码 如果不是就会报错，两端都需要编码成utf-8

