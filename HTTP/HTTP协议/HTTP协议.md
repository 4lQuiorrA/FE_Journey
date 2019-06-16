### HTTP协议
http协议是网络协议的一种

#### HTTP模型
![http模型](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/httpqingqiumoxing.png)

两个动作两个角色（Client(客户端),Server(服务端),请求（request）和响应（response））

当然在实际传输的过程中会经历很多内容：网络设备，代理。但是这些东西不会参与和干预到http请求中来，不应该算到模型中去。（除了劫持）

server（服务端）：比较常见的（apache）,tomcat,nginx（也能做服务器）

**浏览器与Http协议**
浏览器输入内容，到展示发生了什么？（较完整版）
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/httpqingqiu.png)

1. 第一副图，用户在浏览器中输入“google.com”:让浏览器带他去google.com这个地方，浏览器干活之前，要去干很多事情
2. 首先要测试网络通不通，为什么要测试网络呢（HTTP协议是基于网络的，如果网络都不通，其他都白瞎），也就是说，浏览器要干的第一件事就是先穿透内网和外网 
3. 第二幅图：可以看到当前有一堵围墙，这个围墙就是网络边界，网络边界是什么概念。我们继续说：网络边界的外面是Internet（外网），里面是局域网；在网络边界上有一条门：这条门就是防火墙：防火墙作用就是控制数据包的进出。防火墙分为：软防火墙和硬防火墙，硬防火墙就非常的贵了，软防火墙就是软件了，可以装在PC上（linux也有防火墙叫做firewall）.防火墙就是一个策略，对发送的包或者接受包的一个策略，什么包可以接受，什么包不能接受。比如linux来讲，防火墙的功能就是调用了linux的网络功能。当然除了防火墙，还有路由，猫或者一个代理服务器。从这里可以看出来网络边界就是用来分割外网和局域网的边界，当然这个边界必须要有出口
4. DNS解析：域名是给人用的，而ip地址是给机器用的（相当于网络上的门牌号），人类通过记忆IP地址是一件相当困难的事情，所以需要一种手段去达到域名映射到ip地址的功能。而这个就是DNS服务器，首先浏览器要调用计算机自带的域名解析的功能，找到DNS服务器的ip，找到DNS服务器的IP地址后，浏览器向DNS服务器询问：“google.com”在哪，DNS服务器解析这个域名返回对应的IP地址，浏览器拿到这个地址，这个时候，网络就通了，浏览器会经历各种设备网关（linux（可以使用tracerouter）windows使用（tracert）来探知，浏览器在找寻所要找的IP地址时，所经过的ip地址）:

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/traceroute.png)

我们看到了7，8，9，10是星号表示了，这种*号表示的是，当前经过的IP地址是无法探知到的，可能是走了岔路。

tracerouter跟ping包有关

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/ping.png)

我们可以看到这上面有一个`icmp_seq` 的东西，这东西是属于数据链路层的内容，当数据经过一个路由之后，这个值就会+1，同时`ttl`就会减1，当这个数降到了0，这个数据包就会被丢弃。如果降到了0就证明数据包在网路上请求的时间已经太久了。

`ttl`在mac下默认为64

 	5. 完成了这些，就来到了对应IP的机房，然后请求就从对应的IP地址上进去，然后再通过反向代理，通过请求头上的信息，再决定将你的请求发到那个服务器进行处理，然后服务器响应。
 	6. 然后返回（返回的路不一定相等）
 	7. 然后浏览器解析响应的数据，将数据展示起来	

### HTTP协议

HTTP是什么？HTTP是超文本传输协议，从www浏览器传输到本地浏览器的一种传输协议，网站是基于HTTP协议，例如：网站的图片，CSS，JS等都是基于HTTP协议进行传输。

文本是二进制，超文本就是不止二进制文件，还包括其他的

HTTP协议是由从客户机到服务器的请求和从服务器到客户机的响应进行约束

HTTP0.9-HTTP2都是基于TCP协议的

HTTP是基于UDP协议的



#### TCP/IP协议栈

1. 应用层

   - 为用户提供所需要的各种服务，例如：HTTP、FTP、DNS、SMTP

2. 传输层

   - 为应用层实体提供端到端的通信功能，保证数据包的顺序传送及数据的完整性
   - 该层定义了2个主要的协议：传输控制协议（TCP）和用户数据报协议（UDP）

3. 网络层

   - 主要解决主机到主机的通信问题，IP协议是网络互联层重要的协议

4. 网络接口层

   - 负责监视数据在主机和网络之间的交换

     ![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/xieyizhan.png)

     左边的是ISO/osi规范    右边的是TCP/IP规范

#### HTTP在TCP/IP协议栈中的位置

