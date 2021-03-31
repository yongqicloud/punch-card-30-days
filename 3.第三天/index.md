> 一、如何判断this？箭头函数的this是什么？

在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定）

1、若一个函数由函数名直接调用，则该函数作用域内部的this值得是全局对象（浏览器环境为window， nodejs为global），如：
```js
function foo () {
  console.log('this:::', this); 
}

foo() // this -> 全局对象 globalThis

// 在函数内部调用也是如此
(function () {}(
  foo() // this -> 全局对象 globalThis
))
```
2、若一个方法作为对象的属性调用时，该方法内部的this值得是调用该方法的对象（箭头函数除外）
```js
const obj = {
  foo() {
    console.log('this:::', this); 
  }
}
obj.foo() // this -> obj

// 或者
const obj2 = {}

function foo () {
  console.log('this:::', this);
}

obj2.foo = foo
obj2.foo() // this -> obj2
```
3.显示指定this。 由call、apply、bind显示的指定this，this为其中的第一个参数
```js
function foo () {
  console.log('this:::', this);
}

const obj = {}

foo.call(obj) // this -> obj
foo.apply(obj) // this -> obj
foo.bind(obj)() // this -> obj
```

4.箭头函数的this。this与封闭词法环境的this保持一致。在全局代码中，它将被设置为全局对象：
```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true
```
> 二、如何中断ajax请求？
> 可参考mdn或者
https://segmentfault.com/a/1190000037636695

1、如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。当一个请求被终止，它的  readyState 将被置为 XMLHttpRequest.UNSENT (0)，并且请求的 status 置为 0。
```js
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
xhr.open(method, url, true);

xhr.send();

if (OH_NOES_WE_NEED_TO_CANCEL_RIGHT_NOW_OR_ELSE) {
  xhr.abort(); // 请求中断
}
```
2、fetch请求：使用AbortController
```js
var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  ...
  fetch(url, {signal}).then(function(response) {
    ...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}

```
