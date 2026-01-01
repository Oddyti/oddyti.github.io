+++
title = 'Java线程池(Thread Pool) - 一篇不太详细的解释'
date = 2025-02-24T21:14:04+08:00
draft = false
description = '学习Java线程池(Thread Pool)的总结，主要包括ThreadPoolExecutor类的介绍，Excutors类介绍'
slug = 'thread-pool'
tags = ['JAVA']
categories = ['弄斧']
image = ''
license = false
+++


## 线程池

使用线程池的主要原因：**控制并发数量**

此外：

+ 线程池可以复用已经创建的线程，以降低资源消耗
+ 可以对线程做统一管理

### `ThreadPoolExecutor`类

`ThreadPoolExecutor`类是`Executor`接口的实现类，`Executor` 提供了一种标准的方式来运行任务（`Runnable` 或 `Callable`），而不需要手动创建和管理线程。

```java
public interface Executor {
    void execute(Runnable command);
}
```

`Executor` 本身只是一个接口，它并不直接决定是否开辟新线程。是否开辟新线程取决于 `Executor` 的具体实现。

而**`ThreadPoolExecutor`**：使用线程池中的线程执行任务，不会为每个任务都开辟新线程（除非线程池需要扩展）。

### `ThreadPoolExecutor`核心概念：

+ 核心线程与非核心线程
  + 线程池中有两类线程，核心线程和非核心线程。**核心线程默认情况下会一直存在于线程池中**，即使这个核心线程什么都不干（**铁饭碗**），而非核心线程如果长时间的闲置，就会被**销毁**（**临时工**）。
+ 线程工厂
  + `ThreadFactory` 创建线程的工厂 ，用于批量创建线程，统一在创建线程时设置一些参数，如是否守护线程、线程的优先级等。如果不指定，会新建一个默认的线程工厂。

### `ThreadPoolExecutor`构造方法

`ThreadPoolExecutor`有四个构造方法，其参数主要如下：

+ `int corePoolSize`：核心线程数。
+ `int maximumPoolSize`：最大线程数。
+ `long keepAliveTime`：非核心线程闲置超时时长。
+ `BlockingQueue workQueue`：阻塞队列，维护着**等待执行的Runnable任务对象**。
  + LinkedBlockingQueue：链式阻塞队列，底层数据结构是链表，默认大小是`Integer.MAX_VALUE`，也可以指定大小。
  + ArrayBlockingQueue：数组阻塞队列，底层数据结构是数组，需要指定队列的大小。
  + SynchronousQueue：同步队列，内部容量为0，每个put操作必须等待一个take操作，反之亦然。
  + DelayQueue：延迟队列，该队列中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素 。
+ `ThreadFactory threadFactory`：线程工厂。
  + 创建线程的工厂 ，用于批量创建线程，统一在创建线程时设置一些参数，如是否守护线程、线程的优先级等。如果不指定，会新建一个默认的线程工厂。
+ `RejectedExecutionHandler handler`：拒绝策略。
  + **拒绝处理策略**，线程数量大于最大线程数就会采用拒绝处理策略，一共有四种。
  + ThreadPoolExecutor.AbortPolicy：**默认拒绝处理策略**，丢弃任务并抛出RejectedExecutionException异常。
  + ThreadPoolExecutor.DiscardPolicy：丢弃新来的任务，但是不抛出异常。
  + ThreadPoolExecutor.DiscardOldestPolicy：丢弃队列头部（最旧的）的任务，然后重新尝试执行程序（如果再次失败，重复此过程）。
  + ThreadPoolExecutor.CallerRunsPolicy：由调用线程处理该任务。

### `ThreadPoolExecutor`线程池任务处理流程

1. 任务提交：
   - 通过 `execute(Runnable command)` 方法提交任务。
2. 判断线程数是否小于核心线程数（`corePoolSize`）：
   - 如果当前线程数 < `corePoolSize`，则创建**核心线程**执行任务（优先让核心线程数快速达到上限值）。
   - 如果当前线程数 >= `corePoolSize`，进入下一步。
3. 如果当前线程数 >= `corePoolSize`，尝试将任务加入工作队列（`workQueue`）：
   - 新来的线程任务会进入任务队列中等待，然后空闲的核心线程会依次去缓存队列中取任务来执行（体现了**线程复用**）。 
   - 如果工作队列已满，进入下一步。
4. 如果工作队列已满：
   - 如果当前线程数 < `maximumPoolSize`，则创建新线程（即非核心线程，临时工）执行任务。
   - 如果当前线程数 >= `maximumPoolSize`，进入下一步。
5. 触发拒绝策略（`RejectedExecutionHandler`）：
   - 如果线程池无法接受新任务（线程数达到 `maximumPoolSize` 且工作队列已满），根据设置的拒绝策略处理任务。

![img](线程池任务处理流程.png)

`ThreadPoolExecutor`线程复用原理

具体原理与源码解析移步 [深入浅出Java多线程 - ThreadPoolExecutor如何做到线程复用的？](https://redspider.gitbook.io/concurrent/di-san-pian-jdk-gong-ju-pian/12#id-12.2-xian-cheng-chi-de-yuan-li)

这里简单讲讲：

`ThreadPoolExecutor`在创建线程时，会将线程封装成**工作线程worker**,并放入**工作线程组**中，然后这个worker反复从阻塞队列中拿任务去执行。如果任务队列为空，线程会根据 `keepAliveTime` 和 `allowCoreThreadTimeOut` 的设置决定是否等待或销毁。

### `Excutors`类

`Executors` 是一个工具类，提供了静态工厂方法，用于创建不同类型的线程池。它的主要目的是简化线程池的创建，隐藏底层实现的复杂性。其基本方法主要都由`ThreadPoolExecutor`类实现。

> `Executors` 是对 `ThreadPoolExecutor` 的一种高层抽象，而 `ThreadPoolExecutor` 是线程池的核心实现。

这里讲讲`Executors` 工具类的四个静态方法

**`newFixedThreadPool(int nThreads)`**

创建一个**只有核心线程**且**固定数量**的线程池，。适合任务数量稳定、需要控制并发数量的场景。

> 固定数量工人工厂，

由于线程不会被回收，会一直卡在阻塞，所以**没有任务的情况下， FixedThreadPool占用资源更多**。 

**`newCachedThreadPool`**

创建一个可缓存的线程池，不创建核心线程，**只创建非核心线程**，线程数量会根据任务数量动态调整。

> 只有临时工工厂，有多少任务雇佣多少工人，工人一旦空闲就解雇

当需要执行很多**短时间**的任务时，CacheThreadPool的线程复用率比较高， 会显著的**提高性能**。

**`newSingleThreadExecutor()`**

创建一个单线程的线程池，所有任务按顺序执行。

**有且仅有一个核心线程**（ corePoolSize == maximumPoolSize=1），使用了LinkedBlockingQueue（容量很大），所以，**不会创建非核心线程**。所有任务按照**先来先执行**的顺序执行。如果这个唯一的线程不空闲，那么新来的任务会存储在任务队列里等待执行。

**`newWorkStealingPool()`**

创建一个定长线程池，支持定时及周期性任务执行。

**`newWorkStealingPool()`**

建一个工作窃取线程池，使用 `ForkJoinPool` 实现，适合并行处理任务。并不使用`ThreadPoolExecutor` 实现。

> 就像你开了一家团队协作公司，每个人（线程）不仅做自己的任务，还会偷别人的任务来做，效率更高。