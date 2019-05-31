### 魔术类 


> 对"__"定义：类里面声明"__"开始的方法（是PHP给我们提供的），都是在某一时刻自动调用执行的方法
#### __get

#### __set


#### __toString

> 当直接输出对象引用时，自动调用。
>
> 如果不设置toString的时候，直接输出类实例化对象会报错。

```
class TestClass{
    public $foo;
    public function __construct($foo){
        $this->foo = $foo
    }
    public function __toString(){
        return $this->foo
    }
    
    
}

$class = new Class("Name");
// 直接输出Name
echo $class;
```

#### __clone 
> 当使用clone 关键字的时候，会自动调用__clone()函数。

#### serialize() 序列化 unserialize()反序列化
> 有时候需要把一个对象在网络上传输，为了方便传输，可以把整个对象转化成一个二进制串，等到达另一端时，再还原为原来的对象，这一个过程就叫串行化（也叫序列化）
>
> 由两种情况，我们必须把对象串行化，第一种情况就是把一个对象在网络中传输的时候要将对象串行化，第二种情况就是把对象写入文件或数据库的时候用到串行化。
>
> 串行化有两个过程，一个是串行化，就是把对象转换成二进制文件，我们使用==serialize()==来串行化一个对象，另一个是反序列化，将二进制字符串再转化成对象，我们使用==unserialize()==函数来反序列化一个对象。

```
class Person {
    // 下面是人的成员属性
    var $name;    // 人的名子
    var $sex;     // 人的性别
    var $age;     // 人的年龄
 
    // 定义一个构造方法参数为属性姓名$name、性别$sex和年龄$age进行赋值
    function __construct($name = "", $sex = "", $age = "") {
        $this->name = $name;
        $this->sex = $sex;
        $this->age = $age;
    }
 
    // 这个人可以说话的方法, 说出自己的属性
    function say() {
        echo "我的名子叫：" . $this->name . " 性别：" . $this->sex . " 我的年龄是：" . $this->age . "<br>";
    }
}
 
$p1 = new Person("张三", "男", 20);
$p1_string = serialize($p1);         // 把一个对象串行化，返一个字符串
echo $p1_string . "<br>";           // 串行化的字符串我们通常不去解析
$p2 = unserialize($p1_string);      // 把一个串行化的字符串反串行化形成对象$p2
$p2->say();
?>
// 输出内容
O:6:"Person":3:{s:4:"name";s:4:"张三";s:3:"sex";s:2:"男";s:3:"age";i:20;}
```

#### __sleep()
>再对象串行化的时候，会调用一个__sleep()方法来完成一些睡前的事情，而在重新醒来的时候，PHP会自动调用一个__wakeup()函数，做一些对象醒来就要做的事情。

> __sleep()方法不接受任何参数，返回一个数组，其中包含需要串行化的属性，没被保存的属性将会被忽略。如果没有sleep()会自动保存所有属性。

**有很多方法是钩子函数**

#### __autoload 自动加载

>**__autoload 是专门为类的不存在而设计的，很多框架利用这个函数，实现了类文件的自动加载**


#### 命名空间
> 当不同的文件中,出现了相同名字的类和常变量的时候，这个时候，为了防止在引入这两个不同的文件时，导致，类和变量的冲突，可以使用namespace来命名两个文件


### JS和PHP的差别

> 在js早期的版本中不存在Class
>
**早期JS实现类**

```
function Car (){
    
}
var car = new Car()
console.log(car)
```

> JS是一个面向原型链编程的语言，
> car有一个叫__proto__的东西。 __proto__中有一个函数construct指向function Car(){}

> JS中的方法都是定义到原型链上的，因为共享Car和Car.prototype

> JS中万物都是对象，所有的内容的顶层都是Object

#### 实现父类的方法

```
function Car(color){
}
Car.prototype.run = function(){
    console.log('run')
}
var s = new Car()
console.log(s)

function Cuze(color){
    Car.call(this,color)
}
console.log(Car.prototype)
var _proto = Object.create(Car.prototype)
console.log(_proto)
_proto.construct = Cuze
Cuze.prototype = _proto
Cuze.prototype.gogo = function(){
    console.log('gogo')
}
var s1 = new Cuze("green")
var s2 = new Car("red")
console.log(s1)
console.log(s2)
```
**s1**
![image](D590319A8A94454FA76F87250C36D557)
> 代码解析: 1:由于函数中，所有的方法都是在函数的原型链上的。要想继承父类的方法，最终目标就是将父类的原型链给子类的原型链。

> 目标 子类.prototype = 父类.prototype

> 首先为了子类中方法的修改不会覆盖到父类中，需要将父类的prototype创建一份副本。
>
> 如果直接将父类的prototype赋值给子类的prototype，
子类原型上的construct构造函数，仍然是父类的，这个时候需要去修正父类的constrct为子类的，然后再将他的原型给子类。
**Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__**

