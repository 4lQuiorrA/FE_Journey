### tar 压缩，解压缩命令

> tar cvf 压缩的文件名.tar 要压缩的文件路径<br>
> tar tvf 压缩文件名          查看压缩文件<br/>
> tar xvf 压缩文件名          解压缩文件名

### grep 
**查找字符串**
> grep -i 要查找的字符串（"123"）文件名  <br>
![image](7633479D60B746FEB5ECD94987C254A3)<br/>

> grep -A 3 -i "example demo_text" 输出包括匹配和他之后的3行

![image](F4B7F85C31DA474DA8C59D70622FCF2E)<br/>

> grep -r "133" *　　查询文件夹内，包含"133"以内的所有文件

### find

**查找含有指定文件名的文件**
> find -iname "my.txt"

**查找home目录下的所有空文件**
> find ~ -empty

### ssh
**连接到远程主机**
> ssh -l 账号@ip地址

### awk

### vim 
**打开文件并跳到第10行**
> vim +10 my.txt

**以只读的模式打开文件**
> vim -R my.txt<br/>
**补充**
> 关掉并保存一个只读文件 :wq!
### diff
**比较两个文件的不同**
> diff -w 文件1 文件2

![image](D8EF2E8B1D3F45FFBBC8A496B8A3F3D0)

### sort
**将文件内容升序排序**
> sort 1.txt

**将文件降序排序**
> sort -r 2.txt

### export 
**设置全局变量**
> export ORACLE_HOME=/u01/app/oracle/product/10.2.0

### ls 

**以易读的方式显示文件大小（显示为MB,GB）**
> ls -lh 

![image](A74DBCEF8E044A389C0A63CCDBCFCC06)

**以最后修改时间升序列出文件 时间靠近今天的在最后面**
> ls -ltr 

**ls -F 显示所有文件的内容，包括文件夹**
![image](85A8EB2CC26B4B1FAB68E74B3B468C89)

> 其中* 代表可执行文件。@代表
> @代表软链接文件，软链接文件：软链接又叫符号链接，这个文件包含了另一个文件的路径名。可以是任意文件或目录，可以链接不同文件系统的文件



**ls -a 显示当前文件夹下的所有文件内容，包括隐藏文件**

**ls -r 倒序显示文件内容**

### pwd 输出当前工作目录

### cd

**cd ~返回到用户homme目录**

**cd -  切换目录到上一个目录**

**gzip**

**创建一个*.gz 文件**
> gzip  test.txt

**解压一个*.gz 文件**

> gzip -d test.txt.gz

**shutdown**

**关闭系统并立即关机**
> shutdown -h now

**10分钟后关机**
> shutdown -h +10


**重启**
> shutdowm -r now

### ftp

**连接远程ftp服务器**
> ftp IP/hostname

> mls *.html - 显示远程主机上的文件列表


### ps 查看当前进程的工具

**ps命令支持三种使用的语法格式**
- UNIX风格，选项可以组合在一起，并且选项前必须有 “-” 连字符
- BSD风格，选项可以组合在一起，并且选项前不能有“-”连字符
- GNU风格的长选项，选项前有两个“-”连字符
> 具体实现看一下操作

#### ps直接使用
![image](3A839CD7AE2A4B8AB09F9B9B23A0C5EF)

**结果默认会显示4列信息**
- PID 运行着的命令（CMD）的进程编号
- TTY 命令所运行的位置（终端）pts/0
- TIME 运行着的该命令所占用的CPU处理时间
- CMD  该进程所运行的命令

#### 显示所有进程 
**ps -a**
> 使用-a参数，-a代表all .同时加上x参数显示没有控制终端的进程

![image](0420F83DFC6440F59DB9297E10F4B896)


####　查看特定进程
