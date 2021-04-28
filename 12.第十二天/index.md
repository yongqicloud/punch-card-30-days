
> 一、请描述一下 cookies sessionStorage和localstorage区别？

cookie是为了解决http请求无状态的缺点，可以通过set-cookie字段设置cookie，通过http请求由服务器发送给浏览器，但浏览器发送ajax请求时会自动携带从服务端获取的cookie用于表明身份。cookie最多可以存储4kb。所以一般用来存储登录等验证用户身份的信息。但是cookie可以被js获取，所以不能存放隐私敏感信息。

sessionStorage和localstorage都是浏览器数据存储方案，不同在于sessionStorage是会话级别存储，关闭网页或者浏览器都会清除；而localStorage是永久存储。其两者最多可以存储5M，且不参与与服务端通信。



> 二、介绍一下 node 常用模块，并且详细介绍下 Stream?

fs文件模块、http模块、os操作系统

流（stream）是 Node.js 中处理流式数据的抽象接口。 stream 模块用于构建实现了流接口的对象。流可以是可读的、可写的、或者可读可写的。 所有的流都是 EventEmitter 的实例。

Node.js 创建的流都是运作在字符串和 Buffer（或 Uint8Array）上。 当然，流的实现也可以使用其它类型的 JavaScript 值（除了 null）。 这些流会以“对象模式”进行操作。当创建流时，可以使用 objectMode 选项把流实例切换到对象模式。 将已存在的流切换到对象模式是不安全的。

