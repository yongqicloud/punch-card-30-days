> 一.什么是回调?回调使用中存在什么问题?

个人理解，就是函数执行完回头再调用的函数，或者说是函数执行一部分代码后调用的函数。举个例子：
```js

function foo (callback) {

  // do somthing ...

  fetch('www.source.cn').then((result) => {
    callback(result)
  })

  // do somthing else ...
}

// do somthing 1
foo((result) => {
  // console.log(result)
  document.body.innnerHTML = result
})
// do somthing 2

```
在如上例子中，模拟了一个请求html资源并渲染到页面上的例子。foo函数在执行的时候传递进去了一个匿名函数`(result) => {document.body.innnerHTML = result}`,而函数foo在执行过程中请求了资源服务器获取了一个DOM内容。这个请求是有延迟的。也就是说执行完foo后会立即执行下面的`do somthing 2`。之后等到请求回来会执行foo()里面的callback。而这里的callback是执行完同步代码，回头再执行的函数。这就是回掉函数。

#### 回掉地狱问题
当某个请求的结果依赖于另一个请求的结果时，如果我们用回掉函数的方法来获取请求结果。那么另一个请求也只能在该函数的回掉函数里面做。
```js
request('example1.com', {} ,(result1) => {
  request('example2.com', {data: result1}, (result2) => {
    request('example3.com', {data: result2}, (result3) => {
      console.log('最终结果：', result3)
    })
  })
}),

```
上面这个例子，为了获取最终结果，一下嵌套了三层，而实际开发中可能要比这复杂的多，不仅代码阅读起来不直观，可维护性也很不好。所以有了后续的`Promise`链式调用以及`async await`同步调用等方法
> 二.Promise.allSettled 了解吗？动手实现一下 Promise.allSettled?

Promise.allSettled()

Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

当有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。

#### 返回值

一旦所指定的 promises 集合中每一个 promise 已经完成，无论是成功的达成或被拒绝，未决议的 Promise将被异步完成。那时，所返回的 promise 的处理器将传入一个数组作为输入，该数组包含原始 promises 集中每个 promise 的结果。

对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。value（或 reason ）反映了每个 promise 决议（或拒绝）的值。

