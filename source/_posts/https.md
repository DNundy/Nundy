---
title: HTTPS 协议原理解析
music: false
encrypt: false
tags:
  - Network
date: 2017-8-5 14:22:30
musicID:
enc_pwd:
toc: true

---

![HTTPS协议](/assets/blogImg/https.jpg)

HTTP使用普通的非加密TCP作为其传输机制

因此，处在网络适当位置的攻击者能够截取这个机制。

而HTTPS机制课保护网络传送的所有数据的隐秘性和完整性。

<!-- more -->

## HTTPS与HTTP关系

### 共同点:

+ 它两本质上都属于应用层协议

+ 无论是否使用SSL，HTTP的请求与响应都以完全相同的方式工作

### 不同点:

+ HTTP使用普通非加密TCP作为其传输机制，使用80端口

+ HTTPS通过一种安全的传输机制——安全套接层SSL传送数据，使用443端口

### 相比较:

+ HTTPS主要可以保护网络传送的所有数据的完整性和隐密性与身份认证功能

+ 窃听风险——隐秘性；篡改风险——完整性；冒充风险——身份认证

## SSL与TLS

### SSL与TLS历史

+ 产生背景：网景公司设计了SSL协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS

+ 安全套接层协议：SSL1.0并未公布，SSL2.0公布后发现了许多漏洞，SSL3.0公布后得到了广泛采用

+ 传输层安全协议：TLS1.0是在SSL3.0的基础上改进的，目前有TLS1.0、TLS1.1、TLS1.2三个版本，通常也会将其对应的标识为SSL 3.1，SSL 3.2，SSL 3.3

+ 实际上我们现在的HTTPS都是用的TLS协议，但是由于SSL出现的时间比较早，并且依旧被现在浏览器所支持，因此SSL依然是HTTPS的代名词

### SSL与TLS主要结构

+ SSL/TLS都分别可以分为两部分：记录协议、握手协议

+ 记录协议建立在TCP之上，提供数据封装、加密等基本功能

+ 握手协议建立在记录协议之上，提供身份认证、协商秘钥等功能

+ SSL/TLS处于应用层之下、传输层之上的中间部分，具体没有明确规定

### SSL与TLS主要差异

+ 伪随机函数：TLS使用了称为PRF的伪随机函数来将密钥扩展成数据块，是更安全的方式

+ 报警代码：TLS支持几乎所有的SSLv3.0报警代码，而且TLS还补充定义了很多报警代码

+ 加密计算：TLS与SSLv3.0在计算主密值（master secret）时采用的方式不同

## HTTPS加密原理

### 对称秘钥(例如AES)

优点：

a.秘钥生成简单，加密强度高

b.计算速度快

c.基本无长度限制

缺点：对称秘钥需要双方都知道，互相传输告知过程中容易被窃取；管理海量秘钥是很麻烦、很不安全的一件事；

### 非对称秘钥(例如RSA)

优点：RSA体制非常安全，公钥所有人都可以知道，每个人保存好自己的私钥就好

缺点：

a.不是每个客户都有公钥和私钥的,如果只有服务端，那么客户给服务端请求是安全了，但是，服务端返回的信息却还是不安全，不能要求每一个客户都去准备一份公钥私钥

b.RSA计算量太大，严重降低服务器性能

c.RSA每次加密，对加密内容的长度有限制，不能超过公钥长度。比如现在常用的公钥长度是 2048 位，意味着待加密内容不能超过 256 个字节

### 结合非对称秘钥和对称秘钥(例如RSA+AES)

由客户端生成一个AES需要的随机数X，通过RSA进行传输给服务端，然后此次会话双方就使用AES算法用随机数X来加密数据。现实中往往会更加复杂，为了保证秘钥的安全性，这个随机数一定不能有规律，被别人猜到，而通信双方都不相信对方生成的这个随机数是否真的随机。

所以，往往是客户端首次发起请求时一并发送一个随机数A，服务器响应时一并返回一个随机数B，第三次客户端通过公钥加密一个随机数C，然后双方根据这三个随机数，按照前两回合商量好的算法生成一份AES需要的秘钥。注意，前两个随机数均为加密，后一个是经过加密的！

### 协商过程

clientHello

+ 支持的SSL协议版本

+ 支持的加密算法(RSA)

+ 支持的压缩算法

+ 随机数A

serverHello

+ 确定使用的SSL协议版本

+ 确定使用的加密算法(RSA)

+ 确定使用的压缩算法

+ 随机数B

+ 服务器证书(颁发机构)

+ 如果服务器也需要验证客户端，发出 CerficateRequest 消息

客户端验证

+ 验证服务器证书是否可信，若不可信，则发出警告是否继续，否则继续通信

客户端回应

+ 编码改变通知，表示之后的信息都将用双方商定的加密方法和密钥发送

+ 随机数C，该随机数使用服务器证书内包含的公钥进行加密

+ 如果服务器也需要验证客户端，附带客户端证书

服务端验证

+ 验证客户端证书是否可信，若不可信，则断开连接，否则继续通信

服务端响应

+ 编码改变通知，表示之后的信息都将用双方商定的加密方法和密钥发送

+ 前面发送的所有内容的hash值，用来供客户端校验，也表示握手阶段结束

接下来的工作实际上使用的就是普通的HTTP协议，只不过内容经过协商好的秘钥加密了

### 涉及到的数字证书

a.数字证书颁发机构

b.数字证书有效期

c.数字证书拥有者是谁

d.数字证书拥有者的公钥

d.数字证书内的数字签名

e.数字证书内的数字签名使用的算法

注意点

a.指纹：数字证书的摘要HASH；指纹算法：生成数字证书的摘要HASH所需要的算法

b.数字签名的签发过程跟公钥加密的过程刚好相反，即：用'私钥'加密，'公钥'解密

c.根CA证书都是自签名，即用自己的公钥和私钥完成了签名的制作和验证

即：指纹和指纹算法通过数字签名算法加密生成数字签名

故：因为是使用了特定的数字签名的算法加密，所以客户端可以使用颁发机构的'公钥'进行解密，进而得到指纹和指纹算法。因为得到了指纹算法，所以客户端可以再次计算生成一个指纹，与之前的指纹进行对比，查看证书是否完整，有无被篡改。

### 参考链接

+ 百度为例，关于算法部分讲的特别详细 [点我](http://blog.jobbole.com/86660/)

+ 对话形式，简单生动易理解 [点我](http://www.cnblogs.com/JeffreySun/archive/2010/06/24/1627247.html)

+ 原理剖析比较深 [点我](https://segmentfault.com/a/1190000002554673)

+ 阮一峰大师镇楼：[点我](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)

以上，转载请注明出处！