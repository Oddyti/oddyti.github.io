+++
title = 'JavaScript学习记录'
date = 2023-12-06T22:57:11+08:00
draft = false
description = '学习JS时的笔记'
slug = 'js-study'
tags = ['JavaScript']
categories = ['学习记录']
image = 'JS.png'
+++

## 散点

+ script type默认javascript
+ 不要用自闭合标签

## JS框架

+ jQuery: 实质是方法库
+ Angular: **模块化开发**
+ React: **虚拟DOM**
+ Vue: 综合了Angular和React的优点
+ Axios: 前端通信框架

## 前言

ECMAScript是JS的一个标准，最新版本到ES6，但是大部分浏览器仍然用ES5

所以目前开发环境和线上环境不一致

变量：`let`

常量：`const`

+ 变量存的是内存地址，并不是存的值，如果是同样的内容（值），则两个变量会指向同一个内存
+ 常量锁死的不是指向的内存内容而是常量存的内存地址

规范：

+ 通常驼峰命名：`maxLength`
+ 类名大驼峰命名：`MaxLength`
+ 常量一般全大写：`MAX_LENGTH`

## 类型

类型视为值的集合。

![JS类型](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/d1e53ebf6a27a9be8044a703f8cd5dd3.svg)

JavaScript 区分两种值：原始值和对象，如图。

### 散点

**区分值与变量**：变量里存的是值

+ 数值并不是无限大，超过一定范围后会近似
+ 非常大会变成`Infinity`
+ 高精度计算要注意，容易出问题

+ `NaN`也是一个特殊的数值，标识非法的数值

+ 大整数`BigInt`：
  + 以n结尾，表示比较大的整数，范围与内存有关
  + `a = 9899999999998999999n`

**字符串**

单引号活双引号都可以。

```js
a = 'hello'
a = "hello"
```

**模板字符串**：

```js
a = `hello`
```

1. 可以保存字符串中的空格、跨行
2. 嵌入变量（类比格式输出）

```js
let name = "hello";
let str = `hi, ${name}`;
consle.log(str);

"hi, hello"
```

### 原始值

原始值一共七个：

1. Number
2. BigInt
3. String
4. Boolean
5. Null
6. Undefined
7. Symbol

原始值不可变，一旦创建不可更改（指内存中的数据（值）不能更改）

![image-20231121212515577](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/image-20231121212515577.png)

### 对象

