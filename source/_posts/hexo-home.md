---

title     : Hexo小窝de自我介绍
date      : 2017-07-10 20:46:49
music 		: 'true'
musicID 	: 27836179
toc 		  : true
tags      : 
			    - Hexo 博客

---

![Hexo小窝de自我介绍](http://ozgbjelmj.bkt.clouddn.com/Hexo%E5%B0%8F%E7%AA%9D%E7%9A%84%E8%87%AA%E6%88%91%E4%BB%8B%E7%BB%8D.jpg)

Hi , 终于等到你，还好我没放弃！

我是 Nundy，来自陕北那旮沓，你别看我可爱，嘿嘿，其实我的功能也不赖哦！

<!-- more -->

---

阮一峰大大曾经说过，博客一般会经历三个阶段：

第一阶段，刚接触Blog，觉得很新鲜，试着选择一个免费空间来写。

第二阶段，发现免费空间限制太多，就自己购买域名和空间，搭建独立博客。

第三阶段，觉得独立博客的管理太麻烦，最好在保留控制权的前提下，让别人来管，自己只负责写文章。

惊觉和我的心理历程完全一样 !

从最早的CSDN开始，到之后搬到WordPress，最后安家于Github Page。终于，有了一片温暖的，属于自己的小天地！

一路走来不敢说有多难，但也算有些许不易。走走停停，付出了很多，也从中学到了很多。

到现在，成为了自己喜欢的模样！

---

看着镜子中的自己，真的有些恍惚！就像 Litten 说的一样

>它不是qq空间，不是新浪博客，不是豆瓣小站，也不是贴吧。
>它更像是属于自己的一块小小的领地，因而我满足于这种归属感。我愿在上面安静劳作！

是的，一路的折腾，只是为了寻找心中的那份归属感！

就以此稍稍纪念我逝去的时光，也为了帮助其他还在成长路上的Bloger~

>一个人至少拥有一个梦想，有一个理由去坚强。
>心若没有栖息的地方，到哪里都是在流浪！

# 我的个人目录

```folder
deploy_git    ：博客在部署到 GitHub Pages上时，插件自动创建的目录，可以删除，但是再次部署时还会生成
node_modules    ：node.js的模块存放目录，部署备份时，通过.gitignore文件设置忽略
photos      ：震惊，博客空间竟然惊现私密相册？
scaffolds     ：生成Post、Page等时用的模板文件
source      ：资源文件夹，文章，页面等静态文件，及域名解析用的CNAME文件都保存在这里
themes      ：主题文件存放目录
.gitignore  ：git的配置文件，定义了不列入git管理的文件
_config.yml     ：Hexo博客的统一配置信息
createPhotoList.js  ：node.js脚本，遍历photos文件夹，生成照片列表list.json
db.json   ：缓存文件，可以删除。但再次部署后还会生成，标签、分类出现缓存问题时，可以考虑删除该文件后重新部署
devServer.bat     ：开启localhost:4000服务器的BAT脚本
devServer.bat     ：部署博客到Github的BAT脚本
package.json    : 博客项目的配置信息，定义了项目所需的各个模块及其版本信息等
README.md     ：项目说明文件

```

# 我的主题目录

```folder
languages     ：设置了语言文件信息
layout      ：用于布局的ejs文件
node_modules    ：node.js的模块存放目录，部署备份时，通过.gitignore文件设置忽略
source      ：最终生成的目标文件夹，可以删除，由source-src打包生成
source-src    ：源代码文件夹
.babelrc    : babel的配置文件
.editorconfig   ：帮助开发者在不同的编辑器和IDE之间定义和维护一致的代码风格
.eslintignore   ：定义了eslint忽略文件
.eslintrc.js    ：在Vue-Cli脚手架根目录下,导出一个包含配置的对象
.gitattributes  ：用于设置文件的对比方式,常用非文本文件
.gitignore    ：git的配置文件，定义了不列入git管理的文件
_config.yml     ：yml数据格式的主题配置信息
package.json    ：主题项目的配置信息，定义了项目所需的各个模块及其版本信息等
webpack.config.js   ：webpack的配置信息
README.md   ：项目说明文件
```

# 我可以展示相册哦

以前的时候，我的照片托管于 Instagram,它是一款很棒的移动端图片社交应用，国外非常流行，然而现在它被我大天朝墙了，我的人生曾一度陷入了灰暗。

后来，我千辛万苦又把图片放在了七牛云。

终于，又可以爆照了。毕竟，有图有真相嘛！

还有，之前我的图片都是用 photoSwipe.js 处理的。后来呢，我也不知道为什么，可能是移情别恋了，也可能是累觉不爱了，我重新选择了酷炫的杀马特 [尼古拉斯·fancybox3](http://fancyapps.com/fancybox/3/"爱的传送门")。对此，我也只能说：曾经爱过！

如果你也想像我一样展示照片，或许你可以这么做，首先，你需要如下准备：

+ Step1: Hexo根目录下创建一个photos文件夹用来存放每一个相册，其中每一个相册文件夹又用来存放该相册所包含的图片。如下：

```folder
-photos
  -序号1-年-月-日
    -照片描述信息.[ext]
    -照片描述信息.[ext]
  -序号2-年-月-日
    -照片描述信息.[ext]
    -照片描述信息.[ext]
  ......

```

+ Step2 修改图片外链：七牛云为每个账户的不同空间都生成了各自的外链默认域名。如：ountlr0uu.bkt.clouddn.com,将以下代码中的外链域名更改为你的外链域名(文件目录为：yilla/source-src/js/photo.js)

```html
<a data-fancybox="images" data-caption="'+data[i].text[j]+'" href="http://ountlr0uu.bkt.clouddn.com/'+data[i].link[j]+'"><img class="lazy" src="http://ountlr0uu.bkt.clouddn.com/'+data[i].link[j]+'"/></a>
```

+ Step3.运行根目录下createPhotoList.js生成list.json数据,以供photo.js生成相应的链接(该链接就是照片在七牛云空间中实际存储的链接)
+ Step4.最后将图片上传到对应的七牛云空间就可以了
+ Step5.总结来说就是先将照片适当命名并放置于指定文件夹，设置链接信息，最后上传照片到对应的空间就OK了！

# 来找我聊天吧

作为一名合格的多动症患者来说，我当然很喜欢聊天了。So，评论功能必须得有。

原主题支持的评论插件嘛还是挺多的，但是，怎么说呢，挺惨的，基本全部GG掉了！

Disqus被墙掉了，15年5月多说倒闭，网易云宣布2017年8月1日正式停止服务。搜狐的畅言又需要备案，自己有主机的也还好，去备案一下也没什么，但是对于Github pages的宝宝真的是有苦没处到，想备案都没地啊！

找了好久，最后发现，目前最友善的貌似就是 '友言' 了，简单快捷，三分钟搞定不为过。。。

不过，为毛加三个‘。’呢？？？ 丑，对，没错,就是丑，最后还是没忍心下手。。。

个人觉得还是畅言的样式符合我的口味，我的网站呢目前用的就是畅言，不过前面也说了，畅言是需要备案滴，额(⊙o⊙)，不说了，有人查水表，我去开门了！

所以呢，半路翻车的插件我已经全部去除，目前主题只留了[搜狐畅言](http://changyan.kuaizhan.com/"爱的传送门")！赞。

扯了这么多，到底怎么用呢？首先，你需要先注册好搜狐畅言评论系统，然后你就会得到两个值 changyan_appid 和 changyan_conf

然后在yilla主题的配置文件_config.yml中在对应的位置填好该信息。在需要评论功能的页面开头出加上comments: true。OK，这样就大工告成了。

打开网站，发现评论功能已经可以使用了。但是，这时你会发现一个Bug，表情按钮点击不了，检查一下源代码，不难发现原因是被左侧的div层覆盖了，那么接下来我们修复一下这个Bug.

+ Step1 打开themes/yilla/source-src/css/comment.scss

+ Step2 添加如下代码：

```css
#SOHUCS {
  padding:0px 30px 0px 46px !important;
  min-height: 20px;
}
```

+ Step3 查看网站，Bug已经修复！

# 音乐功能当然是少不了的

虽然我是老年静态博客，但是我还是蛮喜欢写抒情文章的嘛，适当的再来点BGM多爽嘞！

So，我找到了我们的大大大网易云音乐，看看网易云多贴心，一键生成外链播放器，复制代码，粘贴就可使用多体贴是不！

但是，总感觉还是很麻烦，每次都得复制代码，写文章的心情都被破坏了。

所以呢，当然是义不容辞的简单优化了一下咯。

现在，哪篇文章需要音乐，只需要在开头部分加上music: 'true'就可以开启，通过指定 musicID: 12345678 就可以选择音乐了 (musicID 获取：在网易云里面右击歌曲有一个复制链接，链接里面就可以看得到歌曲ID了)。

呐，现在就方便很多了不是！

# 图标也不能太Low

音乐都有了，再在侧边栏加一个音乐图标那岂不是美滋滋。

嘿嘿，研究一番发现，原作者使用的阿里图标库[Iconfont](http://www.iconfont.cn/"爱的传送门")的图标，相信很多朋友也在里面下载过图标吧。

我们挑选一些图标，统一添加到一个项目中，然后选择下载至本地，代码目录中添加好'.soff .ttf .svg .eot'这四个文件，通过@font-face属性引入到需要改字体的CSS文件内，下载下来的iconfont.css文件里面有对这些图标的编码定义。

这样，以后使用时只要把图标的class名字加在需要使用该字体的css代码里就好了。

简单易维护，兼容性超强，去除冗余，在原有基础上我更改添加了少许图标，完美！

# CDN加速与HTTPS绿色小锁头

cloudflare是美国一家免费提供CDN服务、分布式域名解析等服务的企业。

咳咳，这些概念不是重点，重点是它的CDN服务是免费的。个人建议呢，主机在国外的小伙伴可以选择，国内的话建议使用360网站卫士、加速乐、安全宝、百度云加速公司提供的服务，他们都是在一定的流量范围内免费使用。

对，没错，一定范围内都是免费的，对于写博客来说绰绰有余有木有！良心企业有木有！

当然，缺点也是有的，国内这几家网站都需要备案以后才可以使用，呵呵，累觉不爱！！！

Github pages宝宝们笑而不语！！！

个人体会：Github Pages使用cloudflare的CDN，额。。。貌似觉得不是很稳定，还不如不使用。所以，仅仅一个静态博客，也就去除了这个CDN加速。

另外，一个有趣的功能，cloudflare可以免费让你的网站加一个绿色的小锁头，就是HTTPS啦。

但是它并不是给你的网站真正添加了证书，而是通过中间代理的方式实现的

就算是真的安装证书，Github pages也没法去安转(哭，买域名送的一年货真价实的SSL证书都用不了)，好气哦！

不过想要使用这个功能，也需要先在你的域名管理页面将DNS服务器修改为cloudflare提供的DNS服务器，由于前面说的cloudflare个人感觉不是很稳定的原因，所以也去除了该功能。。。强迫症表示有股莫名的忧桑！

当然，加上装个逼也是很nice的！有兴趣的小伙伴可以去尝试一下哦！

# 百度、Google站点信息统计

作为堂堂一站之长，当然希望能掌握站内的种种数据啦，所以，我选择了百度站长分析工具

+ Step1 注册百度统计账号，复制统计代码，粘贴到Step2里面的script内

+ Step2 yilla/layout/_partial/baidu-analytics.ejs里面的script标签

+ Step3 在yilla/_config.yml内添加 baidu_analytics: 'true'

最后，打开百度分析控制台，嘿嘿，尽收眼底！

# AES算法加密文章

装逼可以，但万一泄露了个人住址，那可是要被人堵门口的！

所以，安全工作一定要做好嘛~

+ Step1 安装hexo-encrypt插件

```cmd
npm install hexo-encrypt --save
```

+ Step2 在想要加密的文章头部加入以下代码

```hexo
encrypt: true
enc_pwd: xxxxxx
```

OK，开始你的装逼之旅吧！被人打了可别说是我教你的哦，合作愉快！

当然，该插件也支持帮你将图片上传到七牛云空间。具体请访问开源项目 [Encrypt](https://github.com/edolphin-ydf/hexo-encrypt) 查看

# 不蒜子站点访客统计

额。这玩意说白了就是装逼用的，展示一下自己的人气值。。。凭个人喜好添加！

当然，我这么正经，那肯定不是装逼用的了，我只是喜欢折腾罢了！（手动微笑）

+ Step1 打开themes/你的主题/layout/_partial/footer.ejs添加如下代码

```javascript
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

+ Step2 脚本文件下面选择性的添加如下HTML结构：

```html
<span id="busuanzi_value_site_pv"></span>(单个用户点击n次，记录n次-本站总访问量)
<span id="busuanzi_value_site_uv"></span>(单个用户点击n次，记录1次-本站访客数)
<span id="busuanzi_value_page_pv"></span>(单个用户点击1篇文章，记录1次阅读量-本文总阅读量)
```

# RSS订阅

另外，例如订阅这类型的基础工作还是要做的嘛，万一哪个小姐姐看上我，想订阅我的文章嘞~

+ Step1 安转hexo-generator-feed和hexo-migrator-rss

```cmd
npm install hexo-generator-feed --save
npm install hexo-generator-rss  --save
```

+ Step2 在根目录的_config.yml下添加如下信息

```yml
rss : /atom.xml
```

+ Step3 清楚缓存文件，重新生成静态文件发现根目录下会多出atom.xml文件！成功

# 独立域名

+ Step1 使用ping命令来获取Github Pages的ip地址，如：

```cmd
ping DNundy.github.io
```

+ Step2 购买域名，解析到获取的ip地址处

+ Step3 在source/下新建一个文件为CNAME的文件(**注意**：该文件没有后缀)

+ Step4 CNAME文件填写你要解析的域名，如：

```CNAME
nundy.cn
```

# 关于网站收录

这个东西，对于一个网站来说其实是很重要的。但是Github pages百度爬虫是爬取不到的

你可以将自己的网站提交到码云或者GitCafe，然后将其当做主站提交给百度就可以了

再爱折腾的人也会心累的，所以，折腾不动了就没有再去修改，以后说不定那天心血来潮再继续完善吧！

现在，就让我的这个小窝安安静静的呆着吧。

# 拓展一点

在写的过程中碰到了一个小问题，简单拓展一下，算是小技巧吧

如何在windows下如何新建 "只有后缀，没有文件名" 的文件?

+ Method1 在后缀后面再添加一个".",例如创建".gitingore"文件则输入

```file
.gitingore.
```

+ Method2 使用echo命令,例如创建".gitingore"文件则输入

```cmd
echo text>.gitingore
```

OK，暂时就找到了上面两种方法！

---

我是Nundy，有什么问题欢迎大家留言或者邮箱!