- 目前普遍应用版本HTTP1.1
- 正在逐步向HTTP2迁移
- HTTP默认端口为80 HTTPS默认端口号为443

    HTTPS其实是在HTTP上做了一层加密，但是不能说HTTPS就是HTTP，两个内容差别很大，就跟雷锋和雷锋塔得区别。尽管如此，HTTPS是基于HTTP得
    
    ![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/http.png)
    
    由于TCP/TP规范，一开始制定的时候，没有考虑到HTTP加密的原因，所以当提出的时候，只能在应用层增加一个模块也就是上图中写道的`TLC、SSL`
    
###　HTTP的工作过程
一次HTTP操作称为一个**事务**，工作过程可分为四部（必须遵守）：一个操作需要若干步，必须按照顺序执行，如果有一个出了问题，那么这个事务失败，只要操作符合这个过程就称为事务。
1. 客户机与服务器建立连接(tcp连接)。只需要单机某个超链接，HTTP工作开始。
2. 建立连接，C发送给请求给S，请求的统一格式：URL、版本协议号，后边是MIME信息包括请求修饰符，客户机信息和可能的内容，
3. 服务器接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号，一个成功或错误的代码，后边是MIME信息包括服务器信息，实体信息和可能的信息
4. 显示响应，断开连接

四步一步都不能错了，错了就报错，浏览器连接失败。

### 请求和响应

HTTP请求：请求行，消息报头 ，请求和正文。
HTTP响应组成:状态行，消息报头，响应正文
请求行组成：以一个方法符号开头，后面跟着请求URI和协议的版本
状态行组成：服务器HTTP协议的版本，服务器发回的响应状态代码和状态代码的状态描述。

**请求**

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/httpqingqiubiao.png)

- Accpet 浏览器告诉服务器接受什么样的数据类型
- Accept-Encoding  表示接受的类型支持支持什么格式 gzip接受压缩文件，减少请求文件的大小，性能优化的一种
- Accept-Language：ZH-CN
- Connnect 控制长连接（TCP层面上，多次请求，响应，在断开  keep-alive）还是短链接（每一次请求响应完都要断开）
- HOST:服务器域名
- refer：源头域名
  - HOST和refer反爬虫都是不靠谱的，容易被伪造和修改
- User-Agent：请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器

下面是请求体的抽象图：

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/requestdetail.png)

**响应**

下面是响应图：

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/response.png)

`6f`和`0`表示的是响应体的开始和结束标志

- Cache-Control 回应请求头缓存控制的
- Server：Bws/1.1  远程服务器类型



**请求和响应常见的实体报头**

- Content-Encoding 实体报头域被用作媒体类型的修饰符，它的值指示了已经被应用到实体正文的 

  附加内容的编码，因而要获得Content-Type报头域中所引用的媒体类型，必须采用相应的解码 

  机制

- Content-Language实体报头域描述资源所有的自然语言

- Content-Length 实体报头域用于指明实体正文的长度，以字节方式存储的十进制数字来表示

- Content-Type 发送给客户端的正文的媒体类型

- Last-Modified 资源的最后修改日期和时间

- Expires响应过期时期和时间。

最早的浏览器：netscape(网景)
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36




### Cookie和Session

- Cookies是保存在客户端的小段文本，随客户端每个请求发送该url下的所有cookies到服务器端
- Session则保存在服务器端，通过唯一的sessionId来区别每个用户。SessionId随着每个连接请求发送到服务器，服务器根据sessionId来识别客户端，在通过session的key获取session值

Cookie一般是在服务端生成，只有极少数的情况在浏览器生成。

Session必须存在服务器端,原始的Session一般保存在内存中

**Cookie的使用**
与Cookie相关的HTTP头有两个：

- Cookie:客户端将服务器设置的Cookie返回到服务器中
- set-Cookie：服务器向客户端设置Cookie。设置Cookie需要逐行去设置Cookie
  - 干净的浏览器和服务器交流浏览器访问服务器。客户端不会上传cookie，因为没有cookie可以传。然后服务器收到请求的时候，如果要对cookie进行一系列的操作，服务器就要先去检查请求头里面的cookie,如果没有发现cookie,他就要识别这个新的请求：通过下发一个凭据，下发凭据的同时生成一个id，将客户端和数据库里面的信息关联。服务器如果要使用cookie就要设置set-Cookie:xxx。
  - 以后访问：浏览器就只需要带着Cookie访问服务器，然后跟据浏览器中的Cookie的合法性，返回响应。(只要不清除Cookie)。如果Cookie被清除了或者Cookie过期了，浏览器就得重新走一遍登录得流程。

**Session使用**
实现方法：

- COOKIE;
- 使用URL回显来实现（以URL上的TOKEN来实现，Token每次请求都会发生改变，每一次访问：微信支付这样的就是使用URL）

第一次浏览器访问服务器：
1. 浏览器发送请求Request,服务器通过Cookie实现Session:set-Cookie:JSEESSIONID=XXX ：JSEESIONID代表java生成的SEESIONID

2. 浏览器第二次之后的访问，带上JSEESIONID发送给服务端
3. 服务器返回response

#### HTTP缓存机制

