/**
 * bind 方法实现
 */

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