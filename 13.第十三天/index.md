> Node 如何和 MySQL 进行通信


1、首先安装mysql模块
```shell
cnpm install mysql
```
2、通过mysql模块的api开启连接。
```js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
```

> 浏览器为什么要阻止跨域请求? 如何解决跨域? 每次跨域请求都需要 到达服务端吗?(快手)

现代浏览器出于安全考虑，都会去遵守一个叫做“同源策略”的约定，同源的意思是两个地址的协议、域名、端口号都相同的情况下，才叫同源。这个时候两个地址才可以相互访问 cookie、localStorage、sessionStorage、发送 ajax 请求，如果三者有一个不同，就是不同源，这时再去访问这些资源就叫做跨域。

解决跨域：

  jsonp，

  使用`<img />`、`<script />`、`<link />`等标签的src属性可以不被跨域拦截。

  postMessage

  服务器设置

  WebSocket协议跨域

#### 每次跨域请求都需要 到达服务端吗

简单请求会直接到达服务端（get、post、head），复杂请求如delete、put会先发出option预检请求，由服务器返回可访问的域名清单和headers等信息。若服务器不同意跨域，则不会发出正式请求。