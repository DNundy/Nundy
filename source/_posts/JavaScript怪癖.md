---
title: 我希望自己尽早知道的7个 JavaScript 怪癖
music: false
encrypt: false
tags:
  - JavaScript
date: 2017-11-25 16:48:28
musicID:
enc_pwd:
toc: true
---

![JavaScript怪癖](http://ozgbjelmj.bkt.clouddn.com/javascript%E6%80%AA%E7%99%96.png)

如果对你来说 JavaScript 还是一门全新的语言，或者你是在最近的开发中才刚刚对它有所了解，那么你可能会有些许挫败感。

任何编程语言都有它自己的怪癖（quirks）—— 然而，当你从那些强类型的服务器端语言转向 JavaScript 的时候 ，你会感到非常困惑。

我就是这样！当我在几年前做全职 JavaScript 开发的时候，我多么希望关于这门语言的许多事情我都能尽早地知道。

我希望通过本文中分享的一些怪癖能让你免于遭受我所经历过的那些头疼的日子！

<!-- more -->

本文并非一个详尽的列表，只是一些取样，目的是抛砖引玉，并且让你明白当你一旦逾越了这些障碍，你会发现 JavaScript 是多么强大。

我们会把焦点放在下面这些怪癖上：

+ 1.相等

+ 2.点号 vs 方括号

+ 3.函数上下文

+ 4.函数声明 和 函数表达式

+ 5.具名 和 匿名函数

+ 6.自调用函数表达式

+ 7.typeof vs object.ptototype.toString

### 相等

因为 C# 的缘故我习惯于用==运算符来做比较。

具有相同值的值类型（以及字符串）是相等的，反之不然。指向相同引用的引用类型是相等的，反之也不然。

（当然这是建立在你没有重载==运算符或者GetHashCode方法的前提下）当我知道JavaScript有==和===两种相等运算符时，令我惊诧不已。

我所见过的大多数情况都是使用 == ，所以我如法炮制。然而，当我运行下面的代码时JavaScript并没有给我想当然的结果：

```js
var x = 1;

if(x == "1") {
    console.log("YAY! They're equal!");
}
```

呃……这是什么黑魔法？整型数1怎么会和字符串”1”相等？

在JavaScript里有相等（equality ==）和恒等（strict equality ===）。

相等运算符会先会先把运算符两边的运算元强制转换为同种类型，然后再进行恒等比较。所以上面例子中的字符串”1”会先被转换成整数1，然后再和我们的变量x进行比较。

恒等不会进行强制类型转换。如果运算元是不同类型的（就像整型数1和字符串”1”）那么他们就是不相等的：

```js
var x = 1;

// 对于恒等，首先类型必须一样
if(x === "1") {
    console.log("Sadly, I'll never write this to the console");
}

if(x === 1) {
    console.log("YES! Strict Equality FTW.")
}
```

你可能已经开始为各种不可预知的强制类型转换担忧了，它们可能会在你的应用中让真假混乱，导致一些bug，而这些bug你很难从代码中看出来。

这并不奇怪，因此，那些有经验的JavaScript开发者建议我们总是使用恒等运算符。

### 点号 vs 方括号

你可能会对JavaScript中用访问数组元素的方式来访问一个对象的属性这种形式感到诧异，当然，这取决于你之前使用的其他语言：

```js
// getting the "firstName" value from the person object:
var name = person.firstName;

// getting the 3rd element in an array:
var theOneWeWant = myArray[2]; // remember, 0-based index
```

然而 ，你知道我们也能用方括号来引用对象的成员吗？例如：

```js
var name = person["firstName"];
```

那这有什么用呢？可能大部分时间你还是使用点号，然而有些为数不多的情况下，方括号给我们提供了一些点号方式无法完成的捷径。

比如，我可能会经常把一些大的switch语句重构成一个调度表（dispatch table），像下面这样：

```js
var doSomething = function(doWhat) {
    switch(doWhat) {
        case "doThisThing":
            // more code...
        break;
        case "doThatThing":
            // more code...
        break;
        case "doThisOtherThing":
            // more code....
        break;
        // additional cases here, etc.
        default:
            // default behavior
        break;
    }
}
```

它们能被转换成下面这样：

```js
var thingsWeCanDo = {
    doThisThing      : function() { /* behavior */ },
    doThatThing      : function() { /* behavior */ },
    doThisOtherThing : function() { /* behavior */ },
    default          : function() { /* behavior */ }
};

var doSomething = function(doWhat) {
    var thingToDo = thingsWeCanDo.hasOwnProperty(doWhat) ? doWhat : "default"
    thingsWeCanDo[thingToDo]();
}
```

当然，使用switch本身并没有什么错（并且，在大多数情况下，如果你对迭代和性能很在意的话，switch可能比调度表要好）。

然而，调度表提供了一种更好的组织和扩展方式，并且方括号允许你在运行时动态地引用属性。

### 函数上下文

已经有很多不错的博客里解释过JavaScript中的this所代表的上下文

然而，我还是明确地决定把它加到我“希望自己尽早知道的事”的清单里。

在代码的任意地方明确this所代表的东西是什么并不困难——你只需要记住几条规则。

然而，我之前读过的那些关于这点的解读只能增添我的困惑，因此，我尝试用一种简单的方式来表述：

+ 第一，开始时假设它是全局的

默认情况下，this引用的是全局对象（global object），直到有原因让执行上下文发生了改变。

在浏览器里它指向的就是window对象（或者在node.js里就是global）。

+ 第二，方法内部的this

如果你有个对象中的某个成员是个function，那么当你从这个对象上调用这个方法的时候this就指向了这个父对象。例如：

```js
var marty = {
    firstName: "Marty",
    lastName: "McFly",
    timeTravel: function(year) {
        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
    }
}

marty.timeTravel(1955);
// Marty McFly is time traveling to 1955
```

你可能已经知道你可以通过创建一个新的对象，来引用marty对象上的timeTravel方法。

这确实是JavaScript一个非常强大的特性——能让我们把函数应用到不止一个目标实例上：

```js
var doc = {
    firstName: "Emmett",
    lastName: "Brown",
}

doc.timeTravel = marty.timeTravel;
```

那么，我们调用doc.timeTravel(1885)会发生什么事呢？

```js
doc.timeTravel(1885);
// Emmett Brown is time traveling to 1885
```

呃……再一次被黑魔法深深地刺伤了。

其实事实也并非如此，还记得我们前面提到过的当你调用一个方法，那么这个方法中的this将指向调用它的那个父对象。

握紧你德罗宁（DeLoreans）跑车的方向盘吧，因为车子变重了。

（译注：作者示例代码的参考背景是一部叫《回到未来》的电影，Marty McFly 是电影里的主角，Emmett Brown 是把DeLoreans跑车改装成时光旅行机的博士，所以marty对象和doc对象分别指代这两人。而此时this指向了doc对象，博士比Marty重，所以……我一定会看一下这部电影。 ）

当我们保存了一个marty.TimeTravel方法的引用并且通过这个引用调用这个方法时到底发生了什么事呢？我们来看一下：

```js
var getBackInTime = marty.timeTravel;
getBackInTime(2014);
// undefined undefined is time traveling to 2014
```

为什么是“undefined undefined”？！为什么不是“Marty McFly”？

让我们问一个关键的问题：当我们调用getBackInTime函数时，它的父/拥有者对象是谁呢？

因为getBackInTime函数是存在于window上的，我们是把它当作函数（function）调用，而不是某个对象的方法（method）。

当我们像上面这样直接调用一个没有拥有者对象的函数的时候，this将会指向全局对象。David Shariff对此有个很妙的描述：

>无论何时，当一个函数被调用，我们必须看方括号或者是圆括号左边紧邻的位置，如果我们看到一个引用（reference），那么传到function里面的this值就是指向这个方法所属于的那个对象，如若不然，那它就是指向全局对象的。

因为getBackInTime的this是指向window的，而window对象里并没有firstName和lastName属性，这就是解释了为什么我们看到的会是“undefined undefined”。

因此，我们就知道了直接调用一个没有拥有者对象的函数时结果就是其内部的this将会是全局对象。

但是，我也说过我们的getBackInTime函数是存在于window上的。我是怎么知道的呢？

除非我把getBackInTime包裹到另一个不同的作用域中，否则我声明的任何变量都会附加到window上。

下面就是从Chrome的控制台中得到的证明：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_1.png)

