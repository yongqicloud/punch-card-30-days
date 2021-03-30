> 一、call(), .apply() .bind() 的区别和作用？bind 方法如何来实现？

1、这三种方法都是用来绑定执行上下文`this`的, 这三个方法接受的第一个参数都是要绑定的this对象。当传递null或者undefined时，会自动替换为全局对象（非严格模式下）。

2、call和appply都是`立即调用`绑定了指定this对象的函数，不同在于call接收的是一个参数列表，而apply接受的是一个参数数组。

3、bind方法区别于其他两者，不同在于，**它不是立即调用这个函数，而是将要调用的函数绑定指定this对象后并返回**。

bind方法实现
```js
 Function.prototype.bind = function (context = window, ...bindArgs) {
  const fn = this;
  
  if (typeof fn !== 'function') {
    throw new Error('必须为函数')
  }

  return function bindFn(...funcArgs) {
    const args = [...bindArgs, ...funcArgs]
    if (this instanceof bindFn) {
      return new fn(...args)
    }
    return fn.call(context, ...args)
  }
}
```
> 二、js中基础数据类型有哪几种?了解包装对象么？

null, undefined, number, string, boolean, symbol, bigInt(ES2020)

数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象“，所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。

```js
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"
```
上面代码中，基于原始类型的值，生成了三个对应的包装对象。可以看到，v1、v2、v3都是对象，且与对应的简单类型值不相等。

包装对象的设计目的，首先是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型，其次是使得原始类型的值也有办法调用自己的方法。

Number、String和Boolean这三个原生对象，如果不作为构造函数调用（即调用时不加new），而是作为普通函数调用，常常用于将任意类型的值转为数值、字符串和布尔值