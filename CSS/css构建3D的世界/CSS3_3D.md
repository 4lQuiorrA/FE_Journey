### HTML5陀螺仪
> 陀螺仪又叫角速度传感器，是不同于加速度计（G-sensor）d的，他的测量物理量是偏转、倾斜时的转动角速度。在手机上仅用加速度计没办法测量或重构出3D动作，测不到转动的动作的，G-sensor只能检测轴向的线性动作。但陀螺仪则可以对转动、偏转的动作做很好的测量，这样就可以精确分析出使用者的实际动作。

**x轴角度**
> alpha表示沿Z轴上的旋转角度，范围 [0, 360] 。alpha为0时表示设备的顶部正指北极方向，当设备向左旋转时，alpha将增加。
![image](1FB884DB31514DE68E4D36C98962492E)

**y轴角度**
> beta表示沿X轴上的旋转角度，也就是前后旋转角度，范围 [-180, 180]。当beta为0° 时表示设备顶部和底部与地表面的距离是一样的，当设备向前翻转时，beta递增到180°，向后翻转递减到-180°。
![image](CC18DE0A49BB45D89855F3778C343352)

**z轴角度**
> gamma表示沿Y轴上的旋转角度，也就是左右倾斜时的角度，范围 [-90, 90]。gamma等于0°表示设备左右两边与地表面的距离相等，当设备向右翻转时，gamma递增到90° ，向左翻转时，递减到-90°。
![image](D844B4167E084DD29BF6401B522D50E0)

![image](9B8CFB00125F4A678DF04FB21799F4BC)

#### code 
1. deviceorientation 设备的物理方向，表示为一系列本地坐标系的旋角
2. devicemotion 提供设备的加速信息 (g)
3. compassneedscalibration 用于通知web站点使用罗盘信息校准上述信息

#### deviceorientation 旋转角度
```
// 获取旋转角度
window.addEventListener("deviceorientation",function(event){
    // event.alpha,event.beta以及event.gamma
    // 获取物体静止的时候的旋转角度
})
```
![image](C200393D967146E499769C4BFA58D9B8)

#### ==compassneedscalibration==
```
// 获取罗盘校准 compassneedcalibration

window.addEventListener("compassneedscalibration",function(ev){
    alert('你的罗盘需要校准')
    ev.preventDefault()
})
```
#### ==devicemotion 获取重力加速度==

```
window.addEventListener('devicemotion',function(ev){
    // event.acceleration 提供了设备在X,Y,Z方向上的加速度的对象，加速度的单位为m/s2 不考虑物体的重力影响
    // event.accelerationIncludingGravity 提供了设备在X,Y,Z方向上的带重力的加速度的对象
    // event.rorationRate 可以获取设备的alpha beta gammas
    // 适用于设备运动的时候获取旋转的角度
})
```

```
// 摇一摇实现原理

var speed = 30 // speed
var x = y = z = lastX = lastY = lastZ = 0
function deviceMotionHandler(eventData){
    var acceleration = event.accelerationIncludingGravity
    x = acceleration.x
    y = acceleration.y
    z = acceleration.z
    // 判断上次的速度与当前速度对比是否发生增长
    if(Math.abs(x-lastX)>speed||Math.abs(y-lastY)>speed||Math.abs(z-lastZ)>speed){
        // 摇一摇代码
    }
}
```

### css3 3D模型、

**立方体**

> 当人眼置于不同的位置，就能产生不同的视觉差

![image](B598BAAD0AAE40D9AE8265C28D138C85)

**球面投影**
> 将一个球面投影转化成一个圆

> 把一张图切成一块一块的，然后将他们堆在一起，然后按照顺序进行旋转角度，然后当他旋转完之后，然后再将对应的图片块，向原点外推出一定的位置。

![image](010916BBF86D4C7AA5BBAB90B523773F)

> 就比如这个9边形，首先将一张图分成9份，然后置在圆点处，当开始转动的时候，图片在原点顺时针旋转完40°之后，为了让他在一定的范围内形成一个圆状的图，需要把旋转完之后的向外面平移出288px的距离，让他始终保持一个圆状的方式。


### 3D魔方

#### CSS Transforms

**transform** 

> transform 属性允许你旋转，缩放，倾斜或平移给定元素 这是通过修改CSS视觉格式化模型的坐标空间来实现的
**transform属性**

> none 不进行转换

> matrix(n,n,n,n,n,n) 定义2d转换，使用六个值的矩阵

> matrix(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) 定义3d转换，使用16个值的4*4的矩阵

> translate(x,y) 定义2d的转换

> translate(x,y,z)定义3d的转换

> translateX() 定义X轴的转换

> translateY() 定义Y轴的转换

> translateZ(z) 定义3D的转换，只是用Z轴的值

> scale(x,[y]?) 定义2D缩放的转换

> scale3d(x,y,z) 定义3D缩放的转换

> scaleX(x) 通过设置X值来定义缩放转换

> scaleY(y) 通过设置Y值来定义缩放转换

> scaleZ(z) 通过设置Z轴的值来定义3D缩放转换

> rotate(angle) 定义2d旋转，在参数中规定角度

> rotate3d(x,y,z,angle) 定义3D旋转

> rotateX(angle) 定义沿着x轴的3d旋转

> rotateY(angle) 定义沿着Y轴的3D旋转

> rotateZ(angle) 定义沿着Z轴的3D旋转

> skew(x-angle,y-angle) 定义沿着X轴和Y轴倾斜转换

> skewX(angle) 沿着X轴的2d倾斜转换

> skewY(angle) 沿着Y轴的2d倾斜转换

> perspective(n) 为3D转换元素定义透视视图

[各种转换的演示](https://c.runoob.com/codedemo/3391)
---

**backface-visibility**

> 属性指定当元素背面朝向观察者时是否可见，元素的背面总是透明的，当其朝向观察者的时候，显示正面的景象

> 我们不希望元素内容在背面可见，比如实现翻牌效果。

> backface-visibility:hidden/visible visible 表示背面可见，hidden表示背面不可见

**transform-origin 更改一个元素变形的原点**

> 属性可以使用一个，两个或三个值来指定，其中每个值都表示一个偏移量。 没有明确定义的偏移将重置为其对应的初始值

- 一个值: 必须是<length>、<percentage>或者left,center,right,top,bottom关键字中的一个
- 两个值：其中一个必须是<length>、<percentage>或left,center,right中的一个
- 三个值：前两个值和只有两个值的用法相同。第三个值必须是length。他始终代表Z轴的偏移量

**transform-style 确定元素的子元素是否位于3d空间中，还是在该元素所在的平面内被扁平化**
> 这个属性不会继承，所有必须为元素所有的非叶子后代节点设置该元素。

> preserve-3d 指定子元素位于3维空间内<br>
> flat 指定子元素位于此元素所在平面内

**==prepective视距==**<br/>
[掘金文章](https://www.jianshu.com/p/17e289fcf467)

**造物节**

> 1.Math.round(length / (2 * Math.tan(Math.PI / totalNum))) - 3;  内角的大小算出translateZ 推出距离R 

> 2.然后每个图片依照顺序顺着Y轴rotateY 旋转对应的角度   2*Math.PI/length * i deg