现在是讨论关于this诸多重点之一 “绑定事件处理函数” 的最佳时机。

+ 第三，异步调用的方法内部的this

我们假设在某个button被点击的时候我们想调用marty.timeTravel方法：

```js
var flux = document.getElementById("flux-capacitor");
flux.addEventListener("click", marty.timeTravel);
```

当我们点击button的时候，上面的代码会输出“undefined undefined is time traveling to [object MouseEvent]”。

什么？！好吧，首先，最显而易见的问题是我们没有给timeTravel方法提供year参数。

反而是把这个方法直接作为一个事件处理函数，并且，MouseEvent被作为第一个参数传进了事件处理函数中。

这个很容易修复，然而真正的问题是我们又一次看到了“undefined undefined”。

别失望，你已经知道为什么会发生这种情况了（即使你没有意识到这一点）。

让我们修改一下timeTravel函数，输出this来帮助我们获得一些线索：

```js
marty.timeTravel = function(year) {
    console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
    console.log(this);
};
```

现在我们再点击button的时候，应该就能在浏览器控制台中看到类似下面这样的输出：

在方法被调用时第二个console.log输出了this，它实际上是我们绑定的button元素。

感到奇怪么？就像之前我们把marty.timeTravel赋值给一个getBakInTime的变量引用一样，此时的marty.timeTravel被保存为我们事件处理函数的引用，并且被调用了，但是并不是从“拥有者”marty对象那里调用的。

