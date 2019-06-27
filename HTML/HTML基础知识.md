### 基础知识
**HTML是什么**
> 超文本标记语言（HyperText Markup Language）,是网页浏览器中看到展示信息的

**Doctype含义**
- 声明位于HTML文档的第一行，告诉浏览器要用什么文档格式来解析这个文档
- Doctype不存在或者书写错误会导致文档以兼容模式呈现。

**兼容模式和标准模式**
> 标准模式：html排版和js渲染工作模式都是以该浏览器的最高标准进行的<br>
> 页面已宽松的向后兼容的方式显示，模拟老版

#### 为什么HTML5只需要写 <!DOCTYPE HTML>

> HTML5不是基于SGML,不需要对DTD进行引用，但是需要用doctype来规范浏览器格式


**SGML**
> 标准通用标记语言（Standard Generalized Markup Language，SGML）是现时常用的超文本格式的最高层次标准,甚至可以定义不必采用< >的常规方式 HTML和XML同样派生于它：XML可以被认为是它的一个子集，而HTML是它的一个应用


# HTML5标签

### 语义化

**语义化的定义**
> 正确的标签做正确的事

**为什么要做语义化**
> 有利于SEO，有利于搜索引擎的爬虫更好的理解我们的网页，从而获取更多的有效信息，提升网页的权重

> 即使在没有CSS的时候，能清晰的看到网页的基本骨架，支持多终端设备浏览器渲染

**补充:SEO**
> Search Engine Optimization 搜索引擎优化，是一种利用搜索引擎的规则提高网站在有关所有引擎内的自然排名

> 目的：为网站提供生态式的自我营销解决方案，让其在行业中占据领先地位，获得品牌收益；SEO包括站外SEO和站内SEO两方面；为了从搜索引擎中获得更多的免费流量，从网站结构，内容建设方案，用户互动传播，页面等角度进行合理规划，还会使搜索引擎中显示网站相关信息对于用户来更具有吸引力

> 优化方式

**内部优化**
- META标签优化，例如：title,keyword,DESCTIPTION等优化

```
// description 是现在搜索引擎占比很高的meta标签
<meta name="description" content="description of your site"/>

// keyword 现在滥用，基本不是搜索引擎搜索的标签了，权重下降
<meta name="keywords" content="keyword1 keyword2"/>

// 严格意义上来说，title不算是meta标签。不过title标签对于搜索引擎的占比很高，所以把它作为meta标签的一类。
<title>Title Name</title>
/// title字数尽量控制在50个字以内

// charset 默认字符集
<meta charset="utf-8">
```

- 内部链接的优化，包括相关性链接（Tag链接，各导航链接及图片链接）

- 网站内容的持续更新


**外部优化**
- 外部链接类别：友情链接、博客、论坛、B2B、新闻、分类信息、贴吧、知道、百科、站群、相关信息网等尽量保持链接的多样性
- 外链运营：每天添加一定数量的外部链接，使关键词排名稳定提升
- 外链选择：与一些和你网站相关性比较高,整体质量比较好的网站交换友情链接,巩固稳定关键词排名


----------
**当前标准的布局方式**
```
<header>
    <nav></nav>
</header>
<div class="content">
    <section></section>
</div>
<footer>
</footer>

```

**注意：**
==尽量少使用html标签。
能用css代替的，尽量html代替
减少dom的渲染时间。==

==1个div最次要顶3个元素==

#### html适应各种不同的分辨率
meta里面的属性 viewport scale 根据   1/window.devicePixelRatio 算出当前设备的分辨率s