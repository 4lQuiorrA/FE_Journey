### mysql 表
 - Tables  表
 - Views 视图
 - Stored Producedures 存储过程。
 - Function 函数。
 

#### 创建数据库表

**数据类型**
> INT 整型，VARCHAR 长度可变的字符型。DATE DATETIME(年月日时分秒) TIME（时分秒）TIMESTAMP(时间戳) CHAR(定长字符)

```
CREATE TABLE `db_test`.`t_student`(
id INT AUTO_INCREMENT NOT NULL COMMENT '',
name VARCHAR NOT NULL COMMENT '',
birthday DATE NOT NULL COMMENT '',
gender CHAR NOT NULL COMMENT '男性 M 女性 F',
classId VARCHAR NOT NULL COMMENT ''

)


```