在这种情况下，它是被button元素实例中的事件触发接口调用的。

那么，有没有可能让this是我们想要的东西呢？当然可以！这种情况下，解决方案非常简单。

我们可以用一个匿名函数代替marty.timeTravel来做事件处理函数，然后在这个匿名函数里调用marty.timeTravel。同时这样也让我们有机会修复之前丢失year参数的问题。

```js
flux.addEventListener("click", function(e) {
    marty.timeTravel(someYearValue);
});
```

点击button会看到像下面这样的输出：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_2.png)

成功了！但是为什么成功呢？思考一下我们是怎么调用timeTravel方法的。

第一次的时候我们是把这个方法的本身的引用作为事件处理函数，因此它并不是从父对象marty上调用的。

第二次的时候，我们的匿名函数中的this是指向button元素的，然而当我们调用marty.timeTravel时，我们是从父对象marty上调用的，所以此时这个方法里的this是marty。

+ 第四，构造函数里的this

当你用构造函数创建一个对象的实例时，那么构造函数里的this就是你新建的这个实例。例如：

```js
var TimeTraveler = function(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
    // Constructor functions return the
    // newly created object for us unless
    // we specifically return something else
};

var marty = new TimeTraveler("Marty", "McFly");
console.log(marty.firstName + " " + marty.lastName);
// Marty McFly
```

使用Call，Apply和Bind

从上面给出的例子你可能已经猜到了，通过一些语言级别的特性是允许我们在调用一个函数的时候指定它在运行时的this的。

让你给猜对了。call和apply方法存在于Function的prototype中，它们允许我们在调用一个方法的时候传入一个this的值。

call方法的签名中先是指定this参数，其后跟着的是方法调用时要用到的参数，这些参数是各自分开的。

```js
someFn.call(this, arg1, arg2, arg3);
```

apply的第一个参数同样也是this的值，而其后跟着的是调用这个函数时的参数的数组。

```js
someFn.apply(this, [arg1, arg2, arg3]);
```

我们的doc和margy对象自己能进行时光旅行（译注：即对象中有timeTravel方法）

然而爱因斯坦（译注：Einstein，电影中博士的宠物，是一只狗）需要别人的帮助才能进行时光旅行，所以现在让我们给之前的doc对象（就是之前把marty.timeTravel赋值给doc.timeTravel的那个版本）添加一个方法，这样doc对象就能帮助einstein对象进行时光旅行了：

```js
doc.timeTravelFor = function(instance, year) {
    this.timeTravel.call(instance, year);
    // alternate syntax if you used apply would be
    // this.timeTravel.apply(instance, [year]);
};
```

现在我们可以送爱因斯坦上路了：

```js
var einstein = {
    firstName: "Einstein",
    lastName: "(the dog)"
};
doc.timeTravelFor(einstein, 1985);
// Einstein (the dog) is time traveling to 1985
```

我知道这个例子让你有些出乎意料，然而这已经足以让你领略到把函数指派给其他对象调用的强大。

