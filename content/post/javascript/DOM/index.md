+++
title = 'DOM学习记录'
date = 2023-12-11T13:42:37+08:00
draft = false
description = '学习DOM时的笔记'
slug = 'DOM-study'
tags = ['DOM']
categories = ['学习记录']
image = ''
license = false
+++

## DOM(Document Object Model)

  DOM将网页所有内容都转换成了对象

  Model表示对象之间的关系，如父子、后代等

  网页中的每个对象都是一个节点(Node)

  ### document对象

  document对象表示整个网页。

  document对象的原型链（继承链）

  ```
  HTMLDocument -> Document -> Node -> EventTarget -> Object.prototype -> null
  ```

  原型链上的属性和方法都可以通过Document调用

  一些常用属性：

  + `document.documentElement`
  + `document.head`
  + `document.title`
  + `document.body`

  ### 元素节点

  网页中，每一个标签都是一个元素节点对象

  #### 通过document对象获取元素节点

  + `document.getElementById()`
    + 根据元素id获取一个对象
  + `document.getElementsByClassName()`
    + 根据元素class属性值获取一组元素对象
    + 返回一个类数组对象，可索引，可遍历
    + 该方法返回的结果是一个实时更新的集合
  + `document.getElementsByTagName()`
    + 根据标签名获取元素对象
    + 返回结果同样是实时更新
  + `document.get ElementsByName()`
    + 根据name属性获取原属对象
    + 常用于表单
    + 返回结果同样实时更新
  + `document.querySelectorAll()`
    + 根据选择器查询所有符合元素
    + 不会实时更新返回结果 
    + 总会返回类数组
  + `document.querySelector()`
    + 根据选择器返回第一个符合的元素
    + 只返回一个元素

  #### 通过元素节点对象获取其他节点

  **区分元素和节点**

  + `parent.getElementsByTagName()`
    + 可以通过父类获取后代中的元素
  + `element.childNodes
    + 获取当前元素的子节点
    + 包含空白子节点
    + 不实用
  + `element.children`
    + 获取当前元素的子元素
    + 只取元素，不包括空白
  + `element.fisrtElementChild`
    + 获取元素
  + `element.nextElementSibling`
    + 获取下一个兄弟元素
  + `element.parentNode`
    + 获取父节点

  ### 文本节点

  DOM中，网页中所有的文本内容都是文本对象节点，包括空白

  *可以通过元素获取其中的文本节点，但是通常不这样做*

  可以直接通过元素去修改其中的文本

  + `element.textContent`
    + 获取或修改元素中的文本内容
    + 获取的是标签中的内容，不会考虑css样式
  + `element.innerText`
    + 获取或修改元素中的文本内容
    + 获取内容时，会考虑css样式
    + 通过`innerText`读取CSS样式，会出发网页的重排
  + `element.innerHTML`
    + 获取或修改元素中的HTML**代码**
    + 可以读取到内容中的标签
    + 可以直接向元素中添加HTML代码
    + **`innerHTML`在插入内容时，有被xss注入的风险**

  ### 属性节点

属性节点（Attribute）通常不需要获取对象而是直接通过元素即可完成对其的各种操作

如何操作：

+ 方式一
  + 读取：`元素.属性名`*（注意，class属性需要通过className来读取）
    + 读取布尔值时，会返回true或false，但是disabled属性只要存在就默认disabled
  + 修改：直接赋值就行
+ 方式二
  + 读取：`元素.getAttribute(AttrName)`
  + 修改：`元素.setAttribute(AttrName, Attr)`
  + 删除：`元素.removeAttribute(AttrName)`

### 事件 Event

用户和页面的交互行为，如：点击按钮、鼠标移动等等

可以为事件绑定响应函数（回调函数）

在事件的响应函数中，事件绑定给谁，其`this`就指向谁（箭头函数除外）

绑定函数的方式：

+ 直接在元素属性中设置

+ ```html
  <button id = "btn" click = "alert('haha')">click</button>
  ```

+ 可以通过为元素的执行属性设置回调函数的形式来绑定

+ ```js
  const btn = document.getElementById("btn");
  btn.onclick = function(){
    ...
  }
  ```

  + 不能重复绑定，一个事件只能绑定一个
  + 重复绑定会覆盖

+ 通过元素`addEventListener()`方法来绑定

+ ```js
  btn.addEventListener("click", function(){
  	...
  })
  ```

  + 一个事件可以绑定多个事件
  + 顺序执行
  + 更推荐

### 文档的加载

网页是按html代码顺序加载，当Script标签在head里时，js代码无法获取DOM对象

如何解决js代码无法获取DOM对象：

+ 将script标签写到body的最后（不要写到body外）
+ 通过`window.onload()`使代码在窗口加载完毕之后执行
  + 等待窗口中所有文档加载完毕才会触发
+ 同上，通过`window.addEventListener("load",function(){})`
+ 通过document对象的`DOMContenLoaded`
  + `document.addEventListener("DOMContentLoaded", function(){})`
  + 在当前文档加载完毕即触发（但是一个窗口可以不只有一个文档）
  + **执行时机更早**

+ 将代码编写到外部js对象中，然后以`defer`的形式引入

+ ```html
  <script defer src = "./js/script.js"></script>
  ```

  + 早于`DOMContenLoaded`

### DOM的修改

主要讲元素的创建、替换与删减

#### 元素的创建与添加

+ 创建元素
  + `document.createElement("li")`
+ 添加元素
  + `元素.appendChild(新元素)`
    + 给元素添加一个子节点
  + `元素.insertAdjacentElement()`
    + 两个参数：1 添加位置 2 添加的元素
    + 可以给元素添加兄弟节点或子节点
    + 一些位置：`"befoeend"`, `"afterbegin"`,`beforebegin`,`afterend`
  + `元素.insertAdjacentHTML()`
    + 插入HMTL代码

#### 元素的替换

`元素.repalceWith(新元素)`

#### 元素的删除

`元素.remove()`



