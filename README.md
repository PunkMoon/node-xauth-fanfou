# node-xauth-fanfou
基于Express框架完成饭否Xauth验证并提供饭否api调用接口。
## 配置
1.在<http://fanfou.com/apps>申请应用，获取Consumer key以及Consumer secret，填入routes/index.js中。<br/>
2.在安装Node的情况下安装项目相关依赖模块，在文件根目录下运行```npm install```<br/>
3.运行```npm start```,启动应用，在浏览器中打开```http://localhost:3000/```,说明应用已经在本机中运行,此时可以进行饭否相关api的调用<br/>
4.在调用饭否api前需要先获取Access Token，ajax请求url为```http://localhost:3000/token```,服务端需接收前端传递的过来的用户名及密码
```{username:'your-fanfou-username',password:'your-fanfou-password'}```<br/>
5.获取到Access Token后，调取api的时候需要传递给服务端的参数如下,相关api参照[饭否官方api文档](https://github.com/FanfouAPI/FanFouAPIDoc/wiki/Apicategory)
```
{
    token:'',
	secret:'',
	path:'',//参照饭否api文档,例如statuses/home_timeline.json?format=html
	param:'{}'//使用post方法时需要向服务端传输的数据
 }
 ```
6.需要使用get方法时，请求地址为```http://localhost:3000/get```,使用post方法时，请求地址为```http://localhost:3000/post```.
