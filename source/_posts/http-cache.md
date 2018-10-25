---
title: HTTP 缓存详解
music: false
encrypt: false
tags:
  - Network
date: 2017-8-1 20:33:31
musicID:
enc_pwd:
toc: true

---

![cache-title](http://ozgbjelmj.bkt.clouddn.com/cache-title.jpg)

在前端开发中，性能一直都是被大家所重视的一点，然而判断一个网站的性能最直观的就是看网页打开的速度。

其中提高网页反应速度的一个方式就是使用缓存。

一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷。

<!-- more -->

## 缓存分类

web缓存分为很多种：数据库缓存、代理服务器缓存、CDN缓存，以及浏览器缓存。

其中浏览器缓存也包含很多内容： HTTP 缓存、indexDB、cookie、localstorage等

本文主要讨论浏览器缓存中的 HTTP 缓存 （HTTP缓存属于协议层，而 H5 新增的 localstorage 和数据库缓存属于应用层缓存）

## HTTP 缓存概述

HTTP 缓存由header参数控制。

主要可以分为 强制缓存 和  协商缓存

强制缓存： Expires 和 Cache-Control

协商缓存： Last-modefied 和 ETag

## HTTP 缓存详解

### 一、Expires（HTTP 1.0）

缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点（绝对时间）

也就是说，Expires=max-age + 请求时间（当时服务器的时间）

缺点：由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源，同时，还导致客户端与服务端的时间不一致，致使缓存失效。

### 二、Cache-Control（HTTP 1.1）

1、max-age（单位为s）指定设置缓存最大的有效时间，定义的是时间长短。

当浏览器向服务器发送请求后，在max-age这段时间里浏览器就不会再向服务器发送请求了（相对时间）

2、s-maxage（单位为s）同max-age，只用于共享缓存（比如CDN缓存）。

比如，当s-maxage=60时，在这60秒中，即使更新了CDN的内容，浏览器也不会进行请求。也就是说max-age用于普通缓存，而s-maxage用于代理缓存。如果存在s-maxage，则会覆盖掉max-age和Expires。

3、public 指定响应会被缓存（发送请求的客户端、代理服务器等等），并且在多用户间共享。

4、private 响应只能被单个用户（可能是操作系统用户、浏览器用户）缓存，是非共享的，不能被代理服务器缓存。

5、no-cache 强制所有缓存了该响应的用户，在使用已缓存的数据前，发送带验证器的请求到服务器。不是字面意思上的不缓存

因此有的时候只设置no-cache防止缓存还是不够保险，还可以加上private指令，将过期时间设为过去的时间。

6、no-store 绝对禁止缓存，一看就知道如果用了这个命令当然就是不会进行缓存啦～每次请求资源都要从服务器重新获取。

7、must-revalidate指定如果页面是过期的，则去服务器进行获取。这个指令并不常用，就不做过多的讨论了。

### 三、Last-modified + If-Modified-Since

当浏览器再次进行请求时，会向服务器传送If-Modified-Since报头，询问Last-Modified时间点之后资源是否被修改过。

如果没有修改，则返回码为304，使用缓存

如果修改过，则再次去服务器请求资源，返回码和首次请求相同为200，资源为服务器最新资源。

### 四、ETag + If-None-Match

根据实体内容生成一段hash字符串，标识资源的状态，由服务端产生

第一次响应时，服务器响应头设置 ETag属性，值为该hash字符串

第二次请求时，浏览器请求头设置 If-None-Match属性，值为该hash字符串

服务器端检查 ETag 值是否变化来返回 ‘304 使用缓存’ 或者 ‘200 和 新文件’

优点：使用ETag可以解决Last-modified存在的一些问题：

a、某些服务器不能精确得到资源的最后修改时间，这样就无法通过最后修改时间判断资源是否更新

b、如果资源修改非常频繁，在秒以下的时间内进行修改，而Last-modified只能精确到秒

c、一些资源的最后修改时间改变了，但是内容没改变，使用ETag就认为资源还是没有修改的。

## 总结

说了这么多的属性，那么整体来看，它的具体流程是这样的，如下图：

![缓存流程](http://ozgbjelmj.bkt.clouddn.com/cache.webp)

还有关于 Cache-Control 的属性使用，如下图：

![缓存流程](http://ozgbjelmj.bkt.clouddn.com/cache-control.webp)

## 参考资料

[浏览器缓存篇](https://github.com/laizimo/zimo-article/issues/24?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

[HTTP 缓存机制一二三](https://zhuanlan.zhihu.com/p/29750583?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

[前端需要懂得缓存机制](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/README.md?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

[大公司里怎样开发和部署前端代码](https://www.zhihu.com/question/20790576)