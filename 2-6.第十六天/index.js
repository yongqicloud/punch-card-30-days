function debounce (fn, wait = 1000) {
    let timer;
    return function (...args) {

      timer && clearTimeout(timer)

      timer = setTimeout(() => {
        fn.call(this, ...args)
      }, wait)
    }
}