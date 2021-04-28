### 一、vue3中v-model的变化有哪些?
1、vue3取消了.sync修饰符的使用，直接使用v-model替换就行  
2、对于自定义组件使用v-model的时候，prop与事件的默认名称变更
从vue2版本的value/@input变更为modelValue/@update:modelValue  
3、修改model的名称从原来的model选项进行修改，变更为传递参数给model，写法为v-model:argument  
4、使用v-model参数后会改变prop和事件名为argument/@update:argument  
5、vue3一个组件可以同时使用多个v-model进行绑定（vue2.只允许在组件上使用一个 model）  
6、在vue3中v-model支持自定义修饰符，他将会通过props中的modelModifiers属性接收
### 二、说一下 Vue3 与 Vue2 的对比？
1、v-model变化  
2、diff算法  
3、响应式  
4、ts支持  
5、tree-shaking  
6、composition api  
7、生命周期变更 setup  
8、暴露 reactive  ref 等函数