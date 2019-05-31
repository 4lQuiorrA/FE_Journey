## PHP
> 超文本预处理器- 一种通用开源脚本语言
>
> **==脚本语言 - 不需要编译==** 

### xampp
> 打开Apache遇到问题443端口被占用
>
> ==解决方法 打开apache的httpd-ssl.conf 将里面所有关于443端口的都改掉==
>
> 根据网友的智慧，改成4430 ->成功

> xampp开启的检测:
>
> 进入到浏览器，输入localhost 能进到对应的apache欢迎界面

**注意**
> 将php项目文件夹放到xampp文件夹下面的htdocs文件夹里面，这样才能找到该文件

### php
> 代码标识 对比于script


```
<?php
自己的代码
?>
```
> 变量标识符$ 类比于var
>
> 举个栗子  ==$a = 1==
>
> ==小工具 isset('xxx') 检测当前变量有没有被定义==
>
**PHP与JS不同的地方**

```
//1.
if(false){
    $a = 1;
}
echo $a;

// 在JS中，能够打印一个undefined  
// 在PHP中，有块级作用域该处会报错。
//2.
$a = 1;
function test(){
echo $a;
}
test()
// 该处也会报错 
// 直接在函数外面定义的$a 不是全局变量
// 需要通过global定义才是全局变量
// 比如 global $a
// $GLOBALS['a']  全项目文件都生效
$GLOBALS['a']  = 1
function test(){
    echo $GLOBALS['a'] //1
}
// define
define('a','haha');
function test(){
    echo a;
}
```
### include 与 require
> 引入某个文件中的代码/文本/标记到当前文本
>
> include_once require_once 和inclue require完全一样，不一样的是once会检查当前文件是否被包含过，如果包含过那就不会再去引入了

```
// a.php
$GLOBALS['a'] = 'test'

//index.php
 <?php
    require_once('a.php' );
    // include_once('a.php');
    echo $GLOBALS['a'];  // test
    
    ?>
```
**require和include的差别**
> ==如果当前文件代码出现问题的时候，那无论require或者include都会直接报错代码是不会执行完的。==
>
> ==如果当前代码仅仅是引入文件的找不到的时候，require是不会继续执行完全的，直接报错。include的会执行完当前代码，并且打印完，最后也会把自己的错误打印出来。==
---

### array
> 定义数组
>
> $testArray = array('1','2','3')   
---
### session （会话）
> 在把一个页面的信息存储到session 里面时或者使用session的时候，需要先启动会话 ==**session_start()**==

> 对session会话内容的存储或者使用，一般使用$_SESSION()
>
> $_ 一般指的是系统指定的命令 $_SESSION()
```
// a.php
<?php
session_start();
$_SESSION('a')=1

?>

//index.php

<?php 
session_start();
$_SESSION['a'] = 2;

?>

```
---
### 字符串拼接

> $a = 'David'
>
> $str = '.$a.' ==从js中的+改成了.==
### 请求
> $_GET('XXX') 获取前端GET请求的数据
>
> $_POST('XXX') 获取前端POST请求的数据
>
> $_REQUEST('xxx')获取前端请求的数据 (无论是GET还是POST)


```
<?php
$username = $_REQUEST('username');
echo $username;
?>
```