对象单独成章节，[点此跳转](#对象-2)

### 类型检查

`typeof`进行值类型检查（注意检查的是值的类型，不是变量的类型，是变量里存的值的类型。

```js
console.log(typeof a)
```

### 类型转换

类比matlab中的`str2num`函数

#### 转换为字符串

两种显式类型转换：

1. 调用`toString()`方法

   ```js
   let a = 10;
   a = a.toString();
   ```

   注意`null`和`undefined`没有`toString()`方法

2. 调用`String()`函数

   ```js
   let a = 10;
   a = String(a);
   ```

   `String()`函数可以将null和undefined值转换为字符串

   对于拥有`toString()`方法的值调用`String()`函数时，实际上就是在调用`toString()`方法
   对于`null`,则直接转换为`"nulL"`
   对于`undefined`，直接转换为`"undefined"`

实际上是根据原有的值在内存中创建新的字符串，并将变量的保存的地址指向新的字符串内存

#### 转换为数值

**将任意的数值类型转换为数值：使用`Number()`函数**

```js
let a = '123';
a = Number(a);
console.log(a);
----
number 123
```

+ 字符串
  + 合法数字，则转换为对应的数值
  + 非法数字（如`'abc'`），则转换为`NaN`
  + 空串，则转换为`0`

+ 布尔值
  + `true`  -> `1`
  + `false`  ->  `0`
+ null
  + `0`
+ undefined
  + `NaN`

**将字符串转换为数值**

1. `parseInt()`将字符串转换为整数
   1. 可以用于非法数字字符串，解析时，会左到右读取一个完整的整数，并返回，如果第一位不是数字，则返回`NaN`
   2. `123ab12` --> `123` 
   3. 可以用于小数**取整**，但不是取整的最佳选择
2. `parseFloat()`将字符串转换为浮点数
   1. 解析同上

#### 转换为布尔值

使用`Boolean()`函数将其他数值类型转换为布尔值

解析类同C语言：`0`,`NaN`,`undefined`,`null`解析为`false`，空串为`false`

## 运算符

### 算术运算符

这里记录一些和其他语言不同的点。

+ 幂运算：`**`
+ 取模：`%`

#### 自动类型转换

JS为弱类型语言，运算时会进行自动类型转换。除字符串加法外，其他运算当其他操作数是非数值时，都会转换为数值。而字符串加法会将数值也转换为字符串，进行字符串拼接操作

```js
a = 10 - '5' // 10 - 5
a = 10 + true // 10 + 1
a = 10 + null // 10 + 0
a = 10 - undefined // 10 - NaN
a = 10 + '2' // '10' + '2'
```

**利用自动类型转换进行类型转换: **加上一个空串`''`

```js
a = ture
a = a + ''
console.log(typeof a, a) // string true
```

### 赋值运算符

+ JS也可以直接用`=+`

### 一元正负运算符

`+a`，`-a`表示将变量a取相反数，可以用来对非数值进行数值转换

```js
a = '123'
a = +a
console.log(typeof a, a) // number 123
```

### 自增自减

同C语言

前自增：++a，先对a自增，再返回自增后的a

后自增：a++，先返回自增前的a，再对a自增

```
a = 1
b = a++ // b = 1

a = 1
a++
b = a // b = 2
```

### 逻辑运算符

同C，但是同样会有自动的类型转换，同样可以利用这个自动类型转换将其他类型转换为布尔值。

### 关系运算符

注意：非数值比较，会自动转换为数值，但是两个字符串比较除外，而是会逐位比较字符的Unicode编码（这点同C）

### 相等运算符和全等运算符

**相等运算符: **`==`比较两个值是否相等，但是会自动进行类型转换

+ 通常转换为数值
+ `null == undefined`比较时除外，会返回true
+ `NaN`不和任何值相等、比较，包括自身，结果都是`false`
+ 判断值是否是`NaN`，使用函数`isNaN()`

**全等运算符: **`===`比较，但是不会自动类型转换，类型不同直接返回`false`

**所以通常使用全等运算符**

同样的有不等运算符`!=`和不全等`!==`运算符

### 条件运算符

`:?`同C

## 流程控制语句

### 代码块

使用`{}`创建代码块，代码块内的let声明的变量具有局部变量属性（块作用域），var声明的变量不具有（块作用域）

### `if`语句

同C

```js
if(true){
    alert('hello')
}else if{
    ...
}else{
    ...
}
```

### `switch`语句

case一旦满足，便会执行之后的所有语句，所以注意用break避免执行之后的语句

```js
switch(num){
    case 1:
        ...
        break
    case 2:
    	...    
        break
    default:
    	...    
        break
}
```

### 循环语句

基本同C

#### `while`语句

```js
while(a<2){
    ...
}
```



#### `do-while`语句

```js
do{
    ...
}while{
    ...
}
```



#### `for`语句

```js
for(let i = 1;i++;i<5){
    ...
}
```

#### `break`和`continue`

同C

## 对象

数据类型

**原始值：**

1. 数值 Number
2. 大整数 BigInt
3. 字符串 String
4. 布尔值 Boolean
5. 空值 Null
6. 未定义 Undefined
7. 符号 Symbol

**对象：**

同其他语言的对象

### 对象操作

```js
// 对象创建
let obj1 = new Object()
let obj2 = Object()
// 修改属性
obj1.name = 'hahah'
obj1[socre] = 123
// 属性嵌套
obj.f.name = '123'
obj.f.score = 123
// 删除属性
delete obj.name
// in 运算，检查对象是否含有某属性
'name' in obj // 返回true or false
```

如果读取未创建的属性，会返回`undefined`

### 属性名相关

属性名是一个字符串，可以为任何值

+ 如果属性名太特殊，需要使用`[]`设置
+ 如果用符号`symbol`作为属性名，也需要用`[]`设置
+ 使用`[]`操作属性时，可以使用变量访问

```js
let obj = Object()
let mySymbol = Symbol()
let str = 'address'
obj[al@@lkjer!!] = 'haha'
obj[mySymbol] = "hahah"
obj[str] = 'hahah' // 等价于obj['address'] = 'hahah'

console.log(obj[str])
```

### 对象的字面量

创建对象的另一种形式

```js
let mySymbol = Symbol()
let obj = {
    name: "haha",
    age: 19,
    ["gender"]: 'male'
    ["mySymbol"]: 'symbol'
}
```

### 枚举对象属性

类似Python

```js
let mySymbol = Symbol()
let obj = {
    naem: 'a',
    age: 19,
    gender: 'male',
    address: 'home',
    [mySymbol]: '符号属性'
}

for (let propName in obj){
    console.log(propName)
    console.log(obj[propName])
}
```

**不可枚举属性**

并非所有的属性都可以被枚举，例如符号属性

### 对象的变量类型

对象属于可变类型

+ 当对两个对象变量进行相等或者却等比较，比较的是内存地址

**如果有两个变量同时指向同一个对象，那么如果通过一个变量修改对象，另一个变量也会改变**

![image-20231203172547032](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/image-20231203172547032.png)

## 函数

**函数也是一个对象**

### 函数对象的创建与参数传递

+ 函数参数传递数量不对应，不会报错，如果多了不用，少了undefined（或者默认值）

+ 创建函数时，可以指定默认值
+ 函数创建时，定义形参就相当于在函数中声明了变量，只是没有赋值

函数声明

```js
function myFun(a = 1,b = 2){
    ...
}
myFun(c,d)
```

函数表达式

```js
const myFun = function(a,b){
    ...
}
myFun(c,d)
```

箭头函数

```js
const myFun = (a,b) => {
    ...
}
myFun(c,d)
```

**当箭头函数只有一个参数的时候，括号可以不写**

```js
const myFun = a => {
    console.log(a)
}
myFun(1)
```

### 对象作为参数传递

对象作为参数传递时，传递的是对象的地址，可以理解为传递指针（即函数内通过变量修改对象，则原变量的对象也会一同修改）

```js
let a.name = 'a'
let fn = (a) => {
    a.name = 'b'
    console.log('name', a)
}
console.log('name', a)
```

### 函数作为参数传递

见[高阶函数](#高阶函数)

### 函数的返回值

同C

+ 任何类型值都可以作为返回值，对象、函数
+ 如果return后面不跟值，相等于返回undefined
+ 如果不return，也相等于返回undefined

### 箭头函数的返回值

如果箭头函数只有一个语句直接并返回，则返回值可以直接写在箭头后面

如果要直接返回对象的字面量，由于对象的大括号和代码块的大括号相同，所以需要用`()`括起来

```js
const sum = (a,b) => {
    return a+b;
}
// 等价于
const sum = (a,b) => a + b
let result = sum(123,456)

// 直接返回对象
const sum = (a,b) => ({name: 'haha'})
```

### 可变参数

#### `arguments`

+ 用于存储函数传入的实参，无论函数是否定义形参，实参都会被储存
+ 可以通过`arguments`访问实参

+ 函数中的另一个隐含参数
+ 是一个类数组对象（伪数组）
+ 通过`arguments`可不受参数数量限制更加灵活的创建函数
+ 箭头函数没有`arguments`

如创建一个计算任意数量数之和的函数

```js
function sum(){
    let temp = 0;
    for(let num of arguments){
        temp += num;
    };
    console.log(temp);
    return temp;
}

sum(1,2,3,4,5,6);
```

#### 可变参数

定义函数时，可以将参数指定为可变参数，可以接收任意数量的实参

```js
function fn(...args){
    console.log(args);
};
```

可变参数的作用基本上和`arguments`一致，但是：

+ 可变参数名称自定义
+ 可变参数是数字，不是伪数组，可以使用数组的方法
+ 可变参数可以和其他参数一起使用，即函数可以既有普通参数，又有可变参数
+ 可变参数在创建时放在最后

例题：创建一个计算任意数量数之和函数

```js
function sum(...num){
    return num.reduce((a,b) => a+b);
};

sum(1,2,3,4,5,6)
```

## 高阶函数

函数的参数也可以是函数，如果一个函数的**参数**或**返回值**是函数，则这个函数称为高阶函数。

+ 将函数作为参数，意味着可以对另一个函数动态传递代码

### 回调函数（函数作为参数）

如果将函数作为参数传递，称这个函数为回调函数

**需求：在不修改原函数的情况下，改变其语句以改变功能**

可以将语句或表达式通过回调函数的方式传递到函数内

引例：如果想要修改`filter()`函数中的条件

```js
function filter(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        // 等价于 arr[i].age < 18
        if (fn(arr[i])) {
            console.log(arr[i].name);
        };
    };
}

// 这样就可以修改这个回调函数来传入不同的判断条件
function fn(a) {
    return a.age < 20;
};

const personArr = [
    {name:'Tom',age:18},
    {name:'Bill',age:20},
    {name:'Cathy',age:3},
    {name:'Dutch',age:45}
];

result = filter(personArr, fn)
```

但是通常回调函数直接用匿名函数

```js
function filter(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        // 等价于 arr[i].age < 18
        if (fn(arr[i])) {
            console.log(arr[i].name);
        };
    };
}

const personArr = [
    {name:'Tom',age:18},
    {name:'Bill',age:20},
    {name:'Cathy',age:3},
    {name:'Dutch',age:45}
];

result = filter(personArr, a => a.age < 20);
result = filter(personArr, a => a.age === 3);
```

### 函数作为返回值

高阶函数的返回值可以是函数

**需求：在不修改原函数的基础上，扩展其功能**

思路：将原函数传递到新的函数中，并扩展功能，包装好之后返回一个函数

```js
// 在不改变someFn()的情况下，扩展其功能，能先说一句'good morinig'
function someFn(){
    console.log('Tom')
    return 'Tom';
};

function outer(cb){
    return () => {
        console.log('good morning');
        const result = cb();
        return result;
    }
}

let result = outer(someFn);
result();

// 如果此时有一个输出'Mike'的函数，也想要一个先说一句'good morning'的功能，则就可以直接用outer()
function mike(){
    console.log('Mike');
    return 'Mike';
};
let newMike = outer(mike);
newMike();
```

### 闭包

#### 引例

创建一个函数，第n次调用打印'n'

简单思路：外部变量/全局变量，**但是不推荐**

可以利用函数来隐藏不希望被外部访问的变量

```js
function outer(){ // 外部函数
    let num = 0; // 隐藏变量
    return () => { // 内部函数
        num++;
        console.log(num);
    }
}
const newFn = outer();

newFn(); // 0
newFn(); // 1
newFn(); // 2
num = 5;
newFn(); // 3
```

#### 闭包

**闭包：**闭包就是能访问到外部函数作用于中变量的函数（如上面`outer()`返回的函数）

**场景：**当我们希望隐藏不希望被别人访问的内容

**闭包的构成条件：**

1. 函数的嵌套
2. 内部函数要引用外部函数中的变量
3. 内部函数要作为外部函数的返回值返回

#### 词法作用域

**函数作用域：**函数的作用域，在函数创建时（定义时）就已确定（**词法作用域**），与函数的调用位置无关（赋值位置也无关）

例子：

```js
let a = '全局a';

function fn(){
    console.log(a);
};

function fn2(){
    let a = 'fn2中的a';
    
    fn();
}

function fn3(){
    let a = 'fn3中的a';
    function fn4(){
        console.log(a);
    };
    return fn4;
}

fn2(); // output: 全局a
let fn4 = fn3();
fn4(); // output: fn3中的a
// 即使fn()在fn2中被调用，但是其作用域在全局作用域，和调用位置无关
```

#### 闭包的注意事项

+ 闭包的生命周期
  + 闭包在外部函数调用时产生，外部函数每次调用都会产生一个**全新**的闭包，并且独立
  + 在内部函数丢失时销毁（内部函数被垃圾回收了，闭包才会消失）
+ 注意事项
  + 主要是用来隐藏一些不希望被外部访问的内容
  + 闭包空间占用较大，相较于类而言，闭包浪费内存空间

### 递归

类C

性能差

复杂，容错率低

只在一些使用循环解决比较麻烦的问题才使用递归

### `call`和`apply`

需要先了解[函数的`this`](#this)

1. 以函数形式调用，`this`是`window`
2. 以方法形式调用，`this`是调用方法的对象
3. 构造函数中，`this`是新建的对象
4. 箭头函数没有自己的`this`

**函数调用，还可以通过调用函数的`call()`和`apply()`方法来调用函数**

+ `call()` 和 `apply()`可以用来指定函数的this
+ `call()`和`apply()`的第一个参数，将会成为函数的`this`
+ `call()`方法调用函数，函数的实参跟在第一个参数之后
+ `apply()`方法调用函数，实参在第一个参数之后以数组形式传递

```js
fucntin fn(a,b){
  console.log('函数执行',a,b);
};
const obj = {name:'tom', fn};

fn.call(obj, 1, 3);
fn.apply(obj, [1,3]);
```

### `bind()`

是函数的方法，可以用来创建一个新的函数

+ bind()可以为新函数绑定this，绑定的this无法更改
+ 可以为新函数绑定参数，绑定的参数无法修改

```js
fucntin fn(a,b){
  console.log(a,b);
};
const obj = {name: 'Tom'};

const fn2 = fn.bind(obj，1，2);

fn2.call({}) // 无效
fn2(3,4) // output: 1,2 因为被绑定参数，所以仍然输出1，2

```

**箭头函数没有自身的this，它的this由外层作用域决定，也无法通过call, apply, bind修改其this**

## 作用域(scope)

### 全局作用域

在网页关闭时销毁

### 局部作用域

代码块

### 作用域链

**解释器会优先在当前作用域寻找变量，如果找不到则取上一层作用域寻找**

```js
let a = 1
{
    let a = 2
    {
        let a = 3
        console.log(a) 
    }
}
// output: 3
```

### Window对象

浏览器提供了以个Window对象，可以直接访问

可以对浏览器窗口进行各种操作

还负责存储JS中的内置对象（如`String`）和宿主对象（`alert()`）

Windowd对象的属性，可以直接访问，也可以通过Window对象访问

```js
window.console.log('hello')
console.log('hello')
```

**使用`var`声明的变量，都会作为window对象的属性，所以是全局作用域**

**使用`function`声明的函数，都会作为window对象的方法**

**当`let`声明的变量和window属性都存在时，会优先访问`let`声明的变量**

**`var`虽然没有块作用域，但是依然有函数作用域**

**如果直接声明变量，则默认为window的属性**

```
a = 10
// window.a = 10
```

### 提升

#### 变量的提升

+ 使用`var`声明的变量，会在所有代码执行前被声明，但不是赋值，**只是声明**

```js
console.log(a)
var a = 10
// output: undefined
```

+ 提升在函数内也适用

```js
var a = 1
function fn(){
    console.log(a) // undefined 函数内被提升
    var a = 2
    console.log(a) // 2 var声明在函数内不具有全局变量属性 
}
fn()
console.log(a) // 1
// output: undefined 2 1
```



#### 函数的提升

同C，函数声明会在其他代码执行前被创建。注意只能是函数声明的方式才会提升（function开头）

```js
fn()

function fn(){
    ...
}
```

#### `let`声明提升

实际上提升了，但是在赋值之前解释器禁止访问该变量

### 立即执行函数

可以利用这个创建一次性的函数作用域，避免变量冲突

创建函数并直接加上`()`，立即执行，如果用function创建，需要再加上外围括号，避免函数提升

```
(function(){
	...
}());
```

### this

类似python里的self

函数再执行时，JS解释器每次会传递进一个隐含的参数`this`

`this`会指向对象，而函数其实是`window`对象的方法，所以如果以函数调用，`this`指向的是`window`对象

**注意，无论function函数再哪儿创建，在哪儿调用，只要是调用函数（不是调用方法），其函数的`this`指向window**

如果调用其他对象的方法，`this`会指向该方法的对象

```js
function fn(){
    console.log(this) // this === window
}
fn()

let obj = {name: 'ha'}
obj.fn = fn
obj.fn() // this === obj
```

所以可以类比python对象的操作，通过`this`调用对象的属性

```js
let obj = {
    name: '123',
    fn: funtion(){
        console.log(this.name)
    },
};
```

### 箭头函数的`this`

**与`function`函数的区别，箭头函数的`this`无论调用方式如何，其`this`指向外层**

```js
const obj = {
    name: '123',
    func(){
        function f1(){
            console.log('this',this) // window
        }
        f1()
        
        const f2 = () => {
            console.log('this',this) // obj
        }
        f2()
    }
}
```

## 面向对象

**类比python**

### 类

类比python class

```js
// 创建类
class ClassName {}; // 类名使用大驼峰命名法
const ClassName = class {};

// 通过类创建对象（实例）
const p1 = new ClassName()

// intanceof 检查对象是否为某个类的实例
console.log(p1 in ClassName) // true
```

+ 类的代码块，默认严格模式

### 属性

类的属性分为：

+ 实例属性：通过类创建的实例也会拥有
+ 静态属性：类独有，只能通过类访问，无法通过实例访问

```js
class Person{
    name = '123' // 实例属性
    
    static age = 12 // 静态属性
}
```

### 方法

同样的有实例方法和静态方法。实例方法有两种创建方式，一般而言用第二种

```js
class Person{
    name = '123' // 实例属性
    
    // 实例方法创建1（不常用）
    sayHello1 = function(){
        console.log(this.name)
    }
    
    // 实例方法创建2（常用，类似python）
    sayHello1(){
        console.log(this.name)
    }
    
    // 静态方法创建
    static sayHello3(){
        console.log(this.name)
    }
}
```

### 构造函数（构造方法）（构造器）

+ 构造函数会在调用类创建对象（实例）时执行
+ 而创建实例时传递的参数，会传递进类的构造函数中

```js
class Person{
    constructor(a,b,c){
        console.log(a,b,c)
    }
}

const p1 = new Person(1,2,3)
// output: 1 2 3
```

所以可以在构造函数中为实例的属性进行赋值，从而达到创建实例时参数传递

```js
class Person{
    name;
    age;
    gender;
   
    constructor(name,age,gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    };
};

const p1 = new Person('A',18,'Male');
console.log(p1); // Person {name: 'A', age: 18, gender: 'Male'}
```

### 面向对象编程

封装、继承、多态

### 封装

对象不仅存储属性，还需要负责数据的安全，则如何确保数据的安全？

#### 1. 私有化属性数据

在类中，使用`#`开头创建私有属性，该属性无法被实例所访问，只能在类内部访问

```js
class Person{
    #name;
    #age;
    #gender;
   
    constructor(name,age,gender){
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
    };
};

const p1 = new Person('A',18,'Male');
console.log(p1); // Person {name: 'A', age: 18, gender: 'Male'}
```

#### 2. 私有化属性访问和修改：`setter`和`getter`方法来开放对数据的操作

曲线救国：创建方法，并且可以在方法中实现对数据的合法性验证

1. `getter`外部访问：在类中构建一个方法，返回私有属性实现访问
2. `setter`外部修改：在类中创建方法，传递参数进行修改

```js
class Person{
    #name;
    #age;
    #gender;
   
    constructor(name,age,gender){
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
    };
    
    getAge(){
        return this.#age;
    }
    
    setAge(age){
        // if ...
        this.#age = age;
    };
};

const p1 = new Person('A',18,'Male');
console.log(p1.getAge());
p1.setAge(12);
console.log(p1.getAge());
```

**简化：JS提供简化方法: **使用`get`和`set`创建方法，既能实现私有化访问和修改，也能简化访问和修改的操作

```js
get 属性名(){
    return this.#属性;
}

set 属性名(参数){
    this.#属性 = 参数;
}
```

例子：

```js
class Person{
    #name;
    #age;
    #gender;
   
    constructor(name,age,gender){
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
    };
    
    get age(){
        return this.#age;
    }
    
    set age(age){
        // if ...
        this.#age = age;
    };
};

const p1 = new Person('A',18,'Male');
console.log(p1.age);
p1.age = 12;
console.log(p1.age);
```

### 多态

JS中不会检查参数的类型，意味着任何数据都可以作为参数传递（很像pyhton和matlab），即函数的参数类型多态

### 继承

+ 继承：使用extends关键字来进行类的继承

+ 重写：在子类中，可以通过创建同名方法来重写继承到的方法
+ 增加：构造函数也可以重写，但是重写的第一行代码应为`super(参数)`并传入父类的参数
+ 调用父类：在父类中，可以通过`super`调用父类

```js
class Animal{
    constructor(name){
        this.name = name;
    };
    
    sayHello(){
        console.log('hello');
    };
}

class Dog extends Animal{
    constructor(name,age){
        super(name);
        this.age = age;
    }
    
    sayHello(){
        super.sayHello();
        console.log('wang');
    }
};

const dog1 = new Dog('tom', 12);
console.log(dog1);
dog1.sayHello();
```

**OCP 开闭原则：程序应该对修改关闭，对扩展开放**

### 对象的内存结构

对象中，存储属性的区域有两个：

1. 对象自身
   1. 直接通过对象所添加的属性
   2. 在类中通过`x = y`的方式添加的属性
   3. 通过`xxx = function(){}`添加的方法
   4. 在自身中，`__proto__`属性储存了原型对象的地址
2. 原型对象
   1. 直接定义的方法，如`sayHello()`
   2. `constructor()`
   3. 主动向原型中添加的属性或方法

访问对象属性时，优先访问对象自身

如下对象：

```js
class Person{
    name = 'Tom';
    
    sayHello(){
        console.log('hello, I am', this.name);
    };
};
const p = new Person();
console.log(p)
```

![image-20231204183610291](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/image-20231204183610291.png)

### 原型对象

访问：

+ 使用`Object.getPrototypeOf(p)`进行访问，不建议通过`p.__proto__`访问（避免修改原型对象）。

原型对象中的数据：

+ 对象的数据
+ ` constuctor()`

**原型对象也是对象，所以原型对象也有自己的原型对象，但是原型对象的原型对象没有原型对象，构成了一个原型链，根据对象的复杂度不同，原型链的长度也不同**

#### 原型链

读取对象属性时，会顺着原型链向上寻找，先自身，如果没有找原型，再没有找原型的原型...没找到返回`undefined`

**寻找变量，作用链，找不到报错**

#### 原型的作用

所有的同类型对象，它们的原型对象都是同一个，意味着其原型链相同。

**原型的作用：**原型相当于公共区域，该类所有实例所有的公共属性（方法）都同意储存到原型中，大大减小了内存资源花费

```js
class Animal{
    constructor(name){
        this.name = name;
    };
    
    sayHello(){
        console.log('hello');
    };
};

const dog1 = new Animal();
const dog2 = new Animal();
console.log(dog1.__proto__ === dog2.__proro__);
// output: true
// dog1 --> object --> Object原型 --> null
// dog2 --> object --> Object原型 --> null
```

#### 继承与原型

**继承：继承时，子类的原型实际就是父类的实例**

```js
class Animal{
    constructor(name){
        this.name = name;
    };
    
    sayHello(){
        console.log('hello');
    };
}

class Dog extends Animal{
    }
};
// Dog --> Animal --> object --> Object原型 --> null

class Cat extends Dog {
    
};
// Cat --> Dog --> Animal --> object --> Object原型 --> null
```

#### *原型的修改

大部分情况下，不需要修改原型对象

+ 不要通过类的实例取修改原型，很危险，尤其不要`p.__proto__ = new ClassName()`

**通过类的`prototype`属性访问并修改类的实例的原型对象**

```js
class Animal{
    constructor(name){
        this.name = name;
    };
    
    sayHello(){
        console.log('hello');
    };
}

const d = new Animal();
console.log(d);

Animal.prototype.fly = () => {
    console.log('fly~');
};

console.log(d.fly());
```

#### `instanceof`和`hasOwn`

`instanceof`检查对象是否是某个类的实例（包括继承类）

实际是检查该对象的原型链是否含有该对象的类，如果有则返回`true`

```js
class Animal{};
class Dog extends Animal{};
const dog = new Dog();
// 原型链: dog --> Dog(Animal实例) --> Animal(Object实例) --> Object原型
console.log(dog instanceof Dog) // true
console.log(dog instanceof Animal) // true
console.log(dog instanceof Object) // true
```

检查是否含有属性

1. `属性名 in 对象`，无论在对象自身还是在原型链中都会返回`true`
2. `对象.hsaOwnProperty(属性名)`，**不推荐使用**，只有在对象自身含有属性才会返回`true`
3. `Object.hasOwn(对象, 属性名)`,**建议使用**, 只有在对象自身含有属性才会返回`true`

### 旧类

采用`function`创建类

### `new`运算符

创建对象时使用的运算符

[new - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

### 包装类

在JS中，除了直接创建原始值以外，也可以创建原始值的**对象**，但是**不要这样做**

+ 通过`new String()`创建String类型的对象
+ 通过`new Number()`创建Number类型的对象
+ 通过`new Boolean()`创建Boolean类型的对象

#### 包装类

JS中一共有5个包装类：

1. String
2. Number
3. Boolean
4. BigInt
5. Symbol

通过包装类可以将一个原始值包装为一个对象，当我们对一个原始值调用方法或属性时，JS解释器会**临时**将原始值包装为对应的对象，然后调用这个对象的方法

+ 这解释了为什么可以直接对一些原始值调用一些方法，例如`toString()`
+ 注意是**临时**，即不破坏原始值，调用结束就失效
+ 这样原始值对象的方法可以直接通过原始值调用（具体方法可以查询）

```js
let num = 11;
num = num.toString();
console.log(typeof num, num) // string 11
```

#### 字符串包装类方法介绍

字符串（包装类）所有属性和方法都是不可破坏性

查资料吧[String.prototype.match() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

## 数组

类似其他语言

+ 数组可以非连续，但是使用时尽量避免非连续
+ 数组也是对象（`typeof: object`）

```js
// 创建数组
const arr1 = new Array();
const arr2 = [1,2,3];
// 索引从0开始
arr1[0] = 1;
// 获取数组长度(返回最大索引+1)
arr1.length;
```

+ 小技巧：`append`操作

```js
arr[arr.length] = 1;
```

+ 小技巧：快速删除多个元素

```js
arr.length = 10
```

### 数组遍历

#### `for`循环

不过多赘述

#### `for-of`语句

类似于python的in

```js
for (let i in arr){
  console.log(i);
};
```

不止用于遍历数组，可迭代对象都可以，如字符串遍历

```js
const str = 'hello';
for(let i in str){
  console.log(i);
};
```

#### `forEach()`见下文

### 数组方法介绍

+ `Array.isArray()`检查对象是否为数组
+ `at(index)`数组索引，支持负数（反向索引）
+ `arr3 = arr1.concat(arr2)`数组拼接，非破坏，支持多个拼接
+ `indexOf('abc', 3)`返回元素从起始位置开始第一次出现的索引，无返回`-1`
+ `lastIndexOf('abc',3)`返回元素最后一次出现位置，无返回`-1`
+ `join('_')`数组元素拼接为一个字符串，默认为逗号连接符
+ `slice(0,2)`切片，左闭右开原则
  + `slice(1)`从1开始到所有
  + `slice()`浅拷贝

### 数组的方法

+ `push()`
  + 破坏性方法
  + 入栈（末尾），等于python的`append`，可以`push`多个元素
  + 返回新数组的长度

+ `pop()`
  + 破坏性方法
  + 出栈（末尾）
  + 删除并返回数组的最后一个元素

+ `unshift()`
  + 破坏性方法
  + 向数组开头添加一个或多个元素
  + 返回新的长度

+ `shift()`
  + 破坏性方法
  + 删除并返回数组的第一个元素

+ `splice(index, num, a)`
  + 破坏性方法
  + 可以删除、添加、插入、替换数组中的元素
  + index: 删除的起始位置
  + num: 删除的数量
  + a: 需要添加的新元素
  + 返回被删除元素数组
+ `reverse()`
  + 破坏性方法
  + 反转数组

```js
const arr = ['Tom', 'Jerry', 'Bill', 'Mike'];
arr.push('Bob');
console.log(arr); // ['Tom', 'Jerry', 'Bill', 'Mike', 'Bob']
arr.pop()
console.log(arr); // ['Tom', 'Jerry', 'Bill', 'Mike']
arr.unshift('Cathy');
console.log(arr); // ['Cathy', 'Tom', 'Jerry', 'Bill', 'Mike']
arr.shift();
console.log(arr); // ['Tom', 'Jerry', 'Bill', 'Mike']
arr.splice(2,1,'Peter', 'Steven');
console.log(arr); // ['Tom', 'Jerry', 'Peter', 'Steven', 'Mike']
```

+ `sort(), arr.sort()`
  + 破坏性方法
  + 升序排序，但是是根据Unicode编码进行排序，所以如果通过`sort()`对数字进行排序，可能会错
  + 可以传递一个回调函数作为参数，来指定排序规则
  + `arr.sort((a,b) => a - b)`升序排列（非Unicode）
  + `arr.sort((a,b) => b - a)`降序排列
+ `forEach()`
  + 遍历数组
  + 需要回调函数作为参数来执行遍历行为
  + 回调函数可以传递三个参数
  + element: 当前元素
  + index: 当前元素索引
  + array: 当前数组

```js
arr = ['tom', 'bill', 'kevin'];
arr.forEach((element, index) => console.log(element, index));
// tom 0
// bill 1
// kevin 2
```

+ `filter()`
  + 非破坏性方法
  + 过滤数组元素保存到新数组中返回
  + 需要一个回调函数作为参数，会为每一个元素调用回调函数，并根据回调函数的返回值（true放，false不放）决定是否将元素添加到新数组中
  + 回调函数的参数同`forEach()`

```js
const arr = [1,2,3,4,5,6,7,8];
const arr2 = arr.filter(element => element > 3)
```

+ `map()`
  + 非破坏性方法
  + 根据当前数组生成（映射）一个新数组
  + 需要回调函数作为参数
  + 回调函数的返回值作为新元素
  + 理解成原数组根据回调函数的规则映射

```js
arr = ['Tom', 'Bill', 'Kevin'];
arr2 = arr.map(ele => '<li>' + ele + '</li>');
// output: ['<li>Tom</li>', '<li>Bill</li>', '<li>Kevin</li>']
```

+ `reduce()`
  + 非破坏性
  + 对数组前两个元素按照回调函数整合，并更新
  + 需要回调函数作为参数
  + 返回最后整合值
  + 可以有第三个参数，作为初始值，会先将初始值和第一个元素整合，再继续整合

```js
arr = ['hello ','I ','am ','pig ']
res1 = arr.reduce((a,b) => a + b, 'Hi, ')
res2 = arr.reduce((a,b) => a + b)
console.log(res1) // Hi, hello I am pig
console.log(res2) // hello I am pig 
```

## 对象的复制 - 浅拷贝和深拷贝

以数组为例

**赋值运算不是复制，会指向同样的内存**

![image-20231205160759889](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/image-20231205160759889-20231205162030907-20231205162102279-20231205162115878.png)

使用`slice()`方法进行复制

```js
const arr = ['1','2','3'];
const arr2 = arr.slice();
```

### 浅拷贝和深拷贝

#### 浅拷贝 shallow copy

通常对象的拷贝都是浅拷贝，只对对象的浅层进行复制（只复制一层）

**浅拷贝只会对对象本身进行复制，不会复制对象中的属性（或元素）**

如果对象存储的数据是原始值，深浅拷贝不重要

如果对象存储的元素里仍有对象，那么浅拷贝只会复制第一层（即创建新的内存储存第一层的对象）

**如果此时对第二层的元素或属性修改，会导致所有的对象都会受影响**

![image-20231205161549922](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/image-20231205161549922-20231205162258154.png)

```js
const arr1 = [{name:"Tom"}, {name:'Jerry'}];
const arr2 = arr1.slice();
console.log(arr1 === arr2) // false
console.log(arr1[0] === arr2[0]) // true
arr1[0].name = 'Bill';
console.log(arr2[0].name) // Bill
```

#### 深拷贝

不仅复制对象本身，还复制对象内的所有属性和元素

一般不进行深拷贝，会导致性能开销大

![image-20231205162543906](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/image-20231205162543906.png)

`structuredClone()`方法进行深拷贝

```js
const arr1 = [{name:"Tom"}, {name:'Jerry'}];
const arr2 = structuredClone(arr1);
console.log(arr1 === arr2) // false
console.log(arr1[0] === arr2[0]) // false
arr1[0].name = 'Bill';
console.log(arr2[0].name) // Tom
```

### 其他复制（拷贝）方式

#### `...`展开运算符

可以将一个数组的元素展开，可以用于函数参数传递，可以用于浅拷贝

```js
const arr = [1,2,3,4];
function sum(a,b,c,d){
  return a+b+c+d;
};

result = sum(...arr);
```



```js
const arr1 = ['Tom','Jerry','Bill'];
const arr2 = [...arr1];
// 等价于手动浅拷贝
// const arr2 = [arr1[0], arr1[1],arr1[2]];
```

#### 对象的浅拷贝（复制）

`Object.assign(目标对象,源对象)`

可以将源对象复制/扩展/覆盖到目标对象，后来后覆盖

```js
const obj1 = {name:'tom', age:18}
const obj2 = Object.assign({}, obj1);
```

`...`对象同样可以用展开运算符，后来后覆盖

```js
const obj1 = {name:'tom', age:18};
const obj2 = {...obj};
```

## 内建对象

### 解构赋值

#### 数组解构赋值

通过`[]`对数组进行结构赋值

+ 如果接受变量多余，则赋`undefined`
+ 每次解构赋值都会覆盖上次结果，即使赋`undefined`
+ 可以指定接收变量的默认值
+ 可以通过`...args`接收剩余值
+ 解构赋值可以嵌套，以接收二维数组
+ 通过解构赋值，可以实现函数返回多个值（以数组返回，并解构接收）
+ 解构赋值可以用来快速交换变量

```js
let arr = [1,2,3];
let a,b,c,d;
[a,b,c] = [1,2,3];
[a,b,c] = arr;
[a,b,c,d] = arr; // d: undefined
[a,b,c,d] = [5,6,7,8];
[a,b,c,d] = [1,2,3]; // d: undefined
[a,b,c,d=10] = [1,2,3]; // d: 10
[a,b,c,d=d] = [1,2,3,5]; // d: 10 保留上次值
[a,b,...c] = [1,2,3,4]; // c: [3,4]
function fn(){
  return [1,2];
};

[a,b] = fn(); // a: 1, b:2
```

#### 对象解构赋值

通过`{}`对对象进行解构赋值

+ 不同于数组解构，对象解构需要知道对象属性名，并且可以使用别名赋值给变量

+ 由于直接使用`{}`会被解释为代码块，所以直接使用`{}`进行解构赋值时，套上`()`以避免
+ 如果对象中没有对应属性，接收变量赋值为undefined
+ 其他性质同数组解构赋值

```js
const obj = {name:'tom', age:18, gender:'male'};

// let {name, age, gender} = obj;

let name, age ,gender;

({name, age,gender} = obj);

let {name:a, age:b, gender:c='female'} = obj
```

### 对象的序列化JSON

> JS的对象都是存在内存中
>
> 序列化是指将对象转化为一个可以存储的格式

JS中对象的序列化通常是转换为字符串

对象序列化的用途：可以将字符串在不同语言之间传递

JS对象序列化

+ JSON(JavaScript Object Notation) JS对象表示法
+ JS对象序列化之后，转换成的字符串称为JSON字符串

JSON方法

`JSON.stringify()`对象转化为JSOB字符串

`JSON.parse(str)`将JSON字符串转化为对象（并且是创建新的对象）

**可以利用JSON进行对象的深拷贝**

```js
const obj = {
  name: 'tom',
  age:18
};

const str = JSON.stringify(obj);

console.log(obj);
console.log(str); // {"name":"tom","age":18}

const obj2 = JSON.parse(str);

console.log(obj2);
```

**编写JSON的注意事项**

+ JSON字符串有两种类型
  + JSON {}
  + JSON []
+ JSON字符串属性名一定要用双引号
+ JSON中可以使用的属性值（元素）：
  + 即其他语言也支持的类型
  + 数字（Number）
  + 字符串（String）且必须使用双引号
  + 布尔值（Boolean）
  + 空值（Null）
  + 对象（Object）
  + 数组（Array）
+ JSON的格式和JS对象的格式基本上一致
  + 注意：JSON字符串中，如果属性是最后一个，则不要加`,`

#### 使用JSON进行深复制

### Map

Map是用来存储键值对解构的数据(key-value)

+ Object中存储的数据可以认为是一种键值对结构
+ Map和Object的主要区别
  + Object的属性名只能是字符串或符号，并对其他类型强制转换为字符串
  + Map中，任何类型的值都可以称为数据的key

#### 基本操作

```js
// 创建Map
const map = new Map();
// 存储key-value
map.set('name','tom');
map.set(a, 'bill');
// 读取
map.get('name');
map.get(a);
// 删除
map.delete('name');
// 检查
console.log(map.has('name'));
// 清空
map.clear();
```

#### 其他操作

转换为数组

+ `arr = Array.from(map)`
  + 转换为二维数组，其中每对key-value为一个数组
  + 语法繁琐，不推荐
+ `arr = [...map]`
  + 语法简单
  + 结果同上

通过二维数组创建Map

+ 创建Map时向`new Map()`中传入二维数组

```js
const map = new Map([["name","tom"],["age",18]]);
```

Map的遍历

+ 通过`for (const entry of map){...}`遍历，`entry`为key-value对数组
  + 进一步：`for(const [key, value] of map){...}`
+ `forEach()`同数组

获取keys和values

+ `map.keys()`
+ `map.values()`

### Set

集合

功能与数组类似，但是不能存储重复数据

实际上是key和value相同的Map

#### 基本操作

```js
// 创建集合
const set = new Set();
// 添加数据
set.add(10);
set.add('Tom');
// 删除
set.delete(10);
// 检查
set.has(10);
// 遍历
for (let item of set){
    ...
};
// 与数组转换
const arr = [...set];
const set2 = new Set(arr);
// 数组去重
const set3 = new Set(arr);
const arr2 = [...set3];
```

### Math

Math是一个工具类

提纲了数学运算相关的常量和方法

```js
Math.PI // pi
Math.E // e

let x = 3;
Math.abs(x);
Math.sin(x);
Math.max(x);
Math.pow(x,3);
...
```

### Date

JS中所有时间相关的数据都由Date对象来表示

+ 直接使用new Date()创建对象时，创建的是代码执行时的时间
+ 可以在Date()的构造函数中，传递一个表示时间的字符串来来创建指定时间
  + M/D/Y Hour:Minute:Second
  + Year-Month-DateTHour:Minute:Second

```js
let d = new Date() // 代码执行时的时间
let d2 = new Date("2019-12-23T23:34:34")
let d3 = new Date(2013,3,2,10,2,23,33) // 直接传入年,月,日,时,分,秒,毫秒
let d4 = new Date(20134) // 创建距离标准时间20134毫秒之后的时间
```

+ `getFullYear()`
  + 获取四位年
+ `getMonth()`
  + 返回月份索引（一月0）
+ `getDate()`
  + 返回当前日期
+ `getDay()`
  + 返回周几
  + 0表示周日
+ `getTime()`
  + 返回当前日期对象的时间戳
  + 时间戳：自1970年1月1日0时0分0秒到当前所经历的毫秒
  + 计算机底层存储时间都是时间戳的方式

+ `Date.now()`
  + 返回当前时间戳


#### 日期的格式化

+ `toLocaleString()`
  + 将日期和时间转换为本地字符串
  + 参数
    + 参数1：描述语言和地区信息的字符串，如`zh-CN`，`en-US`
    + 参数2：配置对象，对日期进行更加详细的配置，参见[Intl.DateTimeFormat() constructor - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
+ `toLocalDateString()`
  + 将日期转换为本地字符串
+ `toLocalTimeString()`
  + 将时间转换为本地字符串

### 正则表达式（对象）

Regular Expression

+　通过`RegExp()`创建新的正则表达式对象，接收两个字符串参数

  + 参数1：正则表达式

  + 参数2：匹配模式
  + `reg = new RegExp("a","i);`
  + 可以传变量
  + 此方法的正则表达式中的`\`会被转义
+　通过字面量来创建: /正则/匹配模式

  +　`reg = /a/i`
  +　`/a/i`不能是变量
  +　此方法中`\`不会被转义


```js
// 创建
let reg = new RegExp(); 
```

#### 正则表达式语法
+ 在正则表达式中大部分字符都可以直接写
+ `| `在正则表达式中表示或
+ `[] `表示或（字符集）
  + `[a-z]` 任意的小写字母
  + `[A-Z]` 任意的大写字母
  + `[a-zA-Z]` 任意的字母
  + `[0-9]`任意数字
+ `[^]` 表示除了
  + `[^x]` 除了x
  + `. `表示除了换行外的任意字符
  + 在正则表达式中使用`\`作为转义字符

+ 其他的字符集
  + `\w` 任意的单词字符，等价于`[A-Za-z0-9_]`
  + `_\W` 除了单词字符，等价于`[^A-Za-z0-9_]`
  + `\d` 任意数字 `[0-9]`
  + `\D` 除了数字 `[^0-9]`
  + `\s` 空格
  + `\S` 除了空格
  + `\b` 单词边界
  + `\B` 除了单词边界

+ 开头和结尾
  + `^` 表示字符串的开头
  + `$` 表示字符串的结尾


+ 量词
  + `{m}` 正好m个，`let reg = /a3/`等价于`let reg = /aaa/`
  + `{m,}` 至少m个
  + `{m,n}` m到n个
  + `a+`一个以上的a，相当于`a{1,}`
  + `a*`任意数量的a
  + `a?` 0-1次，最多有一个a，等价于`a{0,1}`

+ 通过正则表达式检查字符串是否符合规则
  +　`reg.test(str)`

+ 获取字符串中符合正则表达式的内容
  + `reg.exec(str)`
  + 每调用一次只匹配一次
  + 可以用`()`对正则表达式进行分组
  + 通过遍历可以匹配所有

```js
let reg = /a[a-z]c/ig; // i表示忽略大小写，g表示全局匹配
let str = "abcadfadfadfc";
res1 = reg.test(str);
res2 = reg.exec(str);
console.log(res1);
console.log(res2);
while(res2){
    console.log(res2);
    res2 = reg.exec(str);
};
```

