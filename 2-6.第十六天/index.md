一、节流和防抖分别是什么？在什么场景下使用？请分别实现一个节流函数和一个防抖函数

节流函数是用来降低函数执行频率的（在T时间内只执行一次，周期为T）
```js
/**
 * 节流函数 时间戳版本
 * @param {Function} func 待节流函数
 * @param {Number} wait 节流周期
 */
function throttle (func, wait) {
  let startTime = Date.now()
  return function (params) {
    const shouldCall = Date.now() - startTime > wait
    if (shouldCall) {
      func.call(this)
      startTime = Date.now()
    }
  }
}
```
防抖函数是用来在执行完高频触发的函数后的一段时间再执行。（只执行一个）
```js
/**
 * 防抖函数 立即执行+取消立即执行版本
 * @param {Function} func 需要防抖的函数
 * @param {Number} wait 等待时间 毫秒
 * @param {Booolean} immediate 立即执行
 */
 function debounce(func, wait, immediate) {
  let time
  let debounced = function() {
      let context = this
      if(time) clearTimeout(time)
      // 立即执行
      if(immediate) {
          let callNow = !time
          if(callNow) func.apply(context, arguments)
          time = setTimeout(
              ()=>{time = null} //见注解
          , wait)
      } else {
          time = setTimeout(
              ()=>{func.apply(context, arguments)}
          , wait)
      }
  }
  // 取消wait时间内不能执行限制
  debounced.cancel = function() {
      clearTimeout(time)
      time = null
  }

  return debounced
}

```
二、怎么禁止让js读取cookie？怎么让cookie只在HTTPS下传输？

设置HttpOnly可以禁止JS访问cookie

设置Secure=true可以保证cookie旨在ssl协议通道下传输
