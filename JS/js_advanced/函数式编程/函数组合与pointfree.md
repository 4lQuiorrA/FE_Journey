### 函数组合
> 就是要将需要嵌套执行的函数平铺。嵌套执行指的是，一个函数的返回值将另一个函数的参数

```
// 举个栗子
var compose = function(f,g){
    return function(x){
        return f(g(x));
    }
}

var greet = compose(hello,toUpperCase); // hello和toUpperCase都是一个函数
greet(x);
```
该`compose`可以完成两个函数嵌套平铺，利用`compose`将两个函数组合在一起，让函数的执行方式从右到左，而不是从内到外，可读性大大提升。这就是函数组合

**试想，如果compose需要支持多个参数，多个步骤执行，要怎么做？**
```
// 我们用前面两个参数的情况来实现这个需求
compose(d,compose(c,compose(b,a))); // 这样？emmm...

// 那为什么不搞一个舒服点的形式呢
如: compose(a,b,c,d);
```

**来看underscore中compose函数的实现吧**

```
function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};

// 解析：将第一次传入的所有的函数参数，保存起来，在第二次调用的时候，通过循环将匿名函数的参数传入最右边的函数调用，通过while实现循环执行。
```

###　pointFree
**声明式代码与命令式代码**
```
// 命令式代码
let CEOs = [];
for(var i=0;i<companies.length;i++){
    CEOs.push(companies[i].CEOs);
}

// 声明式
let CEOs = companies.map(item=>item.CEO);

// 命令式代码的意思就是：我们通过编写一条又一条的指令去执行一些操作，从而得到一些结果。而声明式就优雅多了，通过表达式的方法声明要干嘛。
```


为了理解Pointfree,需要理解什么是程序:

------>输入数据----->运算------->输出数据---->

上面一个编程任务,左侧是数据输入（input）,中间是一系列的运算步骤，对数据进行加工，右侧是最后的数据输出。一个甚至多个这样的任务，就组成了程序。

IO与键盘，屏幕，文件，数据库相关，这些跟本文无关。这里的关键是，中间的运算部分  不能出现额外的IO操作，一个程序应该是一个一个纯运算，即通过纯碎的运算来求值，否则就应该拆分出另一个任务。

2. 函数的拆分和合成
上面的程序的运算过程可以用`fn`来代替

------>输入数据----->fn------->输出数据---->

fn的类型如下
```
fn::a->b
// 表示`fn`的输入为`a`，输出数据为`b`


```
- 如果运算比较复杂，通常需要将fn拆分成多个函数:
---->输入数据----->f1---->f2---->f3---->输出数据---->

其中f1,f2,f3的类型如下

```
f1::a->m
f2::m->n
f3::n->b
```
我们可以看到这样就多出了2个中间值：m,n

当然我们可以把整个运算过程想象成一根水管，数据从一头进去，一头出来。

而函数的拆分也就是，将一根水管，换成多根水管

```
// fn与f1,f2,f3的关系如下。
fn = R.pipe(f1,f2,f3);
```
**这个关系表达式用到了`Ramda`函数库的`pipe`方法，将三个函数合成一个**

#### pointFree的概念

```
fn = R.pipe(f1,f2,f3);
```
这个公式说明，如果定义了f1,f2,f3能直接计算出fn，在这个宏观的过程中，我们不需要考虑输入值a,输出值b

也就是说，可以把数据处理的过程，定义成一种与参数无关的合成运算，不需要用到代表数据的那个参数，而仅仅需要一些运算步骤合在一起即可。

**而这就叫做pointFree：不使用所需要的值，只合成一个运算过程（无值的过程）。通过使用各种通用的函数，去组合成一个复杂的运算。而最外层的函数，不参与操作数据，而交给底层函数去处理**


```
看个例子
var addOne = x=>x+1;
var square = x=>x*x;

var addOneSquare = R.pipe(addOne,square);
addOneSquare(2);


```

