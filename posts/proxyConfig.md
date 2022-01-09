---
title: 代理配置
description: 由于网络问题，需要做一些代理的设置，这里是我的一些记录
tags:
  - 代理
  - 环境配置
---

- 下载安装 whistle, windows 防火墙开放端口
- w2start 手机连接端口，访问 127.0.0.1:8899 下载证书，安装证书，ios 要信任证书，打开 https 连接
- chrome 安装 SwitchyOmega 把条件都删除，选择规则列表，autoProxy 规则网址填入 https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt 立即更新情景模式(要开代理，注意不要被 switchyOmega 影响到，可以先把他设置为系统代理) 规则下设置 proxy 其他设置直接连接（此时本地代理工具无效），proxy 设置 127.0.0.1 端口 7890 应用选项 选择 auto switch
-
- whistle 抓包遇到的问题
  - whistle 的几个地址，不一定都能用，都试下
  - 不好使的时候，重新弄下防火墙，或者干脆把防火墙关了得了
-
- windows 开启全局代理
  - 自动检测设置 开 ---- 使用代理服务器 开
-
- 参考文档
  - [clash 配合 switch 插件](https://maofun.com/739.html)
  - [whistle 文档](https://wproxy.org/whistle/)
