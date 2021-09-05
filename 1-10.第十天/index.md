> 一、说一下React Hooks在平时开发中需要注意的问题和原因? 

建议看一下他人总结：**eact Hooks 常见问题及解决方案**https://blog.csdn.net/zgd826237710/article/details/108748168


> 二、React 的 setState 方法是异步还是同步？

### 1.钩子函数和合成事件中
在react的生命周期和合成事件中，react仍然处于他的更新机制中，这时isBranchUpdate为true。

按照上述过程，这时无论调用多少次setState，都会不会执行更新，而是将要更新的state存入_pendingStateQueue，将要更新的组件存入dirtyComponent。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件didmount后会将isBranchUpdate设置为false。这时将执行之前累积的setState
### 2.异步函数和原生事件中
由执行机制看，setState本身并不是异步的，而是如果在调用setState时，如果react正处于更新过程，当前更新会被暂存，等上一次更新执行后在执行，这个过程给人一种异步的假象。

在生命周期，根据JS的异步机制，会将异步函数先暂存，等所有同步代码执行完毕后在执行，这时上一次更新过程已经执行完毕，isBranchUpdate被设置为false，根据上面的流程，这时再调用setState即可立即执行更新，拿到更新结果
### 3.partialState合并机制
```
  _processPendingState: function (props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }
    // 重点
    var nextState = _assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
```
##### 核心
```
_assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
```
* 若传入对象
```
Object.assign(
  nextState,
  {index: state.index+ 1},
  {index: state.index+ 1}
)
```
### 4.componentDidMount调用setstate
`
在componentDidMount()中，你 可以立即调用setState()。它将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了在此情况下即使render()将会调用两次，用户也不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。在大多数情况下，你可以 在constructor()中使用赋值初始状态来代替。然而，有些情况下必须这样，比如像模态框和工具提示框。这时，你需要先测量这些DOM节点，才能渲染依赖尺寸或者位置的某些东西。
`

以上是官方文档的说明，不推荐直接在componentDidMount直接调用setState，由上面的分析：componentDidMount本身处于一次更新中，我们又调用了一次setState，就会在未来再进行一次render，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。

当然在componentDidMount我们可以调用接口，再回调中去修改state，这是正确的做法。

当state初始值依赖dom属性时，在componentDidMount中setState是无法避免的。
### 5.componentWillUpdate componentDidUpdate
这两个生命周期中不能调用setState。

由上面的流程图很容易发现，在它们里面调用setState会造成死循环，导致程序崩溃。
### 6.推荐使用方法
在调用setState时使用函数传递state值，在回调函数中获取最新更新后的state。

原文转自https://segmentfault.com/a/1190000018260218