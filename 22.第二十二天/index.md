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