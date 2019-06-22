#### 最经典的MVC框架

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/MVC.png)

#### .net多层架构

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/netduocengjiagou.png)

这个是一个完整的`.net`项目应有的项目目录

- `IDAL`是整个项目的最高抽象接口层，`SQLSeverDAL`和`DALFactory`同时实现了`IDAL`
- `DBUtility` 实现了 `SQLServerDAL`，同时使用`Model`写的数据模型，为访问数据库中的内容提供了方法
- `BLL`使用`webService`和使用`DALFactory`,`DALFactory`数据时访问数据的缓存`DataCache`
- `webController`实现`BLL`对`website`网页界面进行控制

下面的图是对整个目录的一个功能的介绍

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/duocengjiajieshi.png)