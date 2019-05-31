### mySql 入门

#### 工具 MYSQL Workbench
> 工具下载 [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/) 拉到最下面==MySQL Community Edition (GPL)==

#### 工具界面
> server Status可以查看数据库的使用情况。

#### 创建数据库。
> 命名规则db_数据库名。
> 
> 默认字符集 一般来说使用 utf8-default collection

```
// 创建数据库语句

CREATE SCHEMA  `db_test` DEFAULT CHARCTER SET utf8;
// 所有的mysql语句最后面都必须增加";" 否则mysql数据库可能会不执行这段语句。
```
**切换数据库**
```
// 切换数据库
use 数据库名;
```
**命令行操作数据库**


```
// 登录mysql数据库
mysql -u 登录名（一般指root） -p

```
**显示数据库表明**

```
show databases;
// 出现3个系统数据库，不能修改
information_schema
mysql
performance_schema

```
