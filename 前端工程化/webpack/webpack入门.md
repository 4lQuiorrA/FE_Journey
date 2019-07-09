### webpack
前端模块化打包工具
#### 什么是模块化
模块化是一种将系统分离成**独立功能**部分的方法，严格定义**模块接口**、模块间具有**透明性**
#### 模块化的历史
- 无模块化
- 模块化萌芽时代
- 现代模块化时代

**现代模块化时代**
- CommonJs(nodejs遵守的)
- RequireJs(AMD)/SeaJs(CMD)
- ES6 Module

为什么要使用模块化标准
- **高内聚，低耦合**__软件工程

#### webpack中几个关键点
- split the dependency tree into chunks loaded on demand(拆分依赖到代码块，按需加载)
- keep initital loading time low(快速初始化加载)
- every static asset should be able to be a module (所有静态资源都可以当着一个模块)
- Ability to integrate 3rd-party libraries as modules(第三方库模块化)
- Ability to customize nearly  every part of the module bundler(自定义模块打包)
- suited for bid projects 适合大型项目

### webpack 使用优化

**使用别名**
```
{
    resolve:{
        alias:{
            moment:"moment/min/moment-with-locales.min.js"
        }
    }
}

// 
require("moment");
```
当你要使用的模块的名字比较长的时候可以使用别名

**忽略对已知模块解析**

```
{
    module:{
        noParse:[/moment-with-locales]
    }
}
```
对一些不需要解析的模块进行忽略，让webpack不去解析这些模块

**将模块暴露到全局**
1. 使用`expose-loader`

```
{
    module:{
        loaders:[{
            test:/jquery\.js$/,
            loader:"expose?$!expose?jQuery"
        }]
    },
    
}

// 在你需要引入jquery
require("expose?$!expose?jQuery!jquery")
```

2. 使用`ProviderPlugin`

```
{
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ]
}

// 使用
$("#item")
```

### 提取公共代码

将一些重复使用的库啊，模块，减少打包后的代码的体积
可以使用webpack自带的`webpack.optimize.CommonsChunkPlugin`
```
{
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            // (the common chunk name)
            filename:"[name].[hash:8].js",
            // (the filename of the commons chunk)
            minChunks:3,
            chunks:['jquery','underscore']
        })
    ]
}
```

### 配置全局开关

```
{
    plugins:[
        new webpack.DefinePlugin({
            DEBUG:true
        })
    ]
}
const Constant = {
    API_HOST:DEBUG?"http://xxx.xxx:8080":""
}
```

### 单独打包css

```
{
    plugins:[
        new ExtractTextPlugin("[name].[hash:8].css",{
            allChunks:true
        })
    ]
}
```

----
### webpack2新变化
- 支持了ES6的import,把`System.import`作为拆分成一个异步调用函数，想用ES6模块化需要安es2015-webpack
- tree-shaking 优化模块一个export他没有使用过，他会忽略暴露export给其他模块的声明
- 在过去，由于环境不同需要去处理不同环境的结构配置，webpack2利用了`-env dev=>"dev"`
- 再loader的配置中使用了resourcePath来替代原来的resource
- UglifyJsPlugin将不再把所有loader都切到代码压缩模式，loaderOptionPlugin来提供这些选项
- OccurentOrderPlugin不在需要