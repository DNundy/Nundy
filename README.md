#Personal Static Blog Site Backup

###站点简介
站点采用[Hexo](https://hexo.io/"爱的传送门")静态博客框架,主题采用了[Litten](http://litten.me/"爱的传送门")大神的[Yilia](https://github.com/litten/hexo-theme-yilia"爱的传送门"),它是一个简洁优雅的主题，扁平风格，个人觉得非常棒。本站点在Yilia的基础上做了适当修改！

查看具体效果请点击[Nundy](http://nundy.cn/"爱的传送门")!

------

目录介绍
===

这些文件是项目的管理等附属文件
---

+ **.deploy_git** 	：该文件夹是博客在部署到 GitHub Pages上时，插件自动创建的目录，可以删除，但是再次部署时还会生成
+ **.gitignore** 		：这是一个git的配置文件，定义了不列入git管理的内容
+ **db.json** 		：缓存文件，可以删除，之后还会生成的，标签和分类出状况时，试着删除该文件后重新部署！
+ **node_modules** 	：该文件夹是node.js的模块目录，备份时，通过.gitignore文件设置忽略了
+ **package.json** 	: 项目的配置信息，定义了项目所需要的各个模块及其版本等，在包含该文件的根目录下，直接运行“npm install”命令而不指定某个模块，npm就会安装该文件中定义的所有模块
+ **README.md**项目说明文件

######这些文件是项目的主要源码文件

+ **scaffolds** 			：该文件定义了一些生成文件时用的模板
+ **source** 	：资源文件夹，写好的文章，页面，静态文件，以及域名解析用到的CNAME文件都保存在这里
+ **themes**				：主题文件存放目录
+ **photos** 				：相册文件夹
+ **createPhotoList.js** 	：node.js脚本，遍历photos文件夹，生成照片列表list.json
+ **Deploy.bat** 			：一个简单的bat脚本，定义了部署，生成相册列表等命令。文章写好或者新增相册后双击即可完成部署，生成相册需要的文件。

------

###功能介绍

######相册功能>>>

**_原主题_**：照片托管于[Instagram](https://www.instagram.com/"爱的传送门"),这是一款很棒的移动端图片社交应用，国外非常流行，然而被我大天朝墙了。所以这个相册功能暂时是用不了咯。之前Yilla主题中关于图片的部分都是用[photoSwipe.js](http://photoswipe.com/"爱的传送门")插件处理的。

**_修改后_**：我采用了七牛云提供的图床服务。去除了photoSwipe.js插件,相册图片查看使用了[fancybox3](http://fancyapps.com/fancybox/3/"爱的传送门")插件。

**_如何使用_**：

+ Step1.将你想存为相册的图片按照一定的命名规则存到photos文件夹里面
+ Step2.修改图片外链：七牛云每个账户会生成各自的外链默认域名。如：ountlr0uu.bkt.clouddn.com,将以下代码中的外链域名更改为你的外链域名(照片处理相关的js为：yilla/source-src/js/photo.js)

```html
<a data-fancybox="images" data-caption="'+data[i].text[j]+'" href="http://ountlr0uu.bkt.clouddn.com/'+data[i].link[j]+'"><img class="lazy" src="http://ountlr0uu.bkt.clouddn.com/'+data[i].link[j]+'"/></a>
```

+ Step3.运行根目录下index.js生成list.json数据,供photo.js生成相应的链接
+ Step4.最后将图片上传到对应的七牛云空间就可以了
+ Step5.具体实现细节请点击[Hexo搭建个人博客]("别点了，博主太懒还没写！！！")

######评论功能>>>

**_原主题_**：原主题支持的评论插件还是挺多的，但是基本全部GG！Disqus被墙掉了，15年5月多说倒闭，网易云宣布2017年8月1日正式停止服务。搜狐的畅言又需要备案，自己有主机的还好，去备案一下，但是对于Github pages来说想备案都没地啊！

**_修改后_**：找了一下目前最友善的貌似就是[友言](http://www.uyan.cc/"爱的传送门")了，简单快捷，说三分钟搞定不为过。。。不过，为毛加三个‘。’呢！！！丑，对，没错,就是丑。。。个人而言，还是觉得畅言的样式符合我的口味，我的网站目前用的就是畅言，不过前面也说了畅言需要备案，额(⊙o⊙)…不说了，需要的小伙伴邮箱私聊！！！

所以呢，半路翻车的插件我已经全部去除，目前主题只留了[搜狐畅言](http://changyan.kuaizhan.com/"爱的传送门")！赞

**_如何使用_**：注册好搜狐畅言评论系统后，你会得到两个值changyan_appid和changyan_conf,在yilla主题的配置文件_config.yml中在对应的位置填好。在需要评论功能的页面开头出加上comments: true。OK，这样就大工告成了。

######音乐功能>>>

**_新增_**：不折腾不舒服星人，虽说是静态博客，但是万一有一篇需要抒情的文章呢，来点音乐多爽嘞！So，我找到了我们的大大大网易云音乐，看看网易云多贴心，一键点击生成外链播放器，复制代码，粘贴就可使用。但是，这多麻烦是不，每次都得复制代码。懒才是第一生产力，因为懒，才发明了更多有效率的工具，人类才能进步嘛！

所以呢，就简单优化了一下，现在，哪篇文章需要音乐，那么在开头部分加上music: 'true'就可以开启，通过指定 musicID: 12345678 来指定是哪首音乐了 (musicID 获取：在网易云里面右击歌曲有一个复制链接，链接里面就可以看得到歌曲ID了)。呐，现在就方便很多了不是！

######字体图标>>>

**_修改_**：作为一个爱听歌爱抖腿的骚年，我多想在侧边栏添加一个音乐的图标。研究一番发现，原作者是使用的阿里图标库[Iconfont](http://www.iconfont.cn/"爱的传送门")，相信很多朋友也在里面下载过图标。作者挑选了一些图标，统一添加到项目中，然后下载至本地，中网代码文件先必须添加好'.soff .ttf .svg .eot'这四个文件，然后在iconfont.css文件里面的就是对这些图标的定义了，使用时只要把对应图标的class名字加在代码里就好了，简单易维护，兼容性超强，去除冗余，只有项目需要的！参考原作者的主题，该项目的字体也进行了修改。

######CDN加速与HTTPS绿色小锁头>>>

**_cloudflare_**：它是美国的一家提供免费CDN服务，分布式域名解析等服务的企业。重点是它的CDN服务是免费的，主机在国外的小伙伴可以选择，国内的话建议使用360网站卫士、加速乐、安全宝、百度云加速公司提供的服务，他们都是在一定的流量范围内免费使用。缺点是国内这几家网站需要你备案以后才可以使用，而Github pages没法备案。亲测:Github Pages使用cloudflare的CDN，个人觉得不是很稳定，还不如不使用。所以，仅仅一个静态博客，也就去除了这个CDN加速。

另外，cloudflare里面可以免费让你的网站加一个绿色的小锁头，就是HTTPS啦。但是它并不是给你的网站添加了证书，而是通过中间代理的方式实现的，因为Github pages没法去安转证书(哭，买域名送的一年货真价实的https证书都用不了)！不过使用这个功能，也是需要先将你的DNS服务器修改为cloudflare提供的DNS服务器(DNS服务器可以在购买商提供的域名管理页面查看)，由于前面说的个人感觉不是很稳定的原因，所以也去除了。。。其实加上是很nice的！有兴趣的小伙伴可以去尝试一下哦！

######百度、Google站点信息统计>>>

+ Step1 分别注册百度 Google 统计账号，复制统计代码，粘贴到Step2里面的script内

+ Step2 yilla/layout/_partial/baidu-analytics.ejs和google-analytics.ejs里面的script标签

+ Step3 在yilla/_config.yml内添加 baidu_analytics: 'true'和google_analytics: 'true'

+ Step4 这样在可以在管理页面查看到你网站的PV、UV、平均访问时长等信息了。

######AES算法加密文章>>>

+ Step1 

---

简单概述了文件夹作用，和改动的一些功能。其余详细问题可以通过查看源代码注释、Issues或者访问我的主页[Nundy](http://nundy.cn/"爱的传送门")评论留言等方式解决！