这里还有一种我们尚未探索的可能性。

我们给marty对象加一个goHome的方法，这个方法是个让marty回到未来的捷径，因为它其实是调用了this.timeTravel(1985)：

```js
marty.goHome = function() {
    this.timeTravel(1985);
}
```

我们已经知道，如果把 marty.goHome 作为事件处理函数绑定到button的click事件上，那么this就是这个button。

并且，button对象上也并没有timeTravel这个方法。

我们可以用之前那种匿名函数的办法来绑定事件处理函数，再在匿名函数里调用marty对象上的方法。不过，我们还有另外一个办法，那就是bind函数：

```js
flux.addEventListener("click", marty.goHome.bind(marty));
```

bind函数其实是返回一个新函数，而这个新函数中的this值正是用bind的参数来指定的。

如果你需要支持那些旧的浏览器（比如IE9以下的）你就需要用个bind方法的补丁（或者，如果你使用的是jQuery，那么你可以用$.proxy;另外underscore和lodash库中也提供了_.bind）。

有一件事需要注意，如果你在一个原型方法上使用bind，那它会创建一个实例级别的方法，这样就屏蔽了原型上的同名方法，你应该意识到这并不是个错误。

### 函数声明 vs 函数表达式

在JavaScript主要有两种定义函数的方法（而ES6会在这里作介绍）：函数声明和函数表达式。

函数声明不需要var关键字。事实上，正如 Angus Croll 所说：“把他当作变量声明的兄弟是很有帮助的”。例如：

```js
function timeTravel(year) {
    console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
}
```

上例中名叫timeTravel的函数不仅仅只在其被声明的作用域内可见，而且对这个函数自身内部也是可见的（这一点对递归函数的调用尤为有用）。

函数声明其实就是命名函数，换句话说，上面的函数的name属性就是timeTravel。

函数表达式是定义一个函数并把它赋值给一个变量。一般情况下，它们看起来会是这样：

```js
var someFn = function() {
    console.log("I like to express myself...");
};
```

函数表达式也是可以被命名的，只不过不像函数声明那样，被命名的函数表达式的名字只能在该函数内部的作用域中访问（译注：上例中的代码，关键字function后面直接跟着圆括号，此时你可以用someFn.name来访问函数名，但是输出将会是空字符串

而下例中的someFn.name会是”iHazName”，但是你却不能在iHazName这个函数体之外的地方用这个名字来调用此函数）：

```js
var someFn = function iHazName() {
    console.log("I like to express myself...");
    if(needsMoreExpressing) {
        iHazName(); // the function's name can be used here
    }
};
// you can call someFn() here, but not iHazName()
someFn();
```

函数表达式和函数声明的讨论远不止这些，除此之外至少还有提升（hoisting）。

提升是指函数和变量的声明被解释器移动到包含它们的作用域的顶部。

### 具名和匿名函数

基于我们刚刚讨论的，你肯定猜到所谓的匿名函数就是没有名字的函数。

大多数JavaScript开发者都能很快认出下例中第二个参数是一个匿名函数：

```js
someElement.addEventListener("click", function(e) {
    // I'm anonymous!
});
```

而事实上我们的marty.timeTravel方法也是匿名的：

```js
var marty = {
    firstName: "Marty",
    lastName: "McFly",
    timeTravel: function(year) {
        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
    }
}
```

因为函数声明必须有个名字，只有函数表达式才可能是匿名的。

### 自调用函数表达式

自从我们开始讨论函数表达以来，有件事我就想立马搞清楚，那就是自调用函数表达式（ the Immediately Invoked Function Expression (IIFE)）。

但简而言之，它就是一个没有赋值给任何变量的函数表达式，它并不等待稍后被调用，而是在定义的时候就立即执行。

下面这些浏览器控制台的截图能帮助我们理解：

首先让我们输入一个函数表达式，但是不把它赋值给任何变量，看看会发生什么：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_4.png)

无效的JavaScript语法——它其实是一个缺少名字的函数声明。想让它变成一个表达式，我们只需用一对圆括号把它包裹起来：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_5.png)

当把它变成一个表达式后控制台立即返回给我们这个匿名函数（我们并没有把这个函数赋值给其他变量，但是，因为它是个表达式，我们只是获取到了表达式的值）

