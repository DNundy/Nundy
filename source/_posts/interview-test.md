---
title: 学长de面试题走一波
music: false
encrypt: false
tags:
  - 神的记事本
date: 2017-11-13 12:29:44
musicID:
enc_pwd:
toc: true
---

![学长面试题走一波](http://ozgbjelmj.bkt.clouddn.com/interview-test.jpg)

永远也不要忘记能够笑的坚强 (๑╹◡╹)ﾉ"""

不想看书，不想Coding，刷一波题吧！

<!-- more -->

## The first day !

### 从输入 URL到页面加载发生了什么？

#### 浏览器查找域名对应的 IP

（1） 浏览器搜索自己的 DNS 缓存；

（2） 搜索操作系统中的 DNS 缓存；

（3） 操作系统向它的本地 DNS 服务器（LDNS）发送一个 DNS 查询报文（包含需要被转换的主机名），LDNS 查询自己的 DNS 缓存，若查找失败则发起一个迭代 DNS解析请求进行分级查询：

+ 由于根域名服务器的 NS 记录和 IP 记录一般不会变化，所以内置在 DNS 服务器中，本地 DNS 服务器将报文转发到所有的根域名服务器，询问顶级域名服务器的 NS 记录，最先回复的根域名服务器被缓存，以后只向这台服务器发送请求, 根域名服务器向本地 DNS 服务器返回对应的顶级域名服务器的 NS 记录和 IP 记录列表

+ 本地 DNS 服务器向这些所有 TLD 服务器（顶级域名服务器）发送查询报文，TLD 服务器以次级域名服务器的 NS 记录及其 IP 地址作为响应

+ 本地 DNS 服务器向这些所有 SLD 服务器（次级域名服务器）发送查询报文，SLD 服务器以主机名的 IP 地址作为响应。

（4） LDNS 将得到的 IP 地址返回给操作系统，同时自己也将 IP 缓存起来

（5） 操作系统将 IP 地址返回给浏览器，同时自己也将 IP 缓存起来

（6） 至此，浏览器已经得到了域名对应的 IP

备注：

（1） 在一个请求链中，当某 DNS 服务器接收到一个 DNS 回答时，它能将该回答中的信息缓存在本地存储器中

（2） 每一级域名都有自己的 NS 记录，NS 记录指向该级域名的域名服务器。这些服务器知道下一级域名的各种记录。所谓"分级查询"，就是从根域名开始，依次查询每一级域名的
NS 记录，直到查到最终的 IP 地址

（3） 主机名.次级域名.顶级域名.根域名 对应 host.sld.tld.root，根域名.root 对于所有域名都是一样的，所以平时是省略的，主机名也称三级域名

（4） 根域名下有子域，才有顶级域名；顶级域名下有子域，才有对应的次级域名；次级域名下有主机，才有主机名

#### 建立 TCP 连接（三次握手）

（1）客户端向 IP 地址对应的服务器发送一个建立连接的请求

（2）服务器接到请求后发送同意连接的信号

（3）客户端接到同意连接的信号后，再次向服务器发送确认信号，至此，客户端和服务器建立了连接

备注：在客户和服务器上分别有一个套接字与该连接相关联，客户端和服务器进程就可以通过套接字接口（socket，进程通过套接字接口向网络发送报文和从网络接收报文）访问 TCP

#### 发送 HTTP 请求

（1）浏览器根据 URL 内容生成 HTTP 请求，请求中包含文件的位置、请求的方式、请求中客户端向服务端传递的数据、请求的一些附加信息等，浏览器向该服务器发送一个 HTTP
请求报文

（2）服务器接到请求后，从其中的存储器（内存或磁盘）检索出对象并封装到 HTTP 响应报文，向客户发送 HTTP 响应报文，若请求成功，响应报文中会包含客户端请求的 HTML
文件

#### 浏览器解析并渲染页面

浏览器边解析边渲染。首先浏览器解析 HTML 文件构建 DOM 树，解析 CSS 文件构建CSSOM 树，接着在 DOM 树和 CSSOM 树的基础上构建渲染树，一旦渲染树构建完成，浏
览器就开始布局和显示（绘制‘paint’）页面元素。

若解析过程中，需要请求外部资源如图像、JS 文件等，除了 JS 文件，浏览器将异步发送HTTP 请求以获得相应资源，不会影响 HTML 文档进行加载，若是 JS 文件，HTML 会挂起渲染过程，等到重新请求获得的 JS 文件加载完毕并解析执行完毕后，才会继续 HTML 的渲染，JS 的解析由浏览器的 JS 解析引擎完成（涉及 JS 的单线程运行特性和事件循环执行机制：一个主线程+一个任务队列）

#### 断开连接（四次挥手）

（1）主机向服务器发送断开连接的请求（断开）

（2）服务器发送确认收到请求的信号（确认）

（3）服务器向主机发送断开通知（断开）

（4）主机接到断开通知后断开连接并反馈一个确认信号，服务器收到确认信号后断开连接（确认）

#### 关于加载顺序

（1） 当浏览器获得一个 html 文件, 会"自上而下"加载, 并在加载过程中进行解析渲染. 下载和渲染是同时进行的

（2） 在渲染到页面的某一部分时, 其上面到所有部分都已经下载完成(并不是说所有关联元素都已经下载完)

（3） 如果加载过程中遇到外部 css 文件, 浏览器会发出一个请求, 来获取 css 文件.

（4） 样式表在下载完成后, 将和以前下载的所有样式表一起进行解析, 解析完成后, 将对此前所有元素(含以前已经渲染的)重新进行渲染

（5）遇到图片资源, 浏览器会发出请求获取图片资源. 这是异步请求, 并不会影响 html 文档进行加载

（6）当文档加载过程中遇到 js 文件, html 文档会挂起渲染(加载解析渲染同步)的线程, 不仅要等待文档中js文件加载完毕, 还要等待解析执行完毕, 才可以恢复html文档的渲
染线程. 即 js 的加载不能并行下载和解析

原因: js 有可能会修改 DOM, 比如 document.write. 这意味着, 在 js 执行完成前, 后续所有资源的下载可能是没有必要的, 这是 js 阻塞后续资源下载的根本
原因. 所以一般将外部引用的 js 文件放在body的结束标签前

（7） 虽然 css 文件的加载不影响 js 文件的加载,但是却影响 js 文件的执行, 即使 js 文件内只有一行代码, 也会造成阻塞

原因: 可能会有: var width = $('#id').width(). 这意味着, 在 js 代码执行前, 浏览器必须保证 css 文件已下载和解析完成。这也是 css 阻塞后续 js 的根本原因。

办法：当 js 文件不需要依赖 css 文件时，可以将 js 文件放在头部 css 的前面。当然除了，link标签这种形式，内联style这种样式定义，在考虑阻塞时也要考虑

（8）js,css 中如果有重定义, 后定义函数将覆盖前定义函数

#### 主要解析过程

（1） 浏览器解析 html 代码, 创建一棵 DOM 树

（2） 浏览器解析 CSS 代码, 创建 CSSOM 树（CSS Object Model）

CSSOM 树是附在 DOM 结构上的样式的一种表示方式，与 DOM 树的呈现方式一样，只是每个节点都带上样式，包括明确定义的和隐式继承的

CSS 是一种渲染阻塞资源，需要解析完毕后才能进入生成渲染树的环节，CSS 并不像 HTML 能够执行部分并显示，因为 CSS 具有继承属性，后面定义的样式会覆盖或修改前面的样式。所以 CSS 也会阻塞脚本。

（3） JavaScript 解析并执行

（4） 构建 DOM 树和 CSSOM 树后，下一步就是构建一棵渲染树(rendering tree)

DOM 树完全与 html 标签一一对应, 但是渲染树会忽略掉不需要渲染的元素, 比如head, display: none 的元素等

（5） 生成布局，基于 HTML 页面的 meta viewport 标签生成布局

（6） 绘制

### 对浏览器内核的理解

主要分成两部分：渲染引擎和 js 引擎。最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

#### 渲染引擎（The rendering engine）：

职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，也可以借助插件显示一些其他类型的数据，比如使用 PDF 阅读器插件可以显示 PDF 格式数据。

#### 渲染主流程

渲染引擎获得所请求的文档后 => 解析 html 以构建 DOM 树 => 加载并加息 CSS，构建 CSSOM 树 => 构建 render 树 => 布局 render 树 => 绘制 render 树

详细过程：渲染引擎开始解析 html，并将标签转化为内容树中的 DOM 节点，接着解析 CSS文件或者 style 中的样式，构建 CSSOM 树，CSSOM 树以及 DOM 中的可见性指令将被用来构建另一棵树，即 render 树，Render 树由一些包含有颜色和大小等属性的矩形组成，它们将被按照正确的顺序显示到屏幕上。Render 树构建好了之后，将会执行布局过程，它将确定每个节点在屏幕上的确切坐标。再下一步就是绘制，即遍历 render 树，并使用 UI后端层绘制每个节点。

#### JS 引擎

解析和执行 javascript 来实现网页的动态效果。

### GET 和 POST 的区别

（1） GET 是向服务器发索取数据的一种请求，而 POST 是向服务器提交数据的一种请求，在FORM 表单中 Method 默认为 GET，实质上两者只是发送机制不同，并不是一个取一个发

（2） GET 请求的数据会暴露在 URL，POST 把请求的数据放置在 HTTP 请求的主体中，且数据格式不限

（3） 对数据长度的限制：特定的浏览器和服务器对 URL 的长度有限制，各个服务器对 POST 提交的数据大小有限制，Apache、IIS 都有各自的配置，一般比 GET 能够传输的数据多

（4） 对数据类型的限制：GET 只允许 ASCII 字符，POST 没有限制，也允许二进制数据

（5） POST 的安全性比 GET 高

（6） GET 形式的 URL 对搜索引擎更加友好，有助于提高搜索引擎排名，其他网站和用户可以链接到 get 形式的 url，无论用户的访问，还是搜索引擎的收录而相应提高了页面排名，能够直接或间接提高网站浏览量；POST 使用的 URL 有时会阻止爬虫和搜索引擎的访问

（7） GET 的 URL 可以收藏为书签且参数会保留在浏览器历史中，POST 的不能收藏且参数不会保存在浏览器历史中

（8） 后退/刷新：GET 无害，对于 POST 数据会被重新提交（浏览器应该告知用户数据会被重新提交）

#### 何时使用 POST

（1） 请求的结果有持续性的副作用，例如，数据库内添加新的数据

（2） 当使用 GET 进行表单提交会让 URL 过长时

（3） 要传送的数据不是采用 7 位的 ASCII 编码

#### 何时使用 GET

（1） 请求是为了查找资源，HTML 表单数据仅用来帮助搜索

（2） 请求的结果无持续性的副作用

（3） 收集的数据及表单内的输入字段名称的总长不超过 1024 个字符（为了兼容 IE，IE支持的最大长度是 2083 个字符）

#### GET 相对 POST 的优势

+ 请求中的 URL 可以被手动输入、被存在书签或者历史记录中、可以被搜索引擎收录

+ 可以重复的交互，比如查询、读取，用 GET

+ 不可重复的交互，比如创建/修改记录，用 POST，因为 POST 不会被缓存，所以浏览器不会多次提交

#### 其他一些 HTTP 请求方法

+ HEAD 与 GET 相同，但只返回 HTTP 报头，不返回文档主体。

+ PUT 上传指定的 URI 表示。

+ DELETE 删除指定资源。

+ OPTIONS 返回服务器支持的 HTTP 方法。

+ CONNECT 把请求连接转换到透明的 TCP/IP 通道。

### 如何加快页面加载速度

减少 HTTP 访问次数（适当使用 DataURL、CSS Sprite）、CDN、minify、服务器增加缓存或浏览器本地缓存、CSS 放前面 JS 放后面、图片压缩等。

### 如果一个元素 absolute，没设 left、top，位置是哪里

相当于 static 的默认位置。左上角之所以不准确，是因为如果父元素在本元素之前如果还有子元素的话，那就不是左上角了。

### HTTP 状态码

状态码是由 3 位数组成，表示服务器对 HTTP 请求的响应状态，第一个数字定义了响应的类别，且有五种可能取值：

+ 1XX Informational 信息性状态码，表示接受的请求正在处理

+ 2XX Success 成功状态码，表示请求正常处理完毕

+ 3XX Redirection 重定向状态码，表示需要客户端需要进行附加操作

+ 4XX Client Error 客户端错误状态码，表示服务器无法处理请求

+ 5XX Server Error 服务器错误状态码，表示服务器处理请求出错

#### 常用状态码及对应的意思

200 204 206（Range, Content-Range）

301（Location，更新书签） 302（不更新书签） 303 304（If-Match, If-Modified-Since,If-None-Match, If-Unmmodified-Since, If-Range） 307

400（语法错误） 401（WWW-Authenticate, Authorization） 403 404

500 503（超负荷或正在停机维护，Retry-After）

302 指定使用原有请求方法，303 指定使用 GET 方法，307 不指定；

401 Unauthorized未被授权：该状态码表示发送的请求需要有通过HTTP认证(Basic认证，Digest 认证)的认证信息。返回含有 401 的响应，必须在头部包含 WWW-Authenticate以指明服务器需要哪种方式的认证。当客户端再次请求该资源的时候，需要在请求头中的Authorization 包含认证信息。