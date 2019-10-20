### webpack
前端模块化打包工具
#### 什么是模块化
模块化是一种将系统分离成**独立功能**部分的方法，严格定义**模块接口**、模块间具有**透明性**
### 为什么要模块化
web应用越来越复杂，简单的代码，组织方式已经无法满足业务和架构需求，需要通过模块化来组织代码
#### 模块化的历史
- 无模块化
- 模块化萌芽时代
- 现代模块化时代

**无模块时代**
1. 全局变量泛滥
2. 命名冲突
3. 依赖关系管理
**模块化萌芽时代**
IIEF
**现代模块化时代**
- CommonJs(nodejs遵守的)
- RequireJs(AMD 异步模块定义)/SeaJs(CMD)
- ES6 Module

**CommonJs**
```

```
**Requirejs**
requireJS:是一个amd的框架可以异步加载js文件，按照模块加载方式，通过define()函数定义，第一个参数是一个数组，里面定义一些需要依赖的包，第二个参数是一个回调函数，通过变量来引用模块里面的方法，最后通过reture来输出
```
define(['package/lib'],function(lib){
    function foo(){
        lib.log('hello,world')
    }
    return {
        foo:foo
    }
})

```
是一个依赖前置，异步定义的AMD框架

**SeaJs**
为什么要使用模块化标准
建立模块化的标准，能够管理模块之间的依赖，从而提高代码的可维护性和复用性
**高内聚，低耦合**__软件工程

#### webpack中几个关键点
- split the dependency tree into chunks loaded on demand(拆分依赖到代码块，按需加载)
- keep initital loading time low(快速初始化加载)
- every static asset should be able to be a module (所有静态资源都可以当着一个模块)
- Ability to integrate 3rd-party libraries as modules(第三方库模块化)
- Ability to customize nearly  every part of the module bundler(自定义模块打包)
- suited for bid projects 适合大型项目

1. entry 配置入口资源
2. output 配置编译后的资源
3. module 资源处理
4. resolve 配置资源别名/扩展名等
5. plugins 插件，比loader更强大

**Loaders**
我们处理各种静态资源文件，需要用到各种loaders,比如`css-loader`和`style-loader`
- Loaders can be chained. They are applied in a pipeline to the resource. The final loader is expected to reture Javascript;each other loader can return source in arbitrary format ,which is passed to the next loader(链式调用资源通过管道 最后一个loader返回javascript)
- loaders can be synchronous or asynchrounous (可以同步异步执行)
- Loaders run Nodejs and can do everything that`s possible there (运行在nodejs环境无所不能)
- Loaders accept query parameters. This is can be used to pass configuration to the loader(loaders 可以接受参数 你可以在配置文件中给设置loaders)
- loaders can be bound to extensions/RegExps in the configurations(可以通过资源扩展名 或者正则表达式来配置每个loaders的生效范围)
- loaders can be published/installed through npm (loaders可以通过npm安装和发布)
- plugins can give loaders more features(插件可以提供loaders更多功能)

loaders的使用
1. explicit in the require statement 在引入的时候
2. configured via configuration 在配置文件中
3. configuration via CLI 在命令行中

**loaders in require**
```
require("jade!./template.jade");
require("!style!css!less!./less/bootstrap.less")
```
**loader是一个管道的机制，他会根据你的loader从后往前执行**

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