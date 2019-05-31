### Linux开发环境初准备
**官网：www.kernel.org**
> 建议centOS

> 下载CentOS安装盘镜像<br/>
- 分为图形界面和非图形界面，图形界面是对资源的一种消耗，建议直接使用非图形界面

![image](8E4634C5E1F6404C9A52CEA0D958F6C2)

**安装CentOS**
- 网络适配器：网络连接，不能使用nat，要使用桥接
- 处理器 一般是给2个内核就够用了
- 磁盘文件，需要单独使用一个文件存放，否则虚拟机使用中产生的文件，容易散落
- 安装信息摘要中，1.安装位置点进去，点完成。2.关掉KDUMP。3.配置网络主机名，打开连接
- root密码为弱密码的时候，需要点两下完成-根用户。一般会创建一个普通用户


### 一开始使用的指令(比较常用的命令)

> 首先查看当前的IP地址   ip addres  查看当前虚拟机的IP地址

**会出现当前虚拟机IP地址不存在的情况**
- 判断当前问题1.当前虚拟机是否选择桥接2.看网卡的使用情况是否为active 如果是inactive的情况，则需要重启网卡
> ifdowm ens33 关闭网卡协议 ifup ens33 启动网卡协议
**网卡配置位置 /etc/sysconfig/network-scripts   找到你对应的网卡协议 如ens33->ifcfg-ens33**

> ssh 命令 用于用户加密登录<br/>
> ssh david@192.168.0.103   账号/服务器ip地址<br/>
> 忘记密码，需要进去单用户模式去更改


> scp 命令 scp命令用于Linux之间复制文件和目录
scp 文件路径 用户账号名/服务器ip地址:放置到的文件名  
> scp ./jquery.js david/192.168.0.103:/home    **千万不能忘记:**
### 文件

> pwd 查看当前所在的路径<br>
> mount 挂载（？）啥意思呢？<br/>
> cat 查看文件<br/>
> yum 比较重要的命令，用户linux去安装一些软件入node<br/>
> systemctl 查看当前服务 
 - systemctl status nginx 查看nginx服务的状态
 - systemctl stop nginx 关闭nginx服务
 - systemctl start nginx 启动nginx服务
 - reload
 **指令缩写的标准，去掉其中的元音字母**<br>
> pm2 管理进程，用于维护进程 实现多进程
### 必须要知道的网络知识
> 端口 http默认使用80 https默认使用443端口
### 安装必要linux文件
**安装NodeJS**
> yum安装https/rpm.nodesource.com/
- 添加官方数据源  curl -sL https://rpm.nodesource.com/setup_11.x | bash -
- yum 命令安装 yum install -y nodejs

**安装XAMPP**
**https://www.apachefriends.org/index.html下载到linux版本的xampp**
