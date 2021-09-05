### 一、Vue3 中 Teleport 的作用是什么？

Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件。
类似于React中的传送门（Portals）

### 二、说一下vue3的composition api?

composition api将之前在vue组件实例上的方法抽离封装成函数调用。这样我们不必通过this来访问，而是直接通过import函数来调用，也更好的支持了tree shaking，更好的逻辑服用。