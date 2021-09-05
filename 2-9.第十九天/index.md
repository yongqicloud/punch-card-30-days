### 一、 在 React 项目中，想要进行逻辑复用,有哪些方案？

HOC(高阶组件)、render props、Hooks

### 二、在 React 中，针对类组件 和 函数组件，分别怎么去进行性能优化？

class组件一般使用purComponents组件，shouldComponentUpdate钩子函数、memo函数进行优化

function组件一般使用hooks Api 其中useCallback、 memoized，等都可以进行性能优化