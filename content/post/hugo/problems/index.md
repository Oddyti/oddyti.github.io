+++
title = 'Hugo（Stack主题）博客搭建过程中踩过的坑'
date = 2023-10-29T15:46:19+08:00
draft = false
description = '记录了在搭建整个博客以及自定义时遇到的问题和解决方法'
slug = 'hugo-problems'
tags = ['Hugo']
categories = ['学习记录']
image = 'cover.jpg'
+++

## Github仓库双分支分别存放源代码和部署后的代码

最开始我是按照网上的教程将Hugo源代码仓库存放在Github仓库中，并且通过Github Action实现了自动部署。但是便出现了问题，每次我本地提交代码到Github后，Github便会运行设置好的Action指令，在Github进行Hugo部署，便会产生生成好的网页代码文件。

但是带来两个问题，一是部署产生的网页代码文件和源代码文件是不同的，这样便会覆盖掉源代码文件；二是本地如果更新源代码文件后，提交时便会发现本地和Github分支冲突，这时候只能强制push，操作繁琐。

解决思路是在Github仓库新建一个分支，我命令为`deploy`，主分支为`master`，然后将源代码文件存放在`master`分支，部署产生的文件存放在`deploy`分支。便可以解决上述问题。

具体需要修改两个地方。

1. 修改自动部署指令，将部署分支`PUBLISH_BRANCH`值修改为`deploy`

   ```yaml
   - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           PERSONAL_TOKEN: ${{ secrets.DEPLOY_TOKEN}} 
           EXTERNAL_REPOSITORY: name/name.github.io
           PUBLISH_BRANCH: deploy
           PUBLISH_DIR: ./
           commit_message: ${{ github.event.head_commit.message }}
   
   ```

   

2. 修改Github Pages设置，将`Build and deployment`的分支修改为`deploy`分支。

   ![](https://raw.githubusercontent.com/Oddyti/Resources/main/picgo-img/Github-Pages.png)


## Github Action实现自动化部署后域名绑定丢失
每次Push，Github Action自动部署之后，之前在Github Pages设置中绑定的域名便会被清空。
解决方法，在自动部署文件`deploy.yml`部署`job`中添加域名信息。

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    PERSONAL_TOKEN: ${{ secrets.DEPLOY_TOKEN}}
    EXTERNAL_REPOSITORY: name/name.github.io
    PUBLISH_BRANCH: deploy
    PUBLISH_DIR: ./
    commit_message: ${{ github.event.head_commit.message }}
    cname: www.oddyti.com # 你的域名
```

## Stack主题启用Local Search

Stack主题自带Local Search功能，但是启用该功能需要在创建`content/search/index.md`

内容如下：

```toml
+++
title = "Search"
slug = "search"
layout = "search"
outputs = [ "html", "json" ]
+++
```

## 文章本地能够加载图片，Github部署后图片无法加载

文章内插入图片，需要严格按照[Stack文档-Markdown图片插入](https://stack.jimmycai.com/writing/markdown#insert-image-gallery)，文件目录为：

```
content
└── gallery
    └── my-first-gallery
        ├── index.md
        ├── image1.png
        ├── image2.png
        └── image3.png
```

文章Markdown内容为：

```markdown
--- content/gallery/my-first-gallery/index.md ---
![Image 1](image1.png) ![Image 2](image2.png)
![Image 3](image3.png)
```

以下为我的错误展示：

```
content
└── gallery
    └── my-first-gallery
    	└── index.md
    	└── assets
            ├── image1.png
            ├── image2.png
            └── image3.png
```

这样会导致Github部署后无法加载图片。
