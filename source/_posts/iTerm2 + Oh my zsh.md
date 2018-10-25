---
title: iTerm2 + Oh my zsh 最佳实践
music: false
encrypt: false
tags:
  - Mac
  - iTerm2
  - Oh my zsh
date: 2018-10-22 11:39:18
musicID:
enc_pwd:
---

使用 iTerm2 作为终端，zsh + oh my zsh 定制个性主题，Powerline 改造终端状态栏。

终极 DIY ，打造舒适终端 ~

<!-- more -->

#### 简介

1、iTerm2是Terminal的替代品，是一款比较小众的软件，比Terminal优秀太多了。 下载官网为`http://www.iterm2.cn/`，下载后直接安装即可。iTerm2可以设置主题，支持画面分隔、各种快捷键。

2、shell 种类：shell的类型有很多种，linux下默认的是`bash`，虽然bash的功能已经很强大，但对于以懒惰为美德的程序员来说，bash的提示功能不够强大，界面也不够炫，并非理想工具。

3、zsh 介绍：而zsh的功能极其强大，只是配置过于复杂，起初只有极客才在用。后来，有个穷极无聊的程序员可能是实在看不下去广大猿友一直只能使用单调的bash, 于是他创建了一个名为`oh-my-zsh`的开源项目...自此，只需要简单的安装配置，小白程序员们都可以用上高档大气上档次，狂拽炫酷吊炸天的`zsh`。

4、oh-my-zsh: Oh My Zsh是一款社区驱动的命令行工具，正如它的主页上说的，Oh My Zsh 是一种生活方式，它基于zsh命令行，提供了主题配置，插件机制，已经内置的便捷操作。

5、Powerline简介： 它是vim、zsh、bash、tmux、IPython、Awesome、bar、fish、lemonbar、pdb、rc、shell、tcsh、wm、i3 和Qtil 中的一个状态栏插件。 它给程序提供了状态栏，并使程序更好看，用Python 写成。它的使用依赖于一个字体库

命令提示：

1、查看自己系统的默认 shell, 使用以下命令:

```
echo $SHELL
```

2、查看已安装的所有 shells

```
cat /etc/shells
```

#### 准备工作

1、iTerm2: 可以直接去官网下载：https://www.iterm2.com/

2、zsh: 设置 zsh 为默认 shell

```
chsh -s /bin/zsh
```

3、安装 oh my zsh

```
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```

4、安装 Powerline

```
pip install powerline-status
```

如果没有 pip指令，请使用以下指令安装

```
sudo easy_install pip
```

5、安装 powerline 字体库

```
git clone https://github.com/powerline/fonts.git
cd fonts
./install.sh
```

#### 配置工作

1、设置配色：item2/preferences/profiles/colors/ 的 color presets 选项，选择solarized dark 主题

2、设置字体：item2/preferences/profiles/text/ 的 font 选项，选择 Meslo LG M Regular for powerline

3、设置主题：

```
vi ~/.zshrc

- ZSH_THEME="robbyrussell"
+ ZSH_THEME="agnoster"

source ~/.zshrc
```

4、设置指令高亮

```
cd ~/.oh-my-zsh/custom/plugins/
git clone git://github.com/zsh-users/zsh-syntax-highlighting.git
vi ~/.zshrc

+ plugins=( zsh-syntax-highlighting )
```

```

5、命令补全

```
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-autosuggestions
vi ~/.zshrc

+ plugins=( zsh-autosuggestions )
```

5、缩短前缀，如 xxx@xxx

```
vim ~/.oh-my-zsh/themes/agnoster.zsh-theme
```

将里面的build_prompt的prompt_context自由修改

6、由于配置了 zsh 的字体，导致VSCode终端有部分乱码，

打开设置，搜索 font.family ，同item2一样设置为 'Meslo LG M for Powerline' 就解决了