> *.spec文件

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
- 行为驱动开发（Behavior Driven Development BDD） 这两个都是敏捷开发方法论

> TDD 关注所有的功能是否被实现（每一个功能都必须对应对应的测试用例），suite配合test利用assert("tobi"===user.name)<br/>
> BDD 关注整体行为是否符合整体预期,编写每一行代码都有目的提供一个全面的测试用例集 expect should describe 配合it 利用自然语言expect(1).toEqual(fn())执行<br/>

**单元测试框架**
- better-assert(TDD断言库)
- should.js(BDD断言库)
- expect.js(BDD断言库) 
- chai.js（TDD,BDD双模）
- jasmine.js(BDD)
- Node.js本身集成了require


**单元测试流程**

（before）->（beforeEach）->（it）->（after）->（afterEach）
> 每一个测试用例组通过describe进行设置<br/>

> 1.before整个测试用例开始之前<br/>
> 2.beforeEach每一个测试用例开始之前<br>
> 3.it定义测试用例，并利用断言库
> 设置chai如：expect(x).toEqual(true)

**自动化单元测试**

- karma自动化runner集成 PhantomJS无刷新

- npm install -g karma
- npm install karma-cli --save-dev
- npm install karma-chrome-launcher --save-dev
- npm install karma-phantomjs-launcher --save-dev
- npm install karma-mocha --save-dev
- npm install karma-chai

> karma 文档  https://karma-runner.github.io/3.0/intro/installation.html<br/>
> jasmine 教程 https://jasmine.github.io/tutorials/your_first_suite

**报告和单测覆盖率**


### 性能测试
**基准测试**
**面向切面编程**
- 面向切面编程AOP无侵入式统计
> AOP主要实现的目的是针对业务处理过程中的切面进行提取，它所面对的是处理过程中的某个步骤或阶段，以获得逻辑过程中各部分之间低耦合性的隔离效果<br/>
- Benchmark基准测试方法，它并不是简单地统计执行了多少次测试代码后对比时间，她对测试有着严密的抽样过程，执行多少次取决于采样的数据能否完成统计，根据统计次数计算方差


### 压力测试
- 对网络接口做压力测试需要检查的几个常用指标有吞吐量、响应时间和并发数、这些指标反应了服务器并发处理能力
- ==PV网站当日访问人数== ==UV独立访问人数（除去重复）==。PV每天二十万甚至上百万就要考虑压力测试，换算公式（QPS = PV/t ps:1000000/10*60*60 = 27.7(一百万的请求集中在10个小时，服务每秒处理27.7业务请求)）
- 常见的压力测试工具：ab,siege,http_load    
- ab -c 100 -n 100   http://localhost:8001每秒发出28个请求  Request per second 表示服务器每秒处理请求数即为QPS Failed requests表示此次请求失败的请求数，理论上压测值越大增加越慢  connectTime 连接时间，客户端向服务器建立连接，服务器处理请求，等待报文
### 安全测试

- XSS
- SQL
- CSRF


### 功能测试
**用户真实性检查**
- selenium
- protactor selenium-standalone 
- http://webdriver.io/
- 冒烟测试 Smoke Test自由测试的一种，找到一个bug开发修复，然后针对此BUG，优点节省时间防止build失败，缺点覆盖率极低
- 回归测试




------
**JAVASCRIPT lint& hint**
- 目的：检测Javascript代码标准
- 原因：Javascript代码诡异，保证团队代码规范
> http://www.jslint.com/<br>
> http://www.jshint.com/
- 搭配自动化任务管理工具自动化测试 grunt-jshint 、grunt-jslint
