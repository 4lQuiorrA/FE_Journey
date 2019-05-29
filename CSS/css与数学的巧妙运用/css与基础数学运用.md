### 切割图片
**方法1**
![image](49D2CA832E384D07A3CF6E8E6EA09F8D)

> 代码参考index.html/demo.css

**方法2**
- clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);

**扩展**
> clip-path:polygon 切割一个菱形<br/>
> clip-path:circle(40%) 切割一个原型<br/>
> clip-path: ellipse(130px 140px at 10% 20%); 切割扇形

> 裁切路径支持动画

### 实现单div做成有外框的样式

**实现的样式**
![image](05CCD4E70915460DB4E4A99F87B0437F)
- 补充 outline 不参与到border-radius的圆角上

![image](9161581A20F84A8CAF274343F6A5E285)

> 由于outline不参与到border-radius的圆角上 在内框的四周都会有1个1/4个圆形的空隙<br/>
![image](94CD8029886F4098A2CD73EB33CC0F49)

> 目的，实现用box-shadow 将空隙给填充上

> 可以算出当前的x的长度为.4em 

- 补充
> /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
> box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);


### 贝塞尔曲线

> animation-timing-function:cubic-bezier(.68,.23,.42,.72)<br/>
> 浏览器中所有能看到的动画都属于贝塞尔曲线<br/>
> 参数讲解 第一个参数，表示第一段动画执行的区间，第二个参数表示第一段动画执行的速度， 第三个参数表示第二段动画执行的区间，第四个参数表示第二段动画执行的速度
- 模拟贝塞尔曲线 cubic-bezier.com