### 一、v-model 该如何实现？

v-model 是一个语法糖，内部靠的是：

v-bind:绑定响应式数据   
触发oninput 事件并传递数据

### 二、vue2中为什么检测不到数组的变化，如何解决?

vue2内部通过Object.defineProperty实现，因此无法检测数组/对象的新增

而vue通过对数组方法进行拦截并触发响应，详情可以查看vue源码