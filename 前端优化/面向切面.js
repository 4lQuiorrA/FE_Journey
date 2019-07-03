function test() {
    alert(2);
    return '这个是一个返回值';
}

// 统计函数的执行时间的耗时
// 考虑到不去更改别人的业务逻辑代码，所以直接对Function做文章
// 因为要执行内容，所以可以传入一个fn函数
// 怎么样才能让fn先执行，test后执行呢，fn放到test之前就好了
// 如果要拿到test内返回的值应该怎么拿呢？
// 首先我们知道test这个函数的真正执行地方是在before函数里面，所以要返回值，肯定是要在before里面返回的,同时也要在test里面将值返回出来
Function.prototype.before = function (fn) {
    // 函数执行前要执行的时间点
    var __self = this;
    // fn();
    // // 由于之后是test.before。用test来调用before,所以this就指向调用的函数;
    // return __self.apply(this,arguments); // 这样就直接能够执行了

    // 传到after执行的方法就是将 fn 和this都包装成一个函数送到外面去
    return function () {
        // this指向了调用的环境，也就是window
        // 为了保存原来调用的this,所以我们可以将__self传进来
        fn.apply(__self, arguments);
        return __self.apply(__self, arguments); // 这里面是函数的返回值
    }
}


// after函数，让自己的逻辑在fn前执行
Function.prototype.after = function (fn) {
    // 函数执行后要执行的时间点

    var __self = this;

    // __self.apply(this);
    // fn();
    // after执行的顺序和before相反
    return function () {
        var result = __self.apply(__self, arguments); // 取到返回值
        fn.apply(__self, arguments);
        console.log(result);
        return result; // 返回到外面，可以让result在外部能取到
    }
}

// test.before(function(){
//     alert(1);
// }); // 输出1，2没问题  同理实现after

// test.after(function(){
//     alert(3);
// }) // 注意这样就输出1，2，2，3 ,自己的函数多输出了一次。很奇怪

// 要实现让默认函数只执行1遍，有方法：就是让这个默认函数test作为一个中转站
// 啥意思呢？
// 就是要在before里面执行的时候，将before和test一起送到下一个执行的函数
// 同理如果after要先执行的话，那么就是要将after和test一起传到下面去

// 现在来执行这个函数
test.before(function () {
    alert(1);
}).after(function(){
    alert(3)
})(); // 打印出1，2,3 没问题

// 梳理下流程
// 1. 首先test调用before这个函数，返回一个回调函数，然后这个回调函数调用了after,则after函数里面__self指向的是before传下来的函数的这个this
// 2. 然后调用了__self.apply() 就执行了before传下来的回调函数，打印出1，2，然后在执行fn.apply(__self)也就是自己的回调函数打印出3

// 当然不可能说每个人都可以按照before->after这样的顺序来使用
test.after(function () {
    alert(1);
}).before(function(){
    alert(3)
})(); // 打印出3，2，1，可以发现before里面的内容是最早执行的。所以要让他正常执行，那么需要将里面的回调函数也调换位置
test.after(function () {
    alert(3);
}).before(function(){
    alert(1)
})(); 
// 为什么调换了位置before还是比after的内容先执行。
// before里面是先执行fn.apply(__self) 打印出1，然后在执行回调打印出2，3


// 我们会发现，我们一开始test里面返回的值 一直都是找不到的
// 如果要返回一个值，这个值应该是在after里面取到的，为什么呢，因为只有after才是在test执行完后执行的