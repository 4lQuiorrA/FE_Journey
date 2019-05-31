### 封装性
- 设置私有成员以及访问私有成员
- 魔术方法 __set()
- 魔术方法 __get()
- 魔术方法 __isset()
- 魔术方法 __unset()

**注意**
> __方法名  在php中一般指私有的方法。

#### 设置私有成员以及访问私有成员
- 封装的修饰符
- 设置私有成员
- 访问私有成员

> 封装性是面向对象编程中的三大特性之一，==封装性就是把对象中的成员属性和成员方法加上修饰符==，使其尽可能的隐藏对象的内部细节，以达到对成员的访问控制（记住不是拒绝访问）

**PHP支持如下3种访问修饰符**
- ==public== 公有的
- ==private== 私有的
- ==prevent== 受保护的

---
**设置私有成员**

> ==使用private关键字修饰就是实现了对成员的私有封装。==
>
> ==封装后的成员在对象外部不能直接访问，只能在类的内部方法中使用$this访问。==。

**__set()设置变量**

> 只有当设置private变量和protected变量的时候才会调用改方法。
>
> public function __set($key,$value);
>
> 函数必须是public，同时函数接受2个参数，key和value值，要更改的key值以及要更改的value值

**__get()获取变量** 
> 同理，也是当获取private和protected变量才会调用该方法。
>
> public function __get($key){} 
>
>函数必须是public 同时函数接受1个参数$key值，要获取的内容


==**这两个私有方法，可以用来当用户想要获取当前类的私有变量的时候，为了防止程序直接报错，给予使用者一定的提醒**==


**isset()和__isset()**

> ==isset()获取当前成员是否存在或者能否访问的值，返回值是一个boolean表达式 可以使用var_dump打印出内容==
> 
>__isset() ==可以拦截当前isset()的访问，更改返回值true or false(只能是true或者false,1,0)==
>
> isset()如果当前验证的是一个私有或者被保护的类型，则返回false

**unset()**

> 删除一个私有变量



**实现代码**
```
<?php
class Person{
    public $name = "David";
    private $age = 25;
    private $money = 10;

    // 只能在类的内部访问的到
    private function getAge(){
        return $this->age; 
    }
    private function getMoney(){
        return $this->money;
    }
    public function getCard(){
        echo $this->getAge();
        // echo "name=>".$this->name."age=>".$this->getAge()."money=>".$this.getMoney();
    }   
    public function __set($key,$value){
        echo $key;
        echo $value;
    }
    public function __get($key){
        echo $key."女孩不能告诉你这个问题";
    }


}

$david = new Person();
echo $david->getCard();
$david->money = 11;
echo $david->age;
var_dump(isset($david->age));
?>
```




