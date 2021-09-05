### 一、在组件的通信中 EventBus 非常经典，你能手写实现下 EventBus 么？
```js
class Event {
  constructor() {
    this.listeners = {}
  }
  on(eventName, callback){
    if(!Object.keys(this.listeners).includes(eventName)){
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(callback)
    return this
  }
  emit(eventName, ...params) {
    if(!Object.keys(this.listeners).includes(eventName)){
      throw new Error('没有该事件')
    }
    const handlers = this.listeners[eventName]
    handlers.forEach( callback => {
      callback.apply(this, params)
    })
  }
  off(eventName, callback){
    if(!Object.keys(this.listeners).includes(eventName)){
      throw new Error('没有该事件')
    }
    if(!callback){
      this.listeners[eventName].length = 0
    }
    const handlers = this.listeners[eventName]
    handlers.forEach( handler => {
      if(callback === handler){
        const index = handlers.indexOf(callback)
        handlers.splice(index, 1)
      }
    })
  }
  once(eventName, callback){
    const fn = () => {
      this.off(eventName, fn)
      callback()
    }
    this.on(eventName, fn)
  }
}
```
### 二、请介绍一下装饰者模式，并实现？

* 装饰器类是对原始功能的增强。
* 装饰器类和原始类继承同样的父类，这样我们可以对原始类嵌套多个装饰器类。
* 主要解决继承关系过于复杂的问题，通过组合来替代继承。
* 可以通过对原始类嵌套使用多个装饰器。

```js
Function.prototype.before = function (beforeFn) {
  return (...arg) => {
    beforeFn(...arg);
    return this(...arg);
  }
};
Function.prototype.after = function (afterFn) {
  return (...arg) => {
    const result = this(...arg);
    afterFn(...arg);
    return result;
  }
};
```