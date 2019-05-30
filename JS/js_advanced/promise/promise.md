### promise A+ 规范

![脑图](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/promiseA%2B.png)

**术语** - 解决（fulfill）:指一个 promise 成功时进行的一系列操作，如状态的改变、回调和执行，虽然规范中用`fulfill`来表示解决,但在后世 promise 实现多以`resolve`来指代。 - 拒绝（reject）:指一个 promise 失败时进行的一系列操作。 - 终值（eventual value）：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时标志着 promise 等待态，故称之为终值，有时候也会简称为值 - 拒因（reason）:也就是拒绝原因，指 promise 被拒绝后回调的值。 - Promise promise 是一个拥有 then 方法的对象和函数，其行为符合本规范 - thenable 是一个定义了 then 方法的对象和函数，文中译作“拥有`then`方法” - 值 指任何 javascript 的合法值（包括`undefined`,`thenable`,`promise`） - 异常（exception）是使用`throw`语句抛出的一个值

    -

---

### 要求

> 一个 promise 的当前状态为以下三种状态的一种:等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）.

### 等待态

处于等待态时，promise 需满足以下条件：

-   可以迁移至执行态或者拒绝态

### 执行态

处于执行态，promise 需满足以下条件：

-   不能迁移至其他任何状态
-   必须拥有一个**不可变的**终值

###　拒绝态（Reject）
处于拒绝态时，promise 需满足一下条件：

-   不能迁移至其他任何状态
-   必须拥有一个**不可变的**终值

**这里的不可变指的是恒等（即可以用===判断相等），而不是意味着更深层次的不可变**

### Then 方法

一个 promise 必须提供一个 then 方法以访问其当前值，终值和拒因。

promise 的`then`方法接受两个参数

```
promise.then(onFulfilled,onRejected)
```

#### 参数可选

`onFulfilled`和`onReject`都是可选参数

-   如果`onFulfilled`不是函数，其必须被忽略
-   如果`onRejected`不是函数，其必须被忽略

#### onFulfilled

如果`onFulfilled`是函数

-   当`promise`执行结束后必须被调用，其第一个参数为 promise 的终值。
-   在`promise`执行结束前其不可被调用
-   其调用次数不可超过一次

#### 调用时机

`onFulfilled`和`onRejected`只有在执行环境堆栈仅包含平台代码时才可被调用

- 平台代码指的是引擎、环境以及 promise 的实施代码，实践中要确保 onFullfilled 和 onRejected 方法的异步执行，且应该在 then 方法被调用的哪一轮事件循环之后的新执行栈中执行，这个事件队列可以采用"宏任务（macro-task）"机制"微任务（micro-task）"机制来实现。由于 promise 的实施代码本身就是平台代码，故代码自身在处理程序时，可能已经包含一个任务调度队列。

**宏任务（macro-task）和微任务（micro-task）**

> 表示异步任务的两种分类。在挂起任务时，JS 引擎会将所有任务按照类别分为这两个队列中，首先在 macro-task 的队列（这个队列也被叫做 task queue）中取出第一个任务，执行完毕后取出 micro-task 队列中的所有任务顺序执行；之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完（可能出现当处理微任务的时候，可以排队甚至更多的微任务，这些微任务将一个接一个地运行，直到微任务队列耗尽为止）。

**后果**

> 如果微任务以递归方式排队其他微任务，则可能需要很长时间很长时间才能处理下一个宏任务。这意味着，最终可能会在应用程序中，出现阻止的 UI 或一些已完成的 I/O 空闲。

**使用的场景**

> 如果需要同步执行某些操作的时候，请使用微任务。否则坚持使用宏任务。
> 两个类别的具体分类如下：

    - macro-task:script(整体代码)，setTimeout,setInterval,setImmediate,I/O,ui rending
    - micro-task:process.nextTick，Promises(这里指浏览器实现的原生的Primise),Object.observe,MutationObserver.

#### 调用要求

`onFulfilled`和`onRejected`必须被作为函数调用（即没有 this 值）

-   也就是说在严格模式中，函数`this`的值为`undefined`；在非严格模式中其为全局对象。

####　多次调用
`then`方法可以被同一个 promise 调用多次

