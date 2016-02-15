# Vue.js + Webpack + Wx  

## Installation
该项目基于vue.js框架，结合webpack实现异步模块加载。因为是微信项目，所以使用了weui。

## Demo
案例代码可以参照 src/wx 目录。

### bash

安装项目依赖

```sh
npm install
```

项目初始化，如下示例，app 为需要开发的项目名称，放在 src 目录下面。该步骤用于初始化项目的webpack配置。

```sh
node init app 
```

开启服务

```sh
node server
```

生成项目静态文件,注意当前正处于哪个项目开发环境里面

```sh
npm run build
```