缓存会根据请求保存输出内容得副本，例如html页面，图片，文件，当下一个请求来到得时候：如果是相同得URL,缓存直接使用副本响应访问请求，而不是向原服务器再次发从请求

当浏览器向服务器发送请求，然后服务器返回数据，如果再次请求，服务器就会和客户端进行缓存协商（就是检查本地缓存存在以及是否过期）如果服务器发现当前缓存中有的话，就会返回一个304跳转，这时候是不带响应体得，因为客户端已经有了一份了，但是又响应头，这样仅仅值消耗了响应头得带宽，大大得减少了带宽得消耗。

缓存得优点

- 减少相应延迟
- 减少网络带宽消耗

下面是浏览器缓存机制得流程图

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/meihuancun.png)

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/huancunjizhi.png)

来看一下过程是怎么样得

1. 浏览器请求，先去查询本地是否又缓存，如果没有直接访问服务器
2. 有缓存，怎么判断当前是否缓存过期如果没过期，则读取缓存
3. 过期了，首先判断Etag是否匹配，匹配了，则向服务器请求得时候带上If-None-Match得请求头。最后经历服务器决策返回304重定向或者200，304让浏览器重新定向读取缓存得内容，200得话，经历缓存协商之后进行展示
   - ETag是HTTP协议提供的若干机制中的一种Web缓存验证机制，并且允许客户端进行缓存协商。这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web服务器不需要发送完整的响应。而如果内容发生了变化，使用ETag有助于防止资源的同时更新相互覆盖（“空中碰撞”）。
   - If-None-Match 是一个条件式请求首部。对于 GET 和 HEAD请求方法来说，当且仅当服务器上没有任何资源的 ETag属性值与这个首部中列出的相匹的时候，服务器端会才返回所请求的资源，响应码为200
4. 如果没有,继续匹配Last-Modified，如果是，则向服务器发送带If-None-Since得请求头，最后经历服务器决策返回304重定向或者200，之后同上。
   - Last-Modified 其中包含源头服务器认定的资源做出修改的日期及时间
   - If-None-Since 如果和If-None-Match一起出现，If-None-Since会被忽略掉。
5. 最后一种情况都不符合请求服务器，得到数据，缓存协商，进行渲染。

**两种缓存策略**

强制缓存与对比缓存

- 强制缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求直接用缓存，不再时间内，执行比较缓存策略
- 比较缓存，将缓存信息中得Etag和Last-Modified通过请求发送服务器，由服务器校验返回304状态吗得时候，浏览器直接使用缓存



### HTTPS协议分析

- HTTPS协议得安全性是由SSL协议实现得，当前使用得TLS协议1.2版本包含了四个核心子协议
  - 握手协议、密钥配置切换协议、应用数据协议以及报警协议
- 数字证书：数字证书是互联网通信中标识双方身份信息得数字文件，由CA签发。
  - CA是数字证书得签发机构
- HTTPS协议和SSL协议、TLS协议、[握手协议](https://github.com/jawil/blog/issues/14)得关系。
  - HTTPS是`Hypertext Transfer Protocol over Secure Socket Layer`即HTTP over SSL，可以理解成基于SSL得HTTP协议。HTTPS得协议安全是由SSL协议实现得
  - SSL是一种记录协议，扩展性良好，可以方便添加子协议，而握手协议便是SSL协议的一个子协议（可以把SSL协议看成一个目录）
  - TLS是SSL协议的后续版本

#### HTTP2协议分析

HTTP2默认使用HTTPS,但是HTTP2不是HTTPS,因为HTTP2启动时时默认使用加密协议的

- 使用二进制格式传输，更高效，更紧凑
- 对报头进行压缩，降低开销
- 多路复用，一个网络连接实现并行请求
- 服务器主动推送，减少请求的延迟
- 默认使用加密

HTTP1和HTTP2的差别：

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/http2dequbie.png)

**在实际分析上找到HTTP1和HTTP2的差别**

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/http/fenxihttp2.png)

我们可以看到在这个请求头上的一些不同的报头

- :authority
- :method
- :path
- :scheme

伪头(:)
仅仅就有5个伪头
4个请求
:method
:scheme 



协议协商（进行协议升级：将HTTP1.0升级到2）
HTTP提供了一个特殊的机制，这一机制允许讲一个已建立的连接升级成新的、不相容的协议（通常来说这一机制总是由客户端发起的（不过也有例外，比如说可以由服务端发起升级到传输安全协议TLS）），服务端可以选择是否升级到新协议，连接可以以常用的协议启动（如HTTP1.1）,随后再升级到HTTP2甚至是WebSockets

HTTP1.0是串行传输的

爬虫一般使用HTTP1

代理和反向代理

代理：用代理服务器将请求转发到不能到达的服务器（帮自己人转发）
白名单和黑名单策略

反向代理：互联网上有请求访问本地Ip,根据访问的不同的域名，来转发成不同的服务器