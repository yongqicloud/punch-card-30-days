### 一、了解js中设计模式吗？动手实现一下单例模式？

```js
let instance = null;

class Single {
  constructor (name) {
    this.name = name
  }
}

const createInstance = () => {
  if (instance) return instance;
  instance = new Person()
  return instance
}

const createSignle = (function() {
  let singleInstance = null;
  return function () {
    if (singleInstance) return singleInstance;
    return singleInstance = new Single()
  }
})()

let a = createSignle()
let b = createSignle()

console.log('a = b ?', a === b);
```

### 二、虚拟 DOM 有什么作用，如何构建虚拟DOM？
个人理解：

我认为虚拟Dom是真实Dom树在内存的一个快照，每一次重新渲染都会对应更新一次内存中的虚拟Dom。依靠内存计算速度快的优点，在下一次更新Dom时先内存中的虚拟Dom和要渲染的Dom（此时也是虚拟Dom）进行对比，Diff出变化的部分，在渲染时候只关注改变的Dom元素即可。这样的好处是降低的浏览器的渲染压力。提高cpu的利用率，另外虚拟Dom是使用createElement方法递归创建的一个对象。