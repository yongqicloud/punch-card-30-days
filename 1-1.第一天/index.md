> 一、编写一个方法，该方法接收两个参数，分别为 k 和 一个无序的纯数字数组。该方法在执行后，会返回数组中第 k 大的数字。特别注意，如果数组中，有两位数值一样的数字，同数值数字排名并列。如 [3,1,3,2,5,4,5] 中，第 1 大的数字为 5，第2大的数字为 4，第5大的数字为 1？

```js
function findK(k, array) {
  const tempArr = array.sort((a, b) => b - a)
  const arr = [...new Set([...tempArr])]
  const length = arr.length
  if (k > length) {
    return arr[length - 1]
  }else {
    return arr[k - 1]
  }
}
const res = findK(2, [9, 1, 3, 3, 5, 7])
console.log('res', res); // 7
```


> 二、__proto__ 和 prototype 之前有什么关系？

1、__proto__是对象的属性，除了Objet.create(null)创建的对象之外都自带__proto__属性。

2、prototype是构造函数的原型，由构造函数创建的对象上的__proto__属性指向构造函数的prototype。
