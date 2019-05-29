### 矩阵 matrix
- 矩阵的运算
> 计算规则 矩阵第m行与第n列交叉位置的那个值，等于第一个矩阵第m行与第二个矩阵第n列，对应位置的每个值的乘积之和

```
// 第一个矩阵
【1 2 3】
【4 5 6】

// 第二个矩阵
【7 8】
【9 10】
【11 12】

// 得到

【1*7+2*9+3*11  4*8+5*10+6*12】

【58 154】
```
- 矩阵在CSS中
> {2x+y=3    
> {4x+3y=7  
> (2 1)        (x)   = (3)
> (4 3)        (y)      (7)

**矩阵乘法的规则，系数矩阵的第一行的2和1，与各自对应的x和y的乘积之和等于3**
**CSS 默认的XY 对于CSS属性来讲，默认的XY值，为transform的中心点**

#### transform 的原理

> transform:matrix(a,b,c,d,e,f) 无论是旋转还是拉伸什么的，本质上都是应用matrix来实现的
>
> transform-origin 进行设置的时候，矩阵相关计算也随之发生改变，实际上效果就是，旋转拉伸的中心点变了

**transform的读法**

> 从右往左的读法 transform:rotate(1turn) translateX(90px)     transform:translateX(90px) rotate(1turn)完全不一样

> transform:matrix(1,0,0,1,30,30) 与transform:translateX(30px)等效  
>
> translate,rotate等方法都是需要单位的，而matrix方法中，e和f是可以省略单位的

#### 矩阵和matrix 

> 【a  c  e】    【x】                         【ax+cy+e】
>
> 【b  d  f】    【y】    =                   【bx+dy+f】
>
> 【0  0  1】   【1】                         【  0+0+1  】

> transform:matrix(1,0,0,1,30,30)  a = 1 b=0 c = 0   d=1  e=30  f=30

> x坐标j就是ax+cy+e = 1x0+0x1+30
>
> y坐标就是bx+dy+f = 1x0+0x1+30
>
> transform:matrix(x,x,x,x,水平偏移距离，垂直偏移距离)
>
> 第一个矩阵最下面的 001是默认的 第二个矩阵下面的1也是默认的

>matrix参数的第一个和第四个值决定了缩放 相当于scale(sx,sy)



**http://css88.com/css3Previwe/transform-Matrix.html 可以预览matrix对应的效果**

#### rotateZ(βdeg) 矩阵推导

![image](F4BA5B1A71A740E0958015EE0B29009B)

> 单位圆得到公式
>
> x` = cos(β+&)*r  可以由下式推导出 
>
> x` = sin(1-(β+a))r
>
> y`= sin(β+&)*r
>
> 已知r = Math.sqrt(x^2+y^2)
>
> // 和差化积公式

![image](7B0052C67DCB4EFFADA3BC06C7EA865E)

> x` = cos(β)x-sin(β)y+0
>
> y` = sin(β)x +cos(β)y+0
>
> 根据矩阵和matrix的转换规则   得到transform:matrix(cos(β),sin(β),-sin(β),cos(β),0,0)  这样就能得到相应的
>
> ratoteZ(βdeg)



#### 矩阵的应用场景

- SVG transform = matrix(a b c d e f)
- Canvas context.transform(2,0,0,2,150,150)
- webGL 矩阵在3D渲染中不可缺少，坐标变换有模型转换，试图变换，投影变换
- CSS3d  transform:matrix3D(sx,0,0,0,0,sy,0,0,0,0,sz,0,0,0,0,1)

#### 快速提高生成能力

- matrix3d http://ds-overdesign.com/transform/matrix3d.html
- maxtrix http://meyerweb.com/eric/tools/matrix/
- CSS-Matrix3d https://github.com/zhangdroid/CSS-Matrix3d
- tools http://www.f2e.name/case/css3/tools.html