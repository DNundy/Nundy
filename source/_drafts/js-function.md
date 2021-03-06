---
title 	: JavaScript中的Function
music 	: false
encrypt : false
tags 	:
  - JavaScript
date 	: 2017-10-08 15:18:00
musicID :
enc_pwd :
---

函数是只定义一次,但可能被执行或调用任意次的一段JavaScript代码.

它实际上是对象,每个函数都是Function类型的实例,而且都与其他引用类型一样具有属性和方法.

## 一.函数的定义

函数使用function关键字来定义,有函数声明和函数表达式两种形式.

函数声明使用function关键字,它有一个重要的特征'函数声明提升',意思是在执行代码之前会先读取函数声明.

函数表达式使用var关键字,它有一个特征是'变量声明提升',赋值为undefined

它两的区别在于 :

+ 函数表达式使用var只是变量声明提升了,而变量的初始化代码还在原来的位置,但是函数声明使用function,函数名称和函数体均会提前.

> 也就是说,函数定义不能出现在if语句,while循环,try/cache/finally/with或其他任何语句中
> 正是由于函数声明位置的这种限制,ECMAScript标准规范并没有将函数声明归类为真正的语句

+ 对于函数表达式来说,函数名称标识符是可选的,当没有的时候称它为匿名函数,也就是拉姆达函数.当有的时候,函数的局部作用域将会包含一个绑定到函数对象的名称,也就是该函数的名称会成为函数内部的一个局部变量.对于函数声明来说,函数名称标识符是必须的,它是一个指向函数对象的指针.

它两的相同点在于 : 创建的变量都无法通过delete删除的.