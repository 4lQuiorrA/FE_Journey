### 知识点
- 网页动画能够做到每秒60帧，就会跟显示器同步刷新，这是什么意思呢？就是一秒钟内进行了60次的重新渲染，每次渲染的时间不能超过16.66毫秒
帧 fps
显示器 HZ

在做Timeline的时候有四种颜色代表4种不同的状态
- 蓝色：网络通信和HTML解析 
- 黄色：javascript执行
- 紫色：样式计算和布局，即重排
- 绿色：重绘

知识点补充：
大家都了解`setTimeout`和`setInterval`两个方法，早期的很多浏览器利用定时器在15.8毫秒左右计算一下时间，但是我们需要的是16.666毫秒要进行一个帧渲染，但是15.8毫秒要小于16.66毫米，所以考虑用2个15.8毫秒来卡住这个16.66毫秒。这个方式有不好的地方：1. 每次渲染都浪费了`2*15.8-16.66`的这些时间。2. 都知道有同步队列，如果有一个同步的内容循环执行了`1w`次，那么一次内容执行1次的时间肯定远远超过了`16.66`毫秒。所以浏览器就提供了2个新方法：`window.requestAnimationFrame() 下一次`和`window.requestIdleCallback 下几次重新渲染时`

window.requestAnimationFrame() 在每下一次帧要渲染的时候执行，这个东西可以比喻成：我们平常的时候，在高速公路的时候，这个时候想`1fps`渲染的一样，车和车之间的距离都非常大，这个时候随时都可以往里面插一帧进去渲染，当放短假的时候，车与车之间的距离就小了一点，这个时候也还能凑合，也能往里面放帧进去。但是已经当30fps渲染一次的时候，这个时候，车与车之间的距离就很小了，这个时候就不能往里面继续插帧进去了，这个时候，就可以考虑在下一帧的时候放进去。

```
$(window).on("scroll",function(){
    window.requestAnimationFrames(scrollHandler);
})
```

window.requestIdleCallback() 这个可以设定每多少帧执行

```
requestIdleCallback(function someHeavyComputation(deadline，thereIsMoreWorkToDo){
    while(deadline.timeRemaining()>0){
        deworkIfNeeded();
    }

    if(thereIsMoreWorkToDo){
        requestIdleCallback(someHeavyComputation);
    }
})
```

`requestIdleCallback`有两个参数，`deadline.timeRemaining`和`thereIsMoreWorkToDo` 分别代表剩余时间和当前进程是否可用 


### 触发分层
1. 获取DOM并将其分隔为多个层
2. 将每个层独立的绘制进位图里面
3. 讲层作为纹理上传至GPU
4. 复合多个层来生成最终的屏幕图像

Gpu就是显卡，专门用来用来绘制图形的，要触发分层的话，首先就是要GPU来进行处理，让网页渲染的更快。层是什么意思呢，就是像穿衣服一样，一层一层包裹在一起，然后最后呈现出来。
下面就是讲的更加清楚的分层

1. DOM子树渲染层（RenderLayer）-> RenderObject -> GraphicsContent
首先每个DOM子树都有一个RenderLayer,同时伴随着一个RenderObject,然后每个RenderObject会调用GraphicsContent来进行绘制
什么时候会触发`RenderLayer`的，首先要想想，Dom是没有层的概念的，有了`RenderLayer`就有好处：能够就能在cpu绘制的时候可以有缓存，缓存的时候，如果当前已经有层了，就能够渲染的更快了
以下就是能触发层的概念
（根元素，position，transform，半透明，css滤镜，Canvas2D,video，溢出）


2. Compositior-> 渲染层子树的图形层（GraphicsLayer）-> RenderLayer -> RenderObject
如果这个时候我们让Gpu参与进来，这个时候就会触发合成了，他会吧这些`RenderLayer`变成`GraphicsLayer`,这些子树就会触发一次合成，就会变成一条一条的 `RenderLayer`-> `RenderObject`

> Compositor将所有拥有`compositing layer`进行合成，合成过程中GPU进行参与。合成完毕之后就能够将纹理映射到一个网络几何结构上-在视频游戏或者CAD程序中，这种技术用来给框架式的3d模型添加“皮肤”。Chrome采用纹理把页面中的内容分块发送给GPU，纹理能够以很低的代价映射到不同的位置，而且还能以很低的代价通过把他们应用到一个非常简单的矩形网络中变形。这就是css3d的实现原理。css3d一定要GPU的参与
（CSS3D透视变换，video,webgl,transform动画，加速CSS滤镜，叠加在已经触发合成层的一些条件）


### 网页生成的时候，至少会渲染一次。用户访问的过程中，还会不断重新渲染，以下三种条件，会导致网页重新渲染。
- 修改DOM
- 修改样式表
- 用户事件
重新渲染，就需要重新生成布局和重新绘制，前者叫“重排（reflow）”，后者叫做“重绘”
需要注意的是：“重绘”不一定需要“重排”，比如改变网页元素的颜色，就只会触发”重绘“
不会触发重排，因为布局没有改变，但是“重排”必定导致“重绘”，比如改变一个网页元素的位置，就会同时触发“重排”和“重绘”，因为布局改变了
### 如何开发不会导致
- 样式表越简单，重排和重绘就越快
- 重排和重绘的DOM元素层级就越高，成本就越高
- table元素的重排和重绘成本，要高于'div'元素
- 尽量不要把读操作和写操作，放到一个语句里面
- 统一改变样式
- 缓存重排结果
- 离线DOM Fragment/clone
- 虚拟DOM React
- 必要的时候Display：none不可见元素不影响重排重绘 visibility对重排影响，不影响重绘 

### timeline 实操
**chrome 的`timeline`属性已经更改成了`performance`了**
强制开启3d加速：`-webkit-transform:translateZ(0);`
就是让GPU参与进来
### firefox 3d view