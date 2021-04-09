> vue中computed和watch区别?

watch用于侦听响应式数据的变化，如props、data、computed中的变量。

computed用于处理较复杂的逻辑运算，通常处理一个或者多个变量后返回新的值。其中依赖的变量更新也会导致返回的值更新。并且computed有缓存机制，只有依赖的值发生改变时候才会重新计算，性能更好。而在vue3
中做了优化，只有返回的值被使用的时候才会重新计算，依靠内部的lazy属性，惰性计算。

computed 的特点  
1. 支持缓存，只有依赖数据发生改变，才会重新进行计算

2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化

3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过的数据通过计算得到的

4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed

5. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。
6. 
computed源码的流程: 

1. 初始化的时候会获取computed里的定义。

2. 通过遍历第一步的结果，按照computed新的变量名生成Watcher实例。

3. computed的watcher默认是lazy模式的，所以new Watcher 的时候不会调用watcher实例的get方法

4. vue 为computed 里的每个key 代理了一个新的get方法createComputedGetter()，当render页面的时候，新的get调用computed watcher实例的默认get方法。

5. computed执行自定义get方法的时候，会判断是否依赖又变动，没有的话，直接取值，否则去执行获取依赖的变量。

6. 获取依赖变量的时候，将computed的watcher实例订阅到依赖的变量的Dep里。

7. 走完这一步后，再调用计算列的watcher.depend将组件的watcher实例也订阅到计算列依赖的所有变量的dep中。

8. 这样，当变量变化后，会通知computed的watcher将dirty设置为true， 以及组件的watcher更新dom。

侦听属性watch 的特点

1. 不支持缓存，数据变，直接会触发相应的操作；

2. watch支持异步；

3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；

4. 当一个属性发生变化时，需要执行对应的操作；一对多；

5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作

Watch源码的工作流程:

1. 初始化组件上配置的watcher属性

2. 对watcher属性可能的写法进行规整，得出key和handle

3. 通过new Watcher 来创建一个基于key和handle的观察者

4. Watcher 的key为响应式的vm 上的变量，在watcher.get的时候，watcher订阅了对应key的变化。完成响应依赖。

5. 当key的值发生了变化，触发watcher的更新方法，并执行回调函数handle
> React 的组件间通信都有哪些形式？

父传子： props

子传父： 父组件通过props传递回掉函数给子组件，由子组件执行并传递参数给父组件。

跨级组件通信：context、redux、发布订阅模式构建event bus