**我们来一个平常工作中可能遇到的一种数据的处理情况:接下来的代码来自[FavoringCurry](https://fr.umio.us/favoring-curry/)**

```
//有这么一段后台传入的数据，很熟悉，经常见到,要求找到这段数据中的tasks中username为Scott的人，然后找到他没有完成的任务，同时将她没有完成的任务按照时间先后进行排序
var data = {
    result: "SUCCESS",
    interfaceVersion: "1.0.3",
    requested: "10/17/2013 15:31:20",
    lastUpdated: "10/16/2013 10:52:39",
    tasks: [
        {id: 104, complete: false,            priority: "high",
                  dueDate: "2013-11-29",      username: "Scott",
                  title: "Do something",      created: "9/22/2013"},
        {id: 105, complete: false,            priority: "medium",
                  dueDate: "2013-11-22",      username: "Lena",
                  title: "Do something else", created: "9/22/2013"},
        {id: 107, complete: true,             priority: "high",
                  dueDate: "2013-11-22",      username: "Mike",
                  title: "Fix the foo",       created: "9/22/2013"},
        {id: 108, complete: false,            priority: "low",
                  dueDate: "2013-11-15",      username: "Punam",
                  title: "Adjust the bar",    created: "9/25/2013"},
        {id: 110, complete: false,            priority: "medium",
                  dueDate: "2013-11-15",      username: "Scott",
                  title: "Rename everything", created: "10/2/2013"},
        {id: 112, complete: true,             priority: "high",
                  dueDate: "2013-11-27",      username: "Lena",
                  title: "Alter all quuxes",  created: "10/5/2013"}
    ]
};

```

**大笔一挥简简单单**
```
// 面向过程式编程
var getIncompleteTaskSummaries = function(membername){
    return fetchData().then(function(tasks){
        var results = [];
        for(var i=0,len = tasks.length;i<len;i++){
            if(tasks[i].username==membername){
                results.push(tasks[i]);
            }
        }
        return results;
    }).then(function(tasks){
        var results = [];
        for(var i=0,len = tasks.length;i<length;i++){
            if(!task[i].complete) results.push(tasks[i])
        }
        return results;
    }).then(function(tasks){
        tasks.sort(function(first,second){
            var a = first.dueDate,b = second.dueDate;
            return a<b?-1:a>b?1:0
        })
        return tasks;
    })
}
```
1. 使用pointFree改写
```
// 获取属性
var prop = curry(function(obj,prop){
    return obj[prop];
})
//通过条件筛选
var filter = curry(function(fn,arr){
    return arr.filter(fn);
})
// 根据条件判断是否相等
var Equal = curry(function(prop,name){
    return prop==='name'
})
// 排序
var sortBy = curry(function(fn,arr){
    return arr.sort(function(a,b){
        var a = fn(a),
        b = fn(b);
        return a<b?-1:a>b?1:0
    })
})
var getIncompleteTaskSummaries = function(membername){
    return fetchData().then(prop('tasks'))
    .then(filter(Equal('username',membername)))
    .then(filter(Equal('complete',false)))
    .then(sortBy(R.prop('dueDate')))
}
```


2. 如果使用了Ramba.js来简写了功能，可以减少大量实现代码
```

// 如果用pointFree改写/ 使用了Ramba.js来简写了功能
var getIncompleteTaskSummaries = function(membername){
    return fetchData().then(R.prop('tasks'))
    .then(R.filter(R.propEq('username',membername)))
    .then(R.reject(R.propEq('complete',true)))
    .then(R.sortBy(R.prop('dueDate')))
}

// 当然也可以将then函数在进行合成

var SelectTasks = R.prop('tasks');

// 过滤出指定用户
var filterMember = member=>R.filter(R.propEq('usernaem',member));
//过滤已经完成的任务

var excludeCompleteTasks = R.reject(R.propEq('complete',true));

// 排序
var sortByDueDate = R.sortBy(R.prop('dueDate'));

// 合成函数
var getIncompleteTasksSummaries = function(membername){
    return fetchData().then(
        R.pipe(
            SelectTasks,
            filterMember,
            excludeCompleteTasks,
            sortByDueDate
        )
    )
}
```



