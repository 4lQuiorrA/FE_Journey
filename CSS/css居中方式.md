# CSS居中布局技巧
### 水平居中元素
- 元素的宽高未知
1. css3 transform
```
.parent{
    position:relative;
}
.child{
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}
```
2. flex布局
```
.parent{
    display:flex;
    justify-content:center;
}
```
适用于子元素为浮动，绝对定位，内联元素，均可水平居中
- 居中的元素为常规文档流中的内联元素（display:inline;）
常见的内联元素有：span,a,img,input,label
```
text-align:center;
```
该方法同样适用于`display:inline-block;`
- 居中元素为常规文档流的块级元素
常见的块级元素：div,h1~h6,table,p，ul,li
1. 设置margin
```
.parent{
    width:100%;
}
.child{
    width:600px;
    height:50px;
    margin:0 auto;
}
```
2. 修改为inline-block属性
```
.parent{
    text-align:center;
}
.child{
    display:inline-block;
}
```
- 居中元素为浮动元素
1. 
```
.parent{
    position:relative;
}
.child{
    width:100px;
    float:left;
    position:absolute;
    width:100px;
    left:50%;
    margin-left:-50px;
}
```
- 居中元素为绝对定位元素
1. 
```
.parent{
    position:relative;

}
.child{
    position:absolute;
    width:100px;
    left:50%;
    margin-left:-50px;
}
```
2. 
```
.parent{
    position:relative;
}
.child{
    position:absolute;
    width:100px;
    left:0;
    right:0;
    margin:0 auto;
}
```

### 垂直居中
- 通用方法，元素宽高未知
1. position+transform
```
.parent{
    position:relative;
}
.child{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}
```
2. flex 布局
```
.parent{
    display:flex;
    align-items:center;
}
```
- 居中元素为单行文本时

```
line-height:100px;
```
- 已知宽高
1. 
```
.parent {
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    height: 100px;
    margin-top: -50px;
}
```

2.
```
.parent{
    position:relative;
}
.child{
    position:absolute;
    top:0;
    bottom:0;
    height:100px;
    margin: 0 auto;
}
```
### 垂直左右居中元素
1. 绝对定位
```
div{
    width:100px;
    height:100px;
    margin:auto;
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
}
```
2. 负边距居中
```
.child{
    width:100px;
    height:100px;
    position:absolute;
    top:50%;
    left:50%;
    margin-top:-50px;
    margin-left:-50px;
}
```
兼容ie6/ie7
灵活性差，不支持百分比尺寸和min/max属性
3. transform 定位
```
.child{
    width:100px;
    height:100px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%;
}
```
4. flex 布局
5. table-cell布局
```
.parent {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 200px;
    height: 200px;
    border: 1px solid red;
}
.child {
    width: 100px;
    height: 100px;
    display: inline-block;
    background-color: #03f;
}
```
6. font-size配合vertical-align实现垂直居中
```
.parent {
    font-size: 175.4px;
    height: 200px;
    text-align: center;
}

.child {
    vertical-align: middle;
    display: inline-block;
    font-size: 12px;
    width: 50px;
    height: 50px;
    background-color: #00f;
}

```
7. 文本内容居中
```
line-height:
text-align:center;
```