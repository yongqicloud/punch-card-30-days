> vue 中组件间有那些通信方式？

#### 1、父子组件之间

  * 父传子： props
  * 子传父： 事件触发、作用域插槽

#### 2、同级组件之间
分为兄弟组件和非兄弟组件
##### 兄弟组件
  * 利用相同父组件作为媒介
##### 非兄弟组件 
  * event bus 事件触发
  * vuex
#### 3、祖孙元素之间（隔代组件）
  * 依赖注入（provide、inject）
  * vuex
  
另外：

vuex可以在任意关系组件之间传递数据；

`$root`、`$parent`和`$children` 也可以在父子组件之间访问各自的数据

> vue 中 v-show 和 v-if 的区别是什么？

他们之间的区别仅仅在于样式的切换  

  * v-show 仅仅切换display的状态。值为false时为display: none;
  * v-if 在值为false时会直接不渲染对应的HTML元素