**为什么要用Node**

- 削减API
- 自己控制接口
- 优化性能
- 实现真正的前后端分离
- 真正解决跨域的问题（nodejs没有域，域是给浏览器用的）

那要怎么使用Node来解决这些问题呢？

为了提高性能可以使用**SSR(服务端渲染)**，可以将假路由变成真路由，而这个过程就被称为直出

- Node+模板

如果要做的更加好，可以考虑使用**SSR同构：**使用Node去渲染vue、react等等。



### NodeJs异步IO原理浅析及优化方案

#### 异步IO的好处

- 前端可以通过异步IO消除UI堵塞
- 假设请求资源A的时间为M，请求资源B的时间为N，那么同步的请求耗时为M+N。如果采用异步方式占用时间为Max(m,n)
- 随着业务的复杂，会引入分布式系统，时间会线性增加，M+N+...和Max(M，N,...)，这个会放大同步和异步之间的差异
- I/O是昂贵的，分布式I/O是更昂贵的
- NodeJs适用于IO密集型不适用于CPU密集型

**为什么Node适用于IO密集型而不适用于CPU密集型的操作**

完美的异步IO应该是应用程序发起非阻塞调用，无需遍历或者事件循环等方法轮询

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/shijianlunhun.png)

1. 事件通过应用写入程序，与V8引擎交互..
2. 接着进入`Event Queue` 事件队列
3. 随着任务一个一个进入`Event Loop`
4. 为什么Node能吃很多？就是任务从外面进入`Event Queue` 然后进入到`Event Loop`中不停得转，很多事件堆积在一起，等待着执行
5. 不是说NodeJS就是异步得，在执行这些任务得时候，还是用得同步得，当干完之后，就会通知回调`Execute Callback`，这里不管谁先进入到`Event Loop`得，只要通知来了，他就会执行异步回调，然后返回到前端。
6. 会不会一直吃，然后把整个循环给撑爆？`NodeJS`会一直吃，来多少任务吃多少任务，`NodeJS`本身是控制不了吃多了暂停或者通知，必须通过外部工具 

**LIBUV是什么？**

负责管理调度：就是当同步执行队列中有内容执行完之后，就会告诉`EVENT LOOP`

那怎么告诉得呢？

1. 在windows在，`LIBUV`封装得是`IOCP`
2. linux 是epoll

简单点讲就是node事件队列得大管家

完整得过程就是：

- 首先外部进来一个任务，加入到队列，进入到`Event Loop` 然后执行和`Register CallBack`，比如这个任务是：`FileSystem`或者`Database`当这个任务执行完之后，`LibUV`就会通知`Event Loop`最后让这个任务吐出去

**LIBUV虽然能调度NodeJs得进进出出，但是有几个API他无法进行管理**

- setTimeout和SetInterval 线程池不参与
- process.nextTick与setTimeout(function(){},0);每次调用放入队列中，在下一轮循环中取出
- setImmeditate() 比process.nextTick()优先级低
- Node如何实现sleep

`process.nextTick`和`promise`都不会受`libuv`得调度。`process.nextTick`就跟小蝌蚪得尾巴一样，当同步任务一执行完就会直接被执行。

这几个无法被`libuv`调度，那他是怎么执行得：[事件循环](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

**node实现sleep**

```
async function test(){
    console.log('Hello');
    await sleep(1000);
    console.log('world!');
}
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
test();
```



看一段示例总结代码

```
    setTimeout(function(){
        console.log(1);
    },0);
    setImmediate(function(){
        console.log(2);
    });
    process.nextTick(()=>{
        console.log(3);
    })
    new Promise((resolve,reject)=>{
        console.log(4);
        resolve(4);
    }).then(function(){
        console.log(5);
    })
    console.log(6);
// 4 6 3 5 1 2 
```

1. 首先 `setTimeout`，`setImmediate` ,`process.nextTick`都是异步得，`setImmediate`和`process.nextTick`得优先级要高于`setTimeout`.
2. `promise`虽然是一个异步得，但是他声明得时候是同步得，只有执行`then`得时候是异步得，所以`promise`内部最早执行->`4`，然后打印`6`
3. 刚才说到`setImmediate`得优先级要低于`process.nextTick`，所以打印`3` ,同步任务执行完之后，马上执行`process.nextTick`
4. `promise`得`then`优先于`setImmediate`和`setTimeout`
5. 最后分析`setTimeout`和`setImmediate`，这两个，照之前得想法来说，`setTimeout`应该是最后一个，但是看打印来讲：`setTimout`优先于`setImmediate`，这其实跟`setTimeout`得最小时间有关系，当设置得时间要大于最小时间得时候`setImmediate`要优于`setTimeout`

#### 函数式编程在Node中得应用

- 高阶函数
  - `app.use(function(){//...todo})`
  - `var emitter = new events.EventEmitter;  emitter.on(function(){//...todo})`
- 偏函数：哨兵变量：实际上就是一个标志位。

