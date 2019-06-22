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



#### JAVA多层架构就要简单很多了

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/javaduocengjiagou.png)

- `po`就是`model`层
- `dao`相当于数据访问层`DAL`
- `action`相当于controller层

所以就有图的引导方向，`action`通过`service`,然后通过`po`层访问数据访问层`DAL`也就是`dao`层，最后访问数据库，`common`功能库，注入到po层

![](https://github.com/4lQuiorrA/FE_Journey/blob/master/image/node/javaduocengjiagou.png)

这幅图解释了整个java ssh的架构原型，同时也解释了angular

- 由于数据接口层离`action`太远，java就想出了控制反转(**IOC**)的方法，直接使用
- **DI（依赖注入）**是**IOC**的实现