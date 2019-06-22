#### 预备上线

- 前端工程化的搭载动态文件的MAP分析压缩打包合并至CDN
- 单测、压测 性能分析工具Bug
- 编写nginx-conf实现负载均衡和反向代理
- pm2启动应用程序小流量灰度上线，修复bug

#### Node多线程

- Master进程均为主线程，Fork可以创造主从进程
- 通过`child_process`可以和`NET`模块组合，可以创建多个线程并监听统一端口。通过句柄传递完成自动重启，发送自杀信号，限量重启，负载均衡。
- Node默认机制是采用操作系统的**抢占式策略**。闲置的进程争取任务，但是会造成CPU闲置但IO暂时并未闲置，Node后来引入`Round-Robin`机制，也叫`轮叫调度`。主进程接受任务，再分发给子进程
- 每个子进程做好自己的事，然后通过进程间通信来将他们连接起来。这符合unix的设计理念，每个进程只做一件事，并做好。将复杂分解成简单，将简单组合成强大。

```
var cluster = require("cluster");
var http = require("http");
var numCPUS = require("os").cpus().length;

if(cluster.isMaster){// 判断是不是主进程
    require("os").cpus().forEach(function(){
        cluster.fork(); // 创建一个子进程
    });
    cluster.on("exit",function(worker,code,signal){
        console.log("worker"+worker.process.pid+"died");
    });
    cluster.on("listening",function(worker,address){
        console.log("A worker with #"+worker.id+"is now connected to"+address.address+":"+address.port);
    });
    
}else{
    http.createServer(function(req,res){
        res.writeHead(200);
        res.end("Hello world\n");
        
    }).listen(8000);
}
```



#### PM2

pm2是一个带有负载均衡功能的Node应用的进程管理器。

当你要把你的独立代码利用全部的服务器上的所有服务器上的所有CPU，并保证进程永远活着，0秒的重载

1. 内建负载均衡（使用Node cluster集群模块）
2. 后台运行
3. 0秒停机重载（但是如果一个node程序写的很差，会导致一直重载）
4. 具有Ubuntu和CentOs的启动脚本
5. 停止不稳定的进程（避免无限循环）
6. 控制台检测
7. 提供HTTP API
8. 远程控制和实时的接口API（Nodejs模块，允许和PM2进程管理器交互）

兼容情况：nodeJS v0.11 v0.10 v0.8版本，兼容coffeeScript，基于Linux和Macos

面试问题：如果这时候pm2正在重启，这时候突然来了一个请求应该要怎么处理？

肯定不可能直接丢弃掉这个请求或者直接返回502，正确的操作应该是，再pm2得上一层做出拦截（pm2的上一层也就是）

#### 服务器集群

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/fuwuqijjiqun.png)

1. 1层可以用Nginx可以做网络层的负载均衡，然后布置1个PM2集群 ，正常的情况，PM2不是直接连接后台，一般会连接一个`Varnish`或者`stuqid`.  如果有缓存直接就从`Varnish`取出来了，没有就从后台`java`中获取
2. java访问`db`数据库集群，最后通过`写集群`或者`读集群`
3. 因为`Varnish`和`java`联系是非常紧密的，如果两者因为一些情况连不上了(如：缓存过期了)，这样就需要`keepAlive`心跳检测来保持两者的连接
4. 静态资源一定要放CDN上面加速，静态资源跟后台没有关系，pm2只能通过另外的路径从CDN中取出数据

**Nagios**

可以侦测一个系统当前CPU或者内存的使用情况 



