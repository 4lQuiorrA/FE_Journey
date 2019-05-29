


### 圣杯模型（双飞翼模型）
> 文档过度流不再是HTML:5创建的，而是HTML:xt <br/>
- position
- float 
- 负边距
- 等高
- 盒子模型
- 清除浮动

**清除浮动**
- 利用clear样式
- 父元素结束标签之前插入清除浮动的块级元素
- 利用伪元素clearfix
- 利用overflow来清除


### flex


> order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

### 弹性盒模型与Reset的选择
> flex 模型<br/>
> *的杀伤力太大！!!<br/>
> Reset.css重置 Normalize.css修复 ==Neat.css融合==<br/>
> **==box-sizing:border-box==**
>  ==将整个模型固定死，这样就不会在撑大 在移动端必须增加==<br/>
> 所有的 * ，*:before,x:after都必须加上{box-sizing:inherit}

### NOT IMAGE ICON-FONT
> 推荐网址 http://cssicon.space/#/ 纯CSS图标

### CSS hint

1. 不要使用多个class选择元素，如a.foo.boo 这在ie6一下不能正确解析
2. 移除空的CSS规则，如a{}
3. 正确的使用显示属性，如display:inline 不要和width，height,float,margin,padding同时使用，display:inline-block不要和float一起使用
4. 避免过多的浮动，当浮动次数超过十次后，会显示警告
5. 避免使用过多的字号，当字号超过十种时，显示警告
6. 避免使用过多的web字体，超过5种之后显示警告
7. 避免使用id作为样式选择器
8. 标题元素只定义一次
9. 使用width:100%的时候要小心
10. 属性值为0的时候不要写单位
11. 各浏览器专属的css要有规范
12. 例如：foo{-moz-border-radius:5px;border-radius:5px;}
13. 避免使用看起来像正则表达式的css3选择器
14. 遵守盒模型规则


**http://csslint.net/  在线版**  **csshint**

### BFC IFC GFC FFC

> Box:CSS布局的基本单位<br/>
>> Box是CSS布局的对象和基本单位，直观点来说，就是一个页面是由很多个Box组成的，元素的类型和display属性，决定的这个Box的类型，不同类型的Box,会参与不同的Formatting Context（一个决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染，让我们看看有那些盒子

- block-level box -> display属性为block,list-item,table 元素会生成一个block-level box ,并参与block formatting context

- inline-level box-> display属性为inline,inline-table的元素，会生成line-level box 并参与到inline formattig context
- Formatting context 是w3c css2.1规范中的一个概念，他是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互关系，常用的有BFC,IFC

#### 那些元素会生成BFC

- 根元素 html的根元素 
- float属性不为none的时候
- position 为absolute 或fixed
- display为inline-block table-cell table-caption flex inline-flex
- overflow不为visible

**BFC的布局规则**

---
> 每个元素的margin box 的左边和左边相接触，<br/>
> BFC的区域不会与float box重叠

```
<style>
body{
    width:300px;
    position:relative;
}
.aside{
    width:100px;
    height:150px;
    float:left;
    background:#f66;
}
.main{
    height:200px;
    background:#ffc;
    overflow:hidden;
    
}
</style>
html
<div class="aside">


</div>
<div class="main"></div>

```

> 总结，两个BFC是相互独立的，不重叠。
---
**清除内部浮动**

```
.par{
        border:5px solid #eee;
        width:300px;
      
    }
    .child{
        border:3px solid #ecaaae;
        width:100px;
        height:100px;
        float:left;
    }
    html
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
```
> 为达到清除内部浮动，我们可以触发par生成BFC，那在计算高度的时候，par内部的浮动元素child也会参与BFC的构建<br/>

> 如果生成BFC，浮动元素也跟着计算

-------
**防止垂直margin重叠**


---------
**大总结**
> BFC就是页面上的一个隔离的独立容器，容器中的子元素不会影响到外面的元素

> IFC 内联格式上下文，IFC的line box线框，高度由其包含元素中的最高的实际高度计算而来（不受到竖直方向的margin,padding影响）

> FFC flex formatting context

> GFC 网格布局格式化上下文


### CSS 分层

> SMACSS
> BEM
> SUIT 
> ACSS
> ITCSS

-> css分层.PPT
