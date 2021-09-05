> 一、React 中如何实现路由懒加载？

使用React.lazy()函数进行懒加载

```jsx
import React, {lazy, Suspense} from 'react';
// 通过lazy() api来动态import需要懒加载的组件
const Home = lazy(() => import('./Home'));
const A = lazy(() => import('./A'));
const B = lazy(() => import('./B'));
// 组件懒加载
function MyComponent() {
  return (
    <SomeComponent>
      <!--Suspense来包裹懒加载的组件进行加载，可以设置fallback现实加载中效果 -->
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </SomeComponent>
  );
}
// 路由懒加载
const App = () => (
  <Router>
  <!-- Suspense来包裹懒加载的组件进行加载，可以设置fallback现实加载中效果 -->
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/A" component={A}/>
        <Route path="/B" component={B}/>
      </Switch>
    </Suspense>
  </Router>
)
```

> 二、React 的生命周期函数都有哪些，分别有什么作用？

分为新版生命周期和老版生命周期；

分为挂载期、更新期、组件销毁期

#### mounting

constructor => getDerivedStateFromProps => render => componentDidMount

#### updeting

getDerivedStateFromProps => shouldComponentUpdate => 若返回true则继续后续生命周期，返回false则中断 => render => getSnapshotBeforeUpdate => componentDidUpdate

