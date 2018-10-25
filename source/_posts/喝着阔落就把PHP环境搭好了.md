---
title: 喝着阔落就把PHP环境搭好了~
music: true
encrypt: false
tags:
  - null
date: 2018-08-13 10:50:14
musicID: 29759733
enc_pwd:
toc: true
---

![孔雀东南飞](http://ozgbjelmj.bkt.clouddn.com/php%E6%9C%8D%E5%8A%A1%E5%99%A8.png)

女朋友的 Linux 环境总出问题

炒鸡生气，今天来把这个服务器给安排一下！

<!-- more -->

# 准备工作 ~ 

开始之前，把服务器系统重装一下，系统重装为 Ubuntu Server 16.04.1 LTS 64位

我的是腾讯云服务器，可以再腾讯云的控制台进行重装系统

重装之后，默认账户是`ubuntu`，密码在重装的时候会提示你进行设置

首先，通过`XShell`使用默认账户登录系统，然后我们进行设置`root`账户的密码

```
sudo passwd root
```

执行上面命令，然后输入两次你需要设置的密码就OK了

现在，root账户的密码设置好了

但是，我们还不能使用`XShell`等软件直接通过root账户登录，因为，为了安全考虑，root账户直接登录一般被禁止

此处，为了方便，我们修改一下配置文件

```
vi /etc/ssh/sshd_config
```

打开该配置文件，做如下修改：

```
- PermitRootLogin prohibit-password
+ PermitRootLogin yes
```

重启SSH服务，使配置生效

```
service ssh restart
```

现在我们就可以通过 XShell 使用 root 账户直接登录了！

# 开始安装 ~

接下来我们来搭建 LAMP（LNMP） 的环境，因为需要安装若干东西，先来更新一下源列表

```
su root
apt-get update
```

源列表保存在 `/etc/apt/sources.list`

更新好列表以后，我们开始安装：

1. 安装服务器

安装 Apache2 

```
apt-get install apache2
```

Apache 默认的WEB根目录在`/var/www/html`，如果安装成功，它会在该目录生成一个 `index.html`

该页面展示了 Apache 服务器的基本信息，可以通过访问IP地址或者域名的方式来测试

如果看到该页面，则证明安装成功。

或者 安装 Nginx

```
apt-get install nginx
```

nginx 默认 WEB 根目录和 Apache 一样，此时，访问服务器可以看到 nginx 的提示信息！证明成功

2.安装 MySql

```
apt-get install mysql-server mysql-client
```

安装过程中会提示进行设置 mysql 的 root 密码

安装完成后，可以通过如下命令进行测试登录：

```
mysql -u root -p
```

3.安装 PHP7.0

```
apt-get install php7.0
```

安装完成后，可以使用`php -v`进行查看版本信息，验证是否安装成功

到此为止，三大法宝（Apache2/Mysql/php7.0）都已经单独安装成功

接下来我们为它们建立联系

# 建立联系 ~

4.让服务器支持 php

Apache:  安装 libapache2-mod-php7.0

```
apt-get install libapache2-mod-php7.0
```

它的作用是让 Apache2 可以解析 PHP

Nginx:  修改配置文件

```
vi /etc/nginx/sites-available/default
```

去除 location ~\.php$ 的选项

5.安装 php7.0-mysql

```
apt-get install php7.0-mysql
```

它的作用是为 PHP 提供访问 Mysql 的接口

6.重启服务，使安装失效

```
service apache2 restart 或者  service nginx restart
service mysql restart
```

好了，现在基本的工作已经做完了，我们可以在根目录创建一个`phpinfo.php`文件，写上如下内容：

```
<?php echo phpinfo(); ?>
```

然后在浏览器中访问该文件，就可以查看关于 php 的所有信息了~

# 再搞个 phpmyadmin ~

最后，我们再安装一个 phpmyadmin ，方便我们操作数据库

```
apt-get install phpmyadmin
```

安装过程中会出现选项，我们选择 apache2 后点击确定。然后需要输入一下数据库 root 密码

安装完成之后，由于 phpmyadmin 默认路径在 `/usr/share/phpmyadmin` ,我们需要为其在WEB根目录创建一个符号（软）链接

```
ln -s /usr/share/phpmyadmin /var/www/html
```

对于 Apache 来说，我们还需要启用 Apache2 的 mod_rewrite 模块

```
a2enmod rewrite
```

重启 php7.0-fpm 和 apache2

```
service php7.0-fpm restart
service apache2 restart
```

这样，我们就可以通过`IP/phpmyadmin` 或者 `域名/phpmyadmin` 的方式访问 phpmyadmin 了

之后管理数据库就 So Easy ~

# 添加可执行类型 ~

最后的最后~我们再来配置一下 Apache2 或者 Nginx 的可执行类型

这个又有什么卵用呢？它可以添加 ‘可以执行php的文件类型’，我们来看一下

Apache:

打开 Apache2 配置文件

```
vi /etc/apache2/apache2.conf
```

添加如下代码：

```
AddType application/x-httpd-php .php .htm .html
AddDefaultCharset UTF-8
```

重启 Apache2

```
service apache2 restart
```

Nginx:

```
vi /etc/nginx/nginx.conf
```

再 index.html index.htm 等的后面加上 index.php

现在，我们只要在 html 代码中写 php，也可以进行执行了，Cool

OK，完毕 ~ 基础配置就这么多

# 汇报战果 ~

小可爱，过来看一下，可还满意？