然而，这只是实现了“自调用函数表达式”中的“函数表达式”部分。

对于“自调用”这部分，我们是通过给这个返回的表达式后面加上另外一对圆括号来实现的（就像我们调用任何其他函数一样）。

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_6.png)

“但是等等！Jim，我记得我以前在哪看到过把后面的那对圆括号放进表达式括号里面的情况。”

你说得对，这种语法完全正确（因为Douglas Crockford 更喜欢这种语法，才让它变得众所周知）：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_7.png)

这两种语法都是可用的，然而我强烈建议你读一下对这两种用法[有史以来最好的解释](https://github.com/airbnb/javascript/issues/21#issuecomment-10203921)。

OK，我们现在已经知道什么是IIFE了，那为什么说它很有用呢？

它可以帮助我们控制作用域，这是JavaScript中很重要的一部分！

marty对象一开始是被创建在一个全局作用域里。这意味着window对象（假定我们运行在浏览器里）里有个marty属性。

如果我们JavaScript代码都照这个写法，那么很快全局作用域下就会被大量的变量声明给填满，污染了window对象。

即使是在最理想的情况下，这都是不好的做法，因为把很多细节暴露给了全局作用域，那么，当你在声明一个对象时对它命名，而这个名字恰巧又和window对象上已经存在的一个属性同名，那么会发生什么事呢？这个属性会被覆盖掉！

比如，你打算建个“阿梅莉亚·埃尔哈特（Amelia Earhart）”的粉丝网站，你在全局作用域下声明了一个叫navigator的变量，那么我们来看一下这前后发生了些什么

（译注：阿梅莉亚·埃尔哈特是一位传奇的美国女性飞行员，不幸在1937年，当她尝试全球首次环球飞行时，在飞越太平洋期间失踪。当时和她一起在飞机上的导航员（navigator）就是下面代码中的这位佛莱得·努南（Fred Noonan））：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_8.png)

呃……显然，污染全局作用域是种不好的做法。

JavaScript使用的是函数作用域（而不是块作用域，如果你是从C#或者Java转过来的，这点一定要小心！）

所以，阻止我们的代码污染全局作用域的办法就是创建一个新作用域，我们可以用IIFE来达到这个目的，因为它里面的内容只会在它自己的函数作用域里。

下面的例子里，我要先在控制台查看一下window.navigator的值，再用一个IIFE来包裹起具体的行为和数据，并把他赋值给amelia。

这个IIFE返回一个对象作为我们的“应用程序作用域”。在这个IIFE里我声明了一个navigator变量，它不会覆盖window.navigator的值。

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_9.png)

作为一点额外的福利，我们上面创建的IIFE其实是JavaScript模块模式（module pattern）的一个开端。

### typeof运算符和Object.prototype.toString

终有一天你会遇到与此类似的情形，那就是你需要检测一个函数传进来的值是什么类型。

typeof运算符似乎是不二之选，然而，它并不是那么可靠。

例如，当我们对一个对象，一个数组，一个字符串，或者一个正则表达式使用typeof时，会发生什么呢？

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_10.png)

好吧，至少它能把字符串从对象，数组和正则表达式中区分出来。幸亏我们还有其它办法能从这些检测的值里得到更多准确的信息。我们可以使用Object.prototype.toString函数并且应用上我们之前掌握的call方法的知识：

![外部加载图片](http://www.codingserf.com/wp-content/uploads/2014/05/jsquirks_afjq_11.png)

为什么我们要使用Object.prototype上的toString方法呢？

因为它可能被第三方的库或者我们自己的代码中的实例方法给重载掉。而通过Object.prototype我们可以强制使用原始的toString。

如果你知道typeof会给你返回什么，并且你也不需要知道除此之外的其他信息（例如，你只需要知道某个值是不是字符串），那么用typeof就再好不过了。

然而，如果你想区分数组和对象或者正则表达式和对象等等的，那么就用Object.prototype.toString吧!

### 特别声明

此文由David根据Jim Cowart的英文文章《Seven JavaScript Quirks I Wish I’d Known About》进行翻译，目的纯为个人学习所用。

[英文原文](http://developer.telerik.com/featured/seven-javascript-quirks-i-wish-id-known-about/)

[中文译文](http://www.codingserf.com/index.php/2014/05/jsquirks/)