### JSX
1. Javascript XML:是一种基于ECMASCRIPT的一种新特性一个定义带属性树结构的语法，JSX并不是xml或者html的一种限制
2. 不一定要在React里面使用JSX
3. 类xml语法容易被接受，增强JS语义，结构清晰，抽象程度高，代码模块化，嵌套


ES5方法通过JSX渲染一个组件(该方法在高版本的React已经被遗弃)
```
var HelloRedux = React.createClass({
    render:function(){
        return (<h1>Hello</h1>)
    }
})
```

ES6方法通过JSX渲染一个组件
```
"use strict"
class HelloRedux extends React.Component{
    return (
        <h1>Hello</h1>
    )
}
```

### JSX DOM树更新的算法：DOM Diff