-   当`promise`成功执行时，所有`onFulfilled`需按照其注册顺序依次调用
-   当`promise`被拒绝执行时，所有的`onRejected`需按照其注册顺序依次回调

####　返回

`then`方法必须返回一个`promise`对象

```
promise2 = promise1.then(onFulfilled,onRejected);
```

-   如果`onFulfilled`或者`onRejected`返回一个值 x，则运行下面的 Promise 解决过程：`[[Resolve]](promise2,x)`
-   如果`onFulfilled`或者`onRejected`抛出一个异常 e,则 promise2 必须拒绝执行，并返回拒因 e.
-   如果`onFulfilled`不是函数且`promise1`成功执行，`promise2`必须成功执行并返回相同的值。
-   如果`onRejected`不是函数且`promise1`拒绝执行，`promise2`必须拒绝执行并返回相同的拒因。

**理解上面返回"部分"非常重要，即：不论`promise`被 reject 还是被 resolve 时，promise2 还是会被 resolve,只有出现异常才会被 rejected.**

### Promise 解决过程

Promise 的解决过程是一个抽象的操作，其需输入一个`promise`和一个值，我们表示`[[Resolve]](promise,x)`,如果 x 有`then`方法且看上去像一个 Promise,解决程序即尝试使`promise`接受 x 的状态；否则其用 x 的值来执行`promise`.

这种 thenable 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+协议的 then 方法即可。

运行`[[Resolve]](promise,x)`需遵循以下步骤：

**x 与 promise 相等**

-   如果`promise`和 x 指向同一对象，以`TypeError`为拒因拒绝执行`promise`

**x 为 promise**

如果 x 为`Promise`,则使`promise`接受 x 的状态

-   如果 x 处于等待态，`promise`需保持为等待态直至 x 被执行或拒绝
-   如果 x 处于执行态，用相同的值执行`promise`
-   如果 x 处于拒绝态，用相同的拒因拒绝`promise`

**x 为对象或函数**

如果 x 为对象或者函数

-   把`x.then`赋值给`then`
-   如果取`x.then`的值抛出错误 e，则以 e 为拒因拒绝`promise`
-   如果`then`是函数，将 x 作为函数作用域调用，传递两个回调函数作为参数，一个参数叫做 resolvePromise,另一个参数叫做 rejectPromise:
    -   如果`resolvePromise`以值 y 为参数被调用，则运行`[[Resolve]](promise,y)`
    -   如果`rejectPromise`以拒因 r 为参数被调用，则以拒因 r 拒绝`promise`
    -   如果`resolvePromise`和`rejectPromise`均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略掉剩下的调用
    -   如果调用`then`方法抛出了异常 e:
        -   如果`resolvePromise`或者`rejectPromise`已经被调用，则忽略掉。
        -   否则以 e 为拒因拒绝`promise`
    -   如果 then 不是函数，以 x 为参数执行 promise
-   如果 x 不是对象或者函数，则以 x 为参数执行 promise

---

**接下来根据规范来实现一个 promise**

```
// 首先我们来看一段promise的用法

function getUserId(){
    return new Promise((resolve,reject)=>{
        http.get(url,function(results){
            resolve(results.id)
        })
    })
}
getUserId().then(function(id){

})
// 在getUserId中返回一个promise,可以通过他的then方法注册在promise异步操作成功时执行的回调，这种执行方式，使得异步调用变得十分顺手


```

我们从这段使用代码中，实现一个 promise 的雏形

```
function Promise(fn){
    this.callbacks = [];
    this.status = null;
    function resolve(value){
        this.callbacks.forEach(function (callback){
            callback(value);
        })
    }

    fn(resolve)
}
Promise.prototype.then = function(onFulfilled){
    this.callbacks.push(onFulfilled);
}

```

**主要逻辑为**

1. 调用 then 方法，将想要在`Promise`异步操作成功时执行的回调放入 callbacks 队列，其实也就是注册回调函数，可以往观察者模式上想。
2. 创建 Promise 实例时传进来的函数会赋予一个函数类型的参数，即 resolve,他接受一个参数 value，代表异步操作返回的结果，当异步操作执行成功后，用户会调用`resolve`方法，这时候，其实真正执行的操作是将`callbacks`中的回调一一执行。

---

