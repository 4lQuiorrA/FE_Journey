**顺带一提**
 > QA测试 FE前端 RD后端 运维OP
  ### 单元测试
**目的**
- 让开发者明确知道代码结果
**原则**
- 单一职责
- 接口抽象
- 层次分离

**断言库**
> 保证最小单元是否正常运行检测方法

**测试风格**
- 测试驱动开发（Test-Driven Development TDD）
   1. TDD关注所有的功能是否被实现（每个功能都必须有对应的测试用例），基本操作是：suite配合test利用assert('tobi'===user.name)
   2. TDD一般是写好测试用例然后再写项目
- 行为驱动开发（Behavior Driven Development BDD） 这两个都是敏捷开发方法论
   1. BDD关注整体行为是否符合整体预期，每一行代码都有目的提供一个全面的测试用例集。基本操作是：expect/should,describe配合it利用自然语言expect(1).toEqual(1)
   2. 活干完再测

**测试的使用要使用断言**
> 断言是啥？判断一件事是这样的吗？是或不是（语义化测试）

#### 单元测试框架
**断言库不一样，语法不一样**
- better-assert(TDD断言库)
- should.js(BDD断言库)
- expect.js(BDD断言库) 
- chai.js（TDD,BDD双模）（==比较流行的==）
- jasmine.js(BDD)（==比较流行的==）
- Node.js本身集成了require("assert")
- Intern 一种大而全的单元测试框架
- QUnit一个游离在Jquery左右的测试框架
- Macaca一套完整的自动化测试解决方案，国产神器来自阿里巴巴

####　单元测试流程

> 单元测试是有生命周期的，每个生命周期都会经历一个before和一个after

![image](3F3302A6BD9F44D68DBA9FE97F67222D)

#### 单元测试开始

> 建立一个包（tests(unit)），要测试的文件index.js和一个一对一的测试文件index.spec.js

```
// index.js
function add(num){
    return num++
}
```

```
// index.spec.js
describe("测试",function(){
    it("测试",function(){
        expect(1).toBe(2);
    })
})
```

**单元测试文件不是直接用来让你去node 测试文件路径  通过这样来去进行测试**
**使用karma**
```
1. npm install karma --save-dev
2. npm install karma-cli --save-dev  或者npm install karma-cli -g
3. karma init （完成之后就会出现一个karma.config.js）
4.npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
// 一般断言库所以依赖的包都是一对一对的 一般是“karma-断言库名 和一个断言库名-core” 形式的 karma-chrome-launcher是启动器，保证测试完之后的文件可以在打开chrome显示测试的情况。
（当然这个地方除了chrome还可以考虑PhantomJs（无头浏览器=>就是测试的时候不会打开浏览器，在后台默默的进行测试），该断言库已经停止维护:karma-phantomjs-launcher）
// karma init　之后会生成一个karma.config.js文件
**我们来了解一下这个文件的基本配置内容**
"framework":"jasmine"  // 当前用的断言库的类型

files:[
"./tests/unit/**/*.js", // ** 代表unit目录下的所有*.js文件
"./tests/unit/**/*.spec.js" // 代表unit目录下的所有*.spec.js文件
]

// 扩展：当多个文件需要测试的时候，只需要多添加一个js文件和一个spec.js文件
preprocessors:[
  './tests/unit/**/*.js': ['coverage']
  ],
  coverageReporter: {
      type : 'html',
      dir : './docs/coverage/' // 将报表放置的位置
    },
    reporters: ['progress','coverage'],
// 这两个文件是用来做测试代码执行匹配率的 
需要装一个npm install karma karma-coverage --save-dev
---
index.js文件
function add(num){
    if(num===1){
        return num
    }
    return num+1
}

// 即使测试通过了一条件，其实也算通过了测试，但是对于我们测试来说，如果有一个条件没有检查到，测试就缺少了匹配的一项。
// 用来向团队邀功用的。

---
browsers:["Chrome"] // 测试的浏览器 Chrome,PhantomJs（无头浏览器，执行代码是不会打开浏览器）


5.在package.json上scripts增加一项：unit:"karma start"
```

#### e2e测试
**e2e是啥？端对端，平常测试测试需要手点，但是使用e2e，可以让程序去测试功能**

**启动e2e测试  node  ./tests/e2e/baidu.spec.js**

**selenium-webdriver**


1. 创建一个spec.js文件
2. 填充代码
```
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build(); // 要打开的浏览器
  try {
    await driver.get('https://www.baidu.com/'); // 要打开的网址
    await driver.findElement(By.name('wd')).sendKeys('javascript', Key.RETURN); // 在name为wd的控件下，输入javascript，并按下回车键。
    await driver.wait(until.titleIs('javascript_百度搜索'), 2000); // 按下之后，期望得到的网页的title为javascript_百度搜索
  } finally {
    await driver.quit(); // 无论成功与否，退出程序。
  }
})();
```
3. 下载对应的驱动放到项目根目录文件下

