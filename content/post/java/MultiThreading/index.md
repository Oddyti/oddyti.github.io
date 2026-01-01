+++
title = 'Java多线程 - 一篇不太详细的解释'
date = 2025-02-20T17:31:03+08:00
draft = false
description = '学习Java多线程的总结'
slug = 'multi-threading'
tags = ['JAVA']
categories = ['弄斧']
image = ''
license = false
+++


## 多线程

Java 线程通常是 **一对一模型**，即每个 Java 线程直接映射到一个操作系统内核线程。但某些 JVM 可能使用用户线程或混合模型（如 M:N 模型，多个用户线程映射到少量内核线程）。

### 线程安全三原则

Java 线程安全的三个方面是：

#### 原子性

原子性指的是一个操作要么完全执行，要么完全不执行，不会出现部分执行的情况。在多线程环境下，如果操作不具备原子性，可能会导致数据不一致。（就像原子一样，不可分割）

- 使用 `synchronized` 关键字。来保证原子性

#### 可见性

可见性指的是一个线程对共享变量的修改对其他线程可见。在多线程环境下，如果缺乏可见性，可能会导致线程读取到过期的数据。

- 使用 `volatile` 关键字，确保变量的修改对其他线程立即可见。
- 使用 `synchronized` 关键字，确保线程在释放锁之前将修改同步到主内存。

#### 有序性

有序性指的是程序执行的顺序符合预期，不会发生指令重排序。在多线程环境下，如果缺乏有序性，可能会导致程序行为异常。

### 保证数据一致性的方案有哪些

+ 事务管理
+ 锁机制
+ 版本控制

### 创建线程的方式

#### 继承Thread类

重写run方法。调用类对象的start方法启动线程。

**优点**

- 可以直接在run方法中使用this访问当前线程。
- 可以直接调用 `Thread` 类的方法（如 `getName()`、`setPriority()` 等）。

**缺点**

- Java 不支持多继承，因此继承 `Thread` 类后无法继承其他类。
- 任务与线程耦合在一起，不符合面向对象的设计原则。

#### 实现 `Runnable` 接口

**优点**

- 任务与线程分离，符合面向对象的设计原则。
- 可以继承其他类，灵活性更高。

**缺点**

- 需要额外创建 `Thread` 对象。
- 无法直接调用 `Thread` 类的方法（需要通过 `Thread.currentThread()` 获取当前线程）。（即在重写的run方法中不能用this调用，需要用Thread.currentThread()）

### 实现Callable接口，并包装仅FutureTask类

通过实现 `Callable` 接口并重写 `call()` 方法来创建线程。需要包装进FutureTask，因为Thread类的构造器只接受Runnable参数，而FutureTask实现了Runnable接口

在 Java 中，`Runnable` 接口的 `run()` 方法 **不能抛出受检异常（Checked Exception）**，因为 `run()` 方法的签名没有声明 `throws` 子句。如果尝试在 `run()` 方法中抛出受检异常，编译器会报错。

如果需要抛出受检异常并获取任务执行结果，可以使用 `Callable` 接口替代 `Runnable`。`Callable` 的 `call()` 方法可以抛出受检异常，并且可以返回结果。

```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        return "线程执行完成";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        FutureTask<String> futureTask = new FutureTask<>(new MyCallable());
        Thread thread = new Thread(futureTask);
        thread.start(); // 启动线程
        System.out.println(futureTask.get()); // 获取线程返回值
    }
}
```

### 使用线程池

通过线程池（如 `ExecutorService`）来管理线程的创建和执行。

`ExecutorService` 的 `submit()` 方法可以接受以下类型的任务：

