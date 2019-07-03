### 缓存策略：ETag Last-Modified 
有且只有这两个缓存策略
![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/qianduanyouhua/huancuncelv.png)

1. 首先浏览器向服务端发送请求，浏览器判断当前访问的内容是否有缓存
    1. 有缓存没有过期，直接从缓存中取出，直接结束
    2. 有缓存但是已经过期了，判断当前服务器是配置了Etag缓存策略吗？是的话，就向服务器发送一个带If-None-Match，然后服务器就根据自身的expires和If-None-Match对比看是否过期了，如果没有过期，返回一个304的仅仅有响应头，直接从缓存中获取，反之返回200更新缓存
    3. 如果没有配置Etag，就访问有没有配置Last-Modified策略，如果是，就向服务器发送一个If-Since-Match时间，同样和expires过期时间进行对比，没有过期返回一个仅仅带响应头的响应304，从缓存中获取，如果过期了则直接200更新缓存。
    4. 如果这两个缓存策略都没有的话，直接访问服务器

如果两个都配置了的话，两个都需要匹配到，才能进行下一步。

在nginx进行配置Etag和Last-Modified
