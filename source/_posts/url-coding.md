---

title 		: URI 的故事
date 		: 2017-10-25 15:22:22
music 		: false
musicID 	: 
encrypt 	: false
enc_pwd 	: 
toc 		: true
tags 		: 
			- Network
---
![uri-coding](http://ozgbjelmj.bkt.clouddn.com/uri-coding.png)

一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。

这是因为网络标准RFC 1738做了硬性规定

<!-- more -->

>"...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()",[not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."
>"只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'()",[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"

这意味着，如果URL中有汉字，就必须编码后使用。然而RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定,这导致"URL编码"成为了一个混乱的领域。

## 编码的四种情况

+ 网址路径中包含汉字 ： 使用UTF-8编码（猜测：浏览器厂商可能默认都为UTF-8编码，故其实是遵循浏览器默认编码）

+ 查询字符串包含汉字 ： 不统一，包括操作系统默认编码和UTF-8（猜测：浏览器默认编码）编码

+ 表单参数的中文编码 ： 首先遵循表单的accept-charset属性，其次遵循页面整体的charset属性（猜测：之后应该依次为浏览器、操作系统默认的编码，IE低版本可能是跳过浏览器编码，直接采用操作系统编码）

+ Ajax请求的中文编码 ： IE浏览器遵循的是操作系统的默认编码，其它为UTF-8

总结 ：无论哪种情况，优先级从高到低依次为：accept-charset、charset、浏览器默认、操作系统默认。（编码情况与浏览器厂商、版本、页面的具体设置等多方面因素影响，不可一概而论，具体情况应当具体考虑，如总结有误，欢迎批评指出）

## 编码的三种方式

+ escape()(不提倡)

+ encodeURI()

+ encodeURIComponent()

### 一、escape()、unescape()

规则：除了ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码。在\u0000到\u00ff之间的符号被转成%xx的形式，其余符号被转成%uxxxx的形式

注意：

1、不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值

2、（没理解这点）无论网页的原始编码是什么，一旦被Javascript编码，就都变为unicode字符。也就是说，Javascipt函数的输入和输出，默认都是Unicode字符

3、escape()不对"+"编码，但是网页在提交表单的时候，如果有空格，则会被转化为+字符。服务器处理数据的时候，会把+号处理成空格。

### 二、encodeURI()、decodeURI()

规则：除常见的符号以外，对其他一些在网址中有特殊含义的符号" ; / ? : @ & = + $ , # "，不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%

注意：

1、encodeURI()是Javascript中真正用来对URL编码的函数

2、它不对单引号'编码

### 三、encodeURIComponent()、decodeURIComponent()

规则：它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。"; / ? : @ & = + $ , # " 这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。具体编码方法都是一样的。

---

在具体编写代码时，犯过一个错误：将encodeURI(),写成了encodeURL();

所以此处牵扯出了URI-URL-URN的区别这个问题

## URI-URL-URN区别

![URI-URL-URN](http://ozgbjelmj.bkt.clouddn.com/URI-URL-URN.webp)

>统一资源标识符（URI）提供了一个简单、可扩展的资源标识方式。URI规范中的语义和语法来源于万维网全球信息主动引入的概念，万维网从1990年起使用这种标识符数据，并被描述为“万维网中的统一资源描述符”。

### 示例1

如果是一个人，我们会想到他的姓名和住址。

URL类似于住址，它告诉你一种寻找目标的方式（在这个例子中，是通过街道地址找到一个人）。要知道，上述定义同时也是一个URI。

相对地，我们可以把一个人的名字看作是URN；因此可以用URN来唯一标识一个实体。由于可能存在同名（姓氏也相同）的情况，所以更准确地说，人名这个例子并不是十分恰当。更为恰当的是书籍的ISBN码和产品在系统内的序列号，尽管没有告诉你用什么方式或者到什么地方去找到目标，但是你有足够的信息来检索到它。所有的URN都遵循如下语法（引号内的短语是必须的）

```URI
< URN > ::= "urn:" < NID > ":" < NSS >
```

其中NID是命名空间标识符，NSS是标识命名空间的特定字符串。

关于URL：

> URL是URI的一种，不仅标识了 Web 资源，还指定了操作或者获取方式，同时指出了主要访问机制和网络位置。

关于URN：

> URN是URI的一种，用特定命名空间的名字标识资源。使用URN可以在不知道其网络位置及访问方式的情况下讨论资源。

### 示例2

如果有：

```URI
http://bitpoetry.io/posts/hello.html#intro
```

我们开始分析

```URI
http://
```

是定义如何访问资源的方式。另外

```URI
bitpoetry.io/posts/hello.html
```

是资源存放的位置，那么，在这个例子中，

```URI
#intro
```

是资源。

URL是URI的一个子集，告诉我们访问网络位置的方式。在我们的例子中，URL应该如下所示：

```URI
http://bitpoetry.io/posts/hello.html
```

URN是URI的子集，包括名字（给定的命名空间内），但是不包括访问方式，如下所示：

```
bitpoetry.io/posts/hello.html#intro
```

就是这样。现在你应该能够辨别出URL和URN之间的不同。

如果你忘记了这篇文章的内容，至少要记住一件事：URI可以被分为URL、URN或两者的组合。如果你一直使用URI这个术语，就不会有错。

参考文献：

1、[haorooms](http://www.haorooms.com/post/js_escape_encodeURIComponent)

2、[石锅拌饭](http://blog.csdn.net/sgbfblog/article/details/37996081)

3、[阮一峰](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)

4、[伯乐在线](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651552631&idx=1&sn=9a05fd22a1d93551c960717270e9bb01&chksm=8025acb6b75225a05c4bc454e3a163faf2a5dbceb4c65ceddfeb288f08de137cddefbdb2fafd&mpshare=1&scene=1&srcid=1026IkHjCnbghTE0J0nluNZg#rd)