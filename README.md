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

## Node.js 后台仓库地址
[node-ele](https://github.com/liangxinwei/node-ele)

## Spring Boot 后台仓库地址
[spring-ele](https://github.com/liangxinwei/spring-ele)

## NPM 依赖包版本号版本范围
| 版本号 | 说明 |
| ------------- | ------------- |
| latest | 最新版本 |
| *，x | 通配符，可以是任何版本 |
| 4，4.*，4.x，~4，^4 | 任何以4开头的最新版本 |
| >4.8.5 | 大于特定版本 |
| <4.8.5 | 低于特定版本 |
| >=4.8.5 | 任何大于或等于 |
| <=4.8.5 | 任何小于或等于 |
| 4.8.3 - 4.8.5 | 等于> = 4.8.3和<= 4.8.5 |
| ~4.8.5 | ~ 会匹配最近的小版本，匹配所有4.8.x版本，**但不到4.9.0** |
| ^4.8.5 | ^ 会匹配最新的大版本，匹配所有4.x.x的包，包括4.9.0，**但不到5.0.0** |
| ~4.8 | 任何兼容 4.8 的版本 |
