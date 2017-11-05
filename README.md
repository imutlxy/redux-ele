# 仿饿了么 app

## 使用的主要类库:
* 管理数据　　react-redux
* 路由跳转　　react-router, react-router-redux
* 国际化　　　react-i18next
* UI　组件　　ant-mobile
* 请求数据　　axios

## 注意
git 设置下面两个，否则会默认替换换行符为系统的换行符。此工程默认使用 Unix 系统换行符 LF。
```
git config core.autocrlf false //关闭 git 换行符的自动转换功能
git config core.safecrlf true  //打开 git 提交换行符混用校验功能
```

## 启动
```
npm install -g cnpm --registry=https://registry.npm.taobao.org // 全局安装 cnpm，已安装请跳过
cnpm i
npm run lintfix // 本工程默认换行符是 LF，如果被 git 或 IDE 自动换成 CRLF，则运行
npm start
```

## 编辑器支持 IDEA
Setting -> Languages -> JavaScript -> 修改为 **ECMAScript 6**

## 后台仓库地址
[node-ele](https://github.com/liangxinwei/node-ele)