1. **`Runnable` 任务**：返回 `Future<?>`，任务没有返回值。
2. **`Callable` 任务**：返回 `Future<T>`，任务可以有返回值和抛出异常。
3. **`Runnable` 任务 + 预定义结果**：返回 `Future<T>`，任务没有返回值，但可以指定一个结果。
4. **其他实现了 `Runnable` 或 `Callable` 的对象**：返回 `Future<?>` 或 `Future<T>`。
5. 这个 `Future` 对象可以用来检查任务是否完成，或者取消任务。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.submit(() -> {
            System.out.println("线程执行中");
        });
        executor.shutdown(); // 关闭线程池
    }
}
```

### 停止线程的方式





### 线程状态

+ NEW：创建，new一个线程对象
+ RUNNABLE：表示线程已经启动，并且正在执行任务或准备执行任务。
  + `RUNNABLE` 状态并不一定意味着线程正在占用 CPU 资源。它只是表示线程已经准备好运行，是否真正运行取决于操作系统的调度。
  + RUNNABL != RUNNING
+ BLOCKED：处于BLOCKED状态的线程正等待锁的释放以进入同步区（获取同步资源）。
  + 当线程尝试获取一个锁但锁已被其他线程占用时，线程会从 `RUNNABLE` 状态进入 `BLOCKED` 状态。
+ WAITING：处于等待状态的线程变成RUNNABLE状态需要其他线程唤醒。
  + 线程调用 `Object.wait()` 方法，等待其他线程调用 `Object.notify()` 或 `Object.notifyAll()`。
  + 线程调用 `Thread.join()` 方法，等待其他线程执行完成。（底层还是用`Object.wait()`实现
  + 线程调用 `LockSupport.park()` 方法，等待其他线程调用 `LockSupport.unpark()`。
+ TIMED_WAITING：超时等待状态。线程等待一个具体的时间，时间到后会被自动唤醒。
  + `Thread.sleep(long millis)`：使当前线程睡眠指定时间；
  + `Object.wait(long timeout)`：线程休眠指定时间，等待期间可以通过`notify()`/`notifyAll()`唤醒；
  + `Thread.join(long millis)`：等待当前线程最多执行`millis`毫秒，如果`millis`为0，则会一直执行；
  + `LockSupport.parkNanos(long nanos)`： 除非获得调用许可，否则禁用当前线程进行线程调度指定时间；
  + `LockSupport.parkUntil(long deadline)`：同上，也是禁止线程进行调度指定时间；
+ TERMINATED：终止状态。此时线程已执行完毕。

![线程状态转换图](java-thread-status.png)

### 锁机制

是的！在 Java 中，如果你想实现 **多线程的同步**（即控制多个线程之间的执行顺序或共享资源的访问），通常需要创建一个 **锁对象**（如 `Object lock`），并通过这个锁来控制各个线程的行为。锁对象是多线程同步的核心工具。

------

#### 1. 为什么需要锁对象？

在多线程环境中，多个线程可能会同时访问共享资源（如变量、集合、文件等），如果没有同步机制，可能会导致 **数据竞争** 和 **不一致性**。锁对象的作用是：

- **互斥访问**：确保同一时刻只有一个线程可以访问共享资源。
- **线程协作**：通过 `wait()` 和 `notify()` 实现线程之间的通信和协作。

------

#### 2. 如何使用锁对象？

以下是使用锁对象实现多线程同步的步骤：

(1) 创建一个锁对象

java

```java
private static final Object lock = new Object();
```

(2) 使用 `synchronized` 保护共享资源

java

```java
synchronized (lock) {
    // 访问共享资源的代码
}
```

(3) 使用 `wait()` 和 `notify()` 实现线程协作

- `wait()`：让当前线程等待，并释放锁。
- `notify()`：唤醒在同一个锁上等待的线程。

------

#### 3. 示例：使用锁对象实现多线程同步

以下是一个生产者-消费者模型的示例，展示了如何使用锁对象控制多个线程的同步：

java

```java
public class ProducerConsumerExample {
    private static final Object lock = new Object(); // 锁对象
    private static boolean dataReady = false; // 数据是否准备好的标志

    public static void main(String[] args) {
        Thread producer = new Thread(() -> {
            synchronized (lock) {
                System.out.println("生产者开始生产数据...");
                try {
                    Thread.sleep(2000); // 模拟生产数据的耗时
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                dataReady = true; // 数据生产完成
                lock.notify(); // 通知消费者线程
                System.out.println("生产者生产数据完成，并通知消费者");
            }
        });

        Thread consumer = new Thread(() -> {
            synchronized (lock) {
                System.out.println("消费者等待数据...");
                while (!dataReady) { // 如果数据未准备好
                    try {
                        lock.wait(); // 消费者线程等待
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("消费者消费数据完成");
            }
        });

        // 启动消费者线程
        consumer.start();

        // 主线程休眠1秒，确保消费者线程先进入等待状态
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 启动生产者线程
        producer.start();
    }
}
```