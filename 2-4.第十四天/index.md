
> 一、Token 一般是存放在哪里? Token 放在 cookie 和放在localStorage、sessionStorage 中有什么不同?

1、localStorage

优点：没有时间限制的存储，会一直存放在浏览器中。

缺点：由于LocalStorage 可以被 javascript 访问，所以容易受到XSS攻击。所以可以在一个统一的地方复写请求头，让每次请求都在header中带上这个token， 当token失效的时候，后端会返回401，这个时候在你可以在前端代码中操作返回登陆页面，清除localstorage中的token。（适用于 ajax请求或者 api请求，可以方便的存入 localstorage）另外，需要应用程序来保证Token只在HTTPS下传输。

2、cookie

优点：可以防止 csrf攻击，因为 csrf只能在请求中携带 cookie，而这里必须从 cookie中拿出相应的值并放到 authorization 头中。实际上cookie不能跨站（同源策略）被取出，因此可以避免 csrf 攻击。（适用于 ajax请求或者 api请求，可以方便的设置 。


> 二、WebSocket 是怎么实现点对点通信和广播通信的？

建议先了解一下websocket：https://zhuanlan.zhihu.com/p/74326818·