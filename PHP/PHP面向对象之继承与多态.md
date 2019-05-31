### 继承与多态
#### 继承用法
- 类继承的应用
- 访问类型的控制
- 子类中重载父类的方法


**类继承的应用**
> PHP5.0只支持单继承，不支持多继承 即一个子类只能拥有一个父类。不允许子类直接继承多个父类，但是一个父类能被多个子类继承
>
> 可以有多层继承，一个类可以继承一个类的子类。

**访问类型控制**
```
                private         protected       public(默认的)
在同一个类中    可以访问        可以访问                可以访问
在子类中        不可以访问      可以访问                可以访问
在类的外部      不可以          不可以访问              可以访问
```

#### 多态

**==重载==** 
> ==在一个类里面，成员方法名字必须相同，但是参数可以不同，返回类型可以不能也可以相同==。
>
> 在调用类的方法的时候，根据传入的参数的内容来调用不能的方法
>
**==重写==**
> ==是指子类对父类允许访问的成员方法的实现过程进行重新编写，但是子类重写的成员方法，返回值以及形参不能发生改变==。
> 也就是常说的，子类根据自己要求，可以自己选择实现的过程。
>

---
- 在子类里面允许重写（覆盖）父类的方法
- 在子类中，==使用parent访问父类中被覆盖的属性和方法==
> ==parent::construct()==
>
> ==parent::fun()==
>
**注**
> java 里面使用的是super() 调用父类的构造函数。


```
<?php
class Person {
    public $name;
    private $age;
    protected $money;

    public function __construct($name,$age,$money){
        $this->name = $name;
        $this->age = $age;
        $this->money = $money;
    }
    public function userCard(){
        echo "name->".$this->name;
       
    }

}

class Yellow extends Person{
    public function __construct($name,$age,$money){
        parent::__construct($name,$age,$money);
        // $this->name = $name;
        // $this->age = $age;
        // $this->money = $money;
    }
    // 对父类的方法进行重写
    // public function userCard(){
    //     parent::userCard();
    //     // echo $this->age; // 无法访问到。
    //     echo $this->money; // 可以访问父类protected属性。
    //     echo 1;
    // }
    // 对userCard进行重载。 
    // 重载函数不加默认值的时候 should be compatible with that of 报出 警告
    // 向重载方法 增加一个默认值。
    public function userCard($pp=null){
        // parent::userCard();
        echo $pp;
    }
    
}
// $pp = new Person("JACK",60,200);
// $pp->userCard();
$yy = new Yellow("David",25,100);
// $yy->userCard();
$yy->userCard("JACK");
echo $yy->name; // public属性继承过来了，能在子类外部访问到
// echo $yy->age; // age是父类的private属性，无法被子类外部访问，
// echo $yy->money; // money是父类的protected属性，也无法再子类外部直接访问到
?>

```

**遇到问题**
> ==PHP重载的时候，当重载函数没有默认值的时候，会报出should be compatible with that of的警告。需要增加重载时的默认值。==

> 当子类选择不重写或不重载父类的方法时，子类的所new的对象可以直接调用到父类public的方法，protected和private就不能够了。
