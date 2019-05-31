### 柯里化
**允许部分参数来生成函数**

1. 柯里化，可以理解成提前接收部分参数延迟执行，不立即输出，而是返回一个接受剩余参数的函数。



```
function isType(type){
    return function(obj){
        return Object.prototype.toString.call(obj)==='[object '+type+'']'
    }
}
var isArray = isType('Number')
console.log(isNumber(1))
```