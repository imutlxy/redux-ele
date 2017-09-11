# 练习 react-redux，react-router

## 主要包含的功能:
* 接入了 react-redux store
* 接入了 react-router，并通过中间件注入到 store 中，统一通过触发 action 实现路由跳转
* 接入了 react-i18next 实现国际化
* 分离 action、reducer、middleware 到各模块中，最后合并并注入到 store 中
 
## 启动
```
npm install -g cnpm --registry=https://registry.npm.taobao.org // 全局安装 cnpm，已安装请跳过
cnpm i
npm run lintfix // 默认换行符是 LF，如果被 git 或 编辑器自动换成 CRLF，则运行
npm start
```

## 注意
git 设置下面两个，否则会默认替换换行符为系统的换行符。此工程默认使用 Unix 系统换行符 LF。
```
git config core.autocrlf false //关闭 git 换行符的自动转换功能
git config core.safecrlf true  //打开 git 提交换行符混用校验功能
```

## 编辑器支持 IDEA
Setting -> Languages & Frameworks -> JavaScript -> 修改为 **ECMAScript 6**
    
## 后台仓库地址
[node-ele](https://github.com/liangxinwei/node-ele)
