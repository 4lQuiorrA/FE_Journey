### 条件查询 WHERE 配合函数查询


```
select count(*) FROM db_test.t_student 
WHERE gender='M'


```

**count()**
> 查询数据条数。

```
select min(birthday) ,t_student.* from db_test.t_student
where gender="M"
```

**min()**
> 查询符合where条件中出生年最小值得人（即年龄最大得人）

**注意**
> t_student.*   为固定写法，当我们使用了函数查询得时候，同时我们又需要全部数据得信息得时候 这个时候不能继续使用"*",必须使用t_student.*来查询到。

**max**
> 查询符合where条件中最大值得数据

**sum**

> 求数据得和

**sqrt**
> 求平方跟

**first()**
> 求符合条件得第一条数据

**last()**

> 求符合条件的最后一条数据

**group by **

> 按符合条件得分组

**now()**

```
select now() 

// 打印执行这个条件的时候的dateTime
```
**rand()**

> 获取随机数

```
select rand()
// 返回的是0-1之间的数字。
```

**concat()**
> 连接字段

```
select concat(id,name)from db_test.t_student;

select concat(id,"",name) from db_test.t_student;
```