![image](9E388ADBB7DF49FE8386E00C40A8D89E)


**nightwatch**
**写法更加纯粹化**
```
module.exports = {
    tags:['google'],
    'Demo test Google':function(client){
        client
        .url("www.google.com/")
        .waitForElementVisible('body',1000)
        .assert.title('Google')
        .assert.visible('input[type=text]')
        .setValue('input[type=text]','nightwatch')
        .waitForElementVisible('button[name=btnG]',1000)
        .click('button[name=btnG]')
        .pause(1000)
        .assert.containersText('#main','The Night watch')
        .end();
    }
}
```
**rize.js**
```
1. npm install --save-dev puppeteer rize
// puppeteer 无头浏览器 自从PhantomJS不维护了，就开始代替了PhantomJS
const Rize = reqire('rize');
const rize = new Rize();
rize
.goto("http://www.baidu.com/") // 进入网页
.type('input.header-search-input','node') // 类型输入node
.press('Enter') // 按下那个键
.waitForNavigation() // 等待时长
.assertSee('Node.js') // 看到搜索内容
.end() // 别忘了调用'end' 方法来退出浏览器。
```

#### 组件测试（非常重要，也很常用）
**react**
```
// jest


```

**f2etest 阿里**
```
// 使用原理
1.准备一台自己的机器，能将代码提交到SVN,然后需要另一台机器能从SVN中拉取代码（这个机器就是我们的头头），带着一帮小弟进行测试，小弟：一些windows云，每个服务器上装满了各种浏览器（chrome,firefox,ie6等等），那我们要写多少代码呢？其实不用，该软件有功能叫录制。打开两个浏览器，QA在一个浏览器上测试点击，当你录制完成之后，点击结束会将操作的步骤转化成e2e的代码，然后他在另外一个浏览器刷新了，发现当前内容和录制的不匹配，那么认为当前页面是失败的。反之可以将录制的代码放到主机上，主机分发WINDOWS运上去，让远程子windows云进行操作。


// UIrecord（可以试试）
```
#### 测试异步代码 macha.js

```
// 测试像nodejs，接口之类的代码     ，老袁自己根据实际应用整出来的代码
// mochaRunnerjs
const Mocha = require("Mocha");
const mocha = new Mocha({
    
})

mocha.addFile("./tests/service/router.spec.js")
mocha.run(function(){
    process.exit(0); // 0正常退出，1异常退出
});

// 同时需要安装一个mocha依赖的报表库mochawesome
npm install --save-dev mochawesome

var mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/customReportFilename.html', // 要放置的文件夹的位置和名字
    quiet: true
  }
});


// router.spec.js
const axios = require("axios");
describe("",function(){
    it("",function(){
        axios.get("xxx.com/index",function(res){
            
        })
    })
})

node ./test/services/router.spec.js

// 在docs下生成了当前异步操作的测试报表，可以看到当前的测试结果和错误信息
```


#### backstopjs 比较网页和UI的差别
```
1. npm install -g backstopjs
2. backstop init // 创建一个backstop的json配置文件

// 文件讲解
 "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ] // 指的是要在什么设备环境下测试。
  
  
 "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js", // 操作无头浏览器用的
  
  
  
   "scenarios": [
    {
      "label": "BackstopJS Homepage",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": "https://map.qq.com/m/",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    }
  ]
  // 针对要测试的网页的配置 
  // cookiePath 当你要测试的网页，需要登录的权限的时候，可以在cookies.json文件中配置登录的cookie保证能够顺利的完成测试
  // url 表示要机型测试的网页名称
  
   "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts", 
    "html_report": "./docs/backstop_data/html_report",
    "ci_report": "./docs/backstop_data/ci_report"
  },
  // html_report 将测试完之后生成的测试报告放到那个文件夹下。
  // engine_scripts引擎脚本 主要靠的就是engine_scripts
  // bitmaps_reference 将要测试的ui图放在这里
  
  // 了解之后可以执行backstop test 来执行测试 
    
    
如果ui图中和实际生成的内容相比，即使差距为几个字，那照样会报错，所以，当测试ui的时候，最好是找完全一样的图和网站去测，为避免一些额外的错误
```


## 总结一下：
- 单元测试 针对于小的函数
- 单元测试 对对于小的组件
- 接口测试 保证接口的正确性
- e2e测试  确保功能的正确性
- ui测试   确保样式
- f2etest  确保多浏览器的运转的正常