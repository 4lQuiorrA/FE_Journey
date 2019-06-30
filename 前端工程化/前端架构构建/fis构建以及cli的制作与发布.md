特别指出 被加粗的内容，都是npm包。
该课程所用出的包包括：
**commander**，**@darkobits/lolcatjs**，**chalk**
**json2ts**，**inquirer**，**shelljs**,**user-home**,**ora和spinner**
-----------

### cli的制作与发布

1. 新建一个文件夹
2. npm init 
3. 创建一个bin文件
4. 在bin文件中创建一个`yd`的文件（记住不要加任何的文件名后缀：.js .css） 
5. 打开`yd`这个文件 然后在右下角选择一个叫`Plain Text`，点击开，选择当前要执行的文本类型
6. 在`yd`这个文件中输入要执行的语句。
7. 返回到源目录，打开package.json在，第一层加入：`"bin":{"ydcli":"./bin/yd"}` 其中 `bin`为固定写法，`./bin/yd`要执行的文件路径
```
{
  "name": "first_zengwm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "ydcli": "./bin/yd"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
8. 执行 npm login 输入自己的npm账号登陆
9. npm publish 发布npm包 npm install -g 包名
10. 如果不想发布也可以执行 npm link 让自己制作的cli直接在自己的全局的node_module生成
11. 执行ydcli

但是这个时候直接执行`ydcli`，会报出警告，
这时候需要在我们要执行的文件里面增加一个执行的环境声明·
```
#! usr/bin/env node
```
这些增加的东西有什么根据吗，

直接在item2里面输入：`which node`查看应用的安装位置。
就可以得到`/usr/local/bin/node` 因为要考虑到linux等平台的识别，就直接去掉local,得到`/usr/bin` 然后指定环境`env node`

**commander库**
可以让写的cli 增加一些程序管理的功能如：--version

```
program.version('曾卫明','-v,--version')
```
自定义自己命令的输出的内容，参考 `fis3 --version`

我们可以看到`fis3 --version`可以输出一段带彩色的展示效果

我们想要做到这种效果：1. 自己去画。2. 走捷径（使用别人写好的图形）[bootschool](https://www.bootschool.net/ascii-art)

然后我们需要把这么一个ascii的图形，放到一个数组里面·
```
const input = [
    ' ˚ ˚★* 。 • ˚ ˚ ˛ ˚ ˛ •  ',
    '•。★。*˚★ 。* 。 ',
    '° 。 ° ˛˚˛ * _Π_____*。*˚  ',
    '˚ ˛ •˛•˚ */______/~＼。˚ ˚ ˛ ',
    '˚ ˛ •˛• ˚ ｜ 田田 ｜門｜ ˚    '
].join('\n');
```

然后将`input`数组放到

```
program.version(input,'-v,--version')
```
执行ydcli -v
发现出来了，但是这个时候是没有彩色的

**var Printer = require('@darkobits/lolcatjs');**

```
program.version(Printer.default.fromString(input),'-v,--version');
```
增加这一段就可以发现图形有彩色的了。

---
我们知道`vuecli`可以执行`vue init xxx`来执行相关命令
并且当执行错误的时候，命令行也能提醒当前用户的信息,实现命令行和开发者进行交互。

```
.usage("<cmd> [options]")
  .arguments("<cmd> [env]")
  .action((cmd,otherParams)=>{
     const handler = bindHandler[cmd];
     if(!handler){
         console.error(`当前功能：${cmd}暂未提供😢`);
     }else{
         handler(otherParams);
     }
  })
```

**chalk模块的使用**
当我们安装包的时候，有的时候可以看到各色颜色的提示符。

```
console.log(chalk.blue('123421'))
```

记住命令行当出现报错的时候，必须要将整个进程给退出。

```
// 正确的退出
process.exit(1);
// 错误的退出
process.exit(0);
两种情况都能退出当前进程
```

**做这个可以自己的推广 - json2ts模块**
将json转成ts格式的接口`interface`，我把一段后台的给的一段接口数据，拿过来，然后能够将这串json数据直接转成`interface`格式文件的代码，直接方便我们以及同事的使用。同时为了自己的cli做了推广，增加了自己的公司价值。
转换前
```
{ name: '曾卫明', data: { age: 30 } }
```

转换后
```
export interface Data {
	age: number;
}

export interface RootObject {
	name: string;
	data: Data;
}
```
直接减少了，写代码的数量。



**inquirer模块用于命令行与用户进行交互**

// 演示的过程
1. 询问用户输入要生成的名称，然后生成对应的对应的文件夹
2. 然后在当前的文件目录能生成一个对应的内容
3. 执行对应的shell脚本，比如从github上下载对应的代码

**shelljs模块**
让我们可以直接在js里面使用shell脚本

**user-home**
可以让我们知道当前计算机的根目录

**ora**

让命令行呈现出loading的效果

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/qianduangongchenghua/oramokuai.png)

这个模块常常和**spinner**一起出现的


-----------