这是一段非常 promise 基础的实现，我们可以看到当前代码在调用 then 之后，是无法继续调用 then 了，也就是无法实现链式调用。开始改造

```
Promise.prototype.then = function(onFulfilled){
    this.callbacks.push(onFulfilled);
    return this;
}
```

但是等我们执行的时候会发现，等如果再我们执行`then`去注册回调函数之前，就已经执行了`resolve`的时候，那`then`函数就无法注册到回调函数了（比如 promise 内部回调是一个同步操作），那显然是不符合`promise A+规范`：规定 promise 回调必须是一个异步执行的，来保证一个可靠的执行顺序。

```
// 我们改造一下
function resolve(value){
    setTimeout(()=>{
        this.callbacks.forEach(function(callback){
            callback(value);
        })
    },0);
}
```

> 通过 setTimeout 机制，将`resolve`中执行回调的逻辑放到 JS 任务队列末尾，以保证在`resolve`,`then`方法的回调函数已经注册完成

**但是这有个问题，如果当 then 链式已经把必要的回调函数注册完之后，已经调用了`resolve`,那之后在调用`then`仍然能注册函数，这显然是有问题的**

**加入状态**

-   fulfilled
-   pending
-   rejected
    > promiseA+规范明确规定了，`pending`可以转化成`fulfilled`或者`rejected`. 状态无法逆转：也就是说一旦`pending`转换成了`fulfilled`或者`rejected`,那么就不能再回到`pending`，也不能转换成`reject`或`fulfilled`

![状态转换](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/js/promise_state.png)

```
function Promise(fn){
    this.callbacks = [];
    this.state = 'pending';

    function resolve(value){
        
        setTimeout(function(){
            this.state = 'fullfilled';
            this.callbacks.forEach(function(callback){
                callback(value);
            });
        }.bind(this),0);
    }
       fn(resolve);
}
Promise.prototype.then = function(fulfilled){
    if(this.state==='pending'){
        this.callbacks.push(fulfilled);
    }
}
```

**重头戏：链式Promise**
> 如果在`then`注册的回调函数里面仍然是一个Promise.这就是平常所说的链式`Promise`。

```
// 举个栗子
getUserId().then(getUserJobById).then(function(){})

function getUserJobById(){
    return new Promise(function(resolve,reject){
        resolve(1);
    })
}
或者
function getUserJobById(){
    function aaa(){
        //...函数的一些内容
    }
}
```
**链式调用`Promise`指在当前`promise`达到`fulfilled`状态后，即开始下一个promise(后邻`promise`),那应该要怎么样衔接当前`promise`和下一个`promise`?**


- 其实解决方法很简单，让当前回调函数重新能执行then方法就解决了：即重新创建一个Promise的实例

![]()
- 就是当发生了resolve的时候，怎么能让后面的`then`的回调函数继续被注册到，我们之前是直接返回上一个`promise`的的实例`this`，但仔细想想想，如果我们还这样做的话，会有什么不良的后果？所以我们想到了，将当前要执行的回调函数包装在一个`promise`实例内，返回回去，这样，在后面的then方法就能直接拿到当前`then`回调函数`resolve`或者`reject`的值
```
function Promise(fn){
    this.callbacks = [];
    this.status = "pending";
    this.value = null;
    function resolve(newValue){
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            // 如果当前value是一个promise对象，或者直接是一个函数的时候
            var then = newValue.then;
            if (typeof then === 'function') { // 这里简单处理当前当前newValue是对象的情况，x.then函数存在的情况
                then.call(newValue, resolve);
                return;
            }
        }
       
        this.value = newValue;
        setTimeout(function(){
             this.state = 'fulfilled';
            this.callbacks.forEach(function(callback){
               this.handle(callback);
            })
        }.bind(this));
    }
    fn(resolve);
}
promise.prototype.handle = function(callback){
    
    if(this.status==='pending'){
        this.callbacks.push(callback);
    }
    if(!callback.fulfilled){
        callback.resolve(value);
        return ;
    }
    var ret = callback.fulfilled(value);
    callback.resolve(ret);

}
Promise.prototype.then = function(fulfilled){
    return new Promise(function(resolve){
         this.handle({
            fulfilled:fulfilled,
            resolve:resolve
        })
    });
}
```

