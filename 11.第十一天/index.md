一、有没有写过 Koa 中间件，说下中 间件原理，介绍下自己写过的中间件?

Koa 中间件的实现原理，也就是洋葱模型的实现原理，核心在于next的实现。next需要依次调用下一个middleware，当到最后一个的时候结束，这样后面middleware的promise先resolve，然后直到第一个，这样的流程也就是洋葱模型的流程了

二、如何判断当前脚本运行在浏览器还是node环境中？

**通过全局变量判断**

在浏览器环境下有全局变量`window`，
```js
typeof global // 'undefined'
typeof window // 'object'
// 通用全局变量
typeof globalThis // 'object'
```
而在`node`环境下有全局变量`global`。
```js
typeof window // 'undefined'
typeof global // 'object'
// 通用全局变量
typeof globalThis // 'object'
```
为了兼容，有了在两个环境中都可以使用的全局变量`globalThis`（**浏览器中  globalThis = window，node环境中globalThis = global**）