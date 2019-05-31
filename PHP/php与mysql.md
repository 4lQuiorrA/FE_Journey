## php与mysql
#### 数据库
> 关系型数据库 : 将数据存储到互有关联的表中，
>

> 非关系型数据库（==NOT only sql==）
>
>四大分类：
>
>键值（如：Redis）
>
>列存储数据库
>
> 文档型数据库
>
>图形数据库

---
### mysql
### 数据库增删改查
> 查询 select
>
> select * from where 条件
>
> 插入 insert
> 
>insert into '数据库表名' ('字段名','字段名','字段名') values('字段值','字段值','字段值')
>
> 更新 update
>
> update '数据库表名' set 字段名 = 要更改的字段值 where 条件
>
> 删除 delete
> delete from 数据库表名 where 条件
---
### PHP操作数据库 mysqli
> //1.
>
> ==$con = mysqli_connect('数据库名','','')== 连接数据库返回一个连接数据库的状态 可以根据这个状态是否存在判断连接是否成功。
>
>2.
> 选择数据库名
>
> ==sqli_select_DB($con,表名)==
>
>3.
> 执行sql查询
>
> ==sqli_query($con,sql语句)==
>
> ==mysqli_fetch_array== 以一个关联数组，数值索引数组，或者两者皆有的方式抓取一行结果,mysqli_fetch_array 将数据库一条一条从后台抓取，如果存在值，则将当前内容返回，反之则返回false

```
while($row = mysqli_fetch_array($result)){
    array_push($resultData,array("newsTitle"=>$row['newsTitle'],"newsContent"=>$row['newsContent']));
   
}
```


>
**注意点**
> 在PHP7.0 之后 sql_connect sql_select_DB sql_query 以及sql_close ==统统改成了sqli开头的语句==，同时，==sqli_select_DB,sqli_qyery 还将参数进行了交换==，第一个参数改成了$con ,第二个参数改成了数据库名以及sql语句。

>

### PHP操作数据库PDO


```
$dbms = "mysql"; // 数据库的类型
$host = "localhost"; // 主机名
$dbName = "test"; // 数据库名
$user = "root";
$pass = "";
$dbs = "$dbms:host=$host;dbname=$dbName";
try{
    $dbn = new PDO($dbs,$user,$pass);
    echo '连接成功';
foreach($dbn->query("select * from david") as $row){
    print_r($row);
}
}catch(PDOException $e){
    if($e){
        die('Error!');
    }
}
```



#### 顺便一提
> 由于中文在后台渲染到前端，中文会发生乱码

```
 mysqli_set_charset('utf-8',$con)
```







