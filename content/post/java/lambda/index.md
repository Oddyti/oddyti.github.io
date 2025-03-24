+++
title = 'Java基础 - 从匿名内部类到Lambda表达式再到方法引用'
date = 2025-02-18T12:24:57+08:00
draft = false
description = '如题'
slug = 'lambda'
tags = ['JAVA基础']
categories = ['技术']
image = ''
license = false
+++

在当初学习Lambda表达式时，总是迷迷糊糊，恍恍惚惚，所以这次打算一次把自己讲明白。

## 内部类

为什么会有内部类？

场景：如果一个类只在另一个类中使用，并且需要直接访问外部类的成员，（包括私有成员），而不需要通过 `getter` 或 `setter` 方法。

例如`Node` 类通常只在 `LinkedList` 类中使用。

一些好处：

+ 实现多重继承
  + Java本身不支持多重继承，但是可以在类中创建多个内部类，继承不同的类

### 匿名内部类

- 没有显式的类名，直接通过 `new` 关键字创建对象并实现接口或继承类。

```java
class Outer {
    void display() {
        Greeting greeting = new Greeting() {
            @Override
            public void greet() {
                System.out.println("Hello from anonymous class!");
            }
        };
        greeting.greet();
    }
}
```

**场景**

比如有一个接口Greeting，里面有一个方法greet，我想使用这个方法。

+ 传统做法：
  + 先创建一个类GreetingImpl实现这个接口，并实现接口中的greet方法，再创建这个实现类的对象，再通过对象调用这个方法。
+ 匿名内部类：
  + 实际上整个功能，有效的代码仅仅是重写我需要调用的方法这部分
  + 可以用匿名内部类直接不实现接口，直接创建一个匿名内部类实现重写我想要调用的方法

```java
interface Greeting {
    void greet();
}

class GreetingImpl implements Greeting {
    @Override
    void greet(){
        System.out.println("Hello from anonymous class!");
    }
}

public class AnonymousClassExample {
    public static void main(String[] args) {
        // 传统做法
        GreetingImpl greetingImpl = new GreetingImpl();
        greetingImpl.greet();
        
        // 创建匿名内部类并实现 Greeting 接口
        Greeting greeting = new Greeting() {
            @Override
            public void greet() {
                System.out.println("Hello from anonymous class!");
            }
        };

        // 调用方法
        greeting.greet();
    }
}
```



## Lambda表达式

进一步的，如果是函数式接口（即只有一个抽象方法的接口），可以用Lambda表达式代替

Lambda 表达式只能用于实现函数式接口（只有一个抽象方法的接口）

```java
interface Greeting {
    void greet();
}

class GreetingImpl implements Greeting {
    @Override
    void greet(){
        System.out.println("Hello from anonymous class!");
    }
}

public class AnonymousClassExample {
    public static void main(String[] args) {
        // 传统做法
        GreetingImpl greetingImpl = new GreetingImpl();
        greetingImpl.greet();
        
        // 创建匿名内部类并实现 Greeting 接口
        Greeting greeting = new Greeting() {
            @Override
            public void greet() {
                System.out.println("Hello from anonymous class!");
            }
        };
        
        // 使用 Lambda 表达式实现接口
        Greeting greeting = () -> System.out.println("Hello from Lambda!");

        // 调用方法
        greeting.greet();
    }
}
```

**Lambda表达式还可以用作函数式编程，“传递函数”**

```java
interface Calculator {
    int calculate(int a, int b);
}

public class Example {
    public static int operate(int a, int b, Calculator calculator) {
        return calculator.calculate(a, b);
    }
    
    public static void main(String[] args){
        // 传统调用，需要传递Calculator的实现类的对象，这里用匿名内部类代替
        int sum = operate(3, 5, new Calculator() {
            @Override
            public int calculate(int x, int y) {
                return x + y;
            }
        });
        
        // Lambda表达式，看似是传递了一个方法，但是实际上是传递的接口的实现类对象
        int sum = operate(3, 5, (x, y) -> x + y);
        
    }
    
}
```

## 方法引用

方法引用是简化Lambda表达式，看似是传递的方法，实际上和Lambda表达式一样传递的是接口实现类的对象

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MethodReferenceExample {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("apple", "banana", "cherry");

        // 使用 Lambda 表达式
        List<Integer> lengths1 = fruits.stream()
                                     .map(s -> s.length())
                                     .collect(Collectors.toList());
        System.out.println(lengths1); // 输出 [5, 6, 6]

        // 使用方法引用
        List<Integer> lengths2 = fruits.stream()
                                     .map(String::length)
                                     .collect(Collectors.toList());
        System.out.println(lengths2); // 输出 [5, 6, 6]
    }
}
```