let instance = null;

class Single {
  constructor (name) {
    this.name = name
  }
}

const createInstance = () => {
  if (instance) return instance;
  instance = new Person()
  return instance
}

const createSignle = (function() {
  let singleInstance = null;
  return function () {
    if (singleInstance) return singleInstance;
    return singleInstance = new Single()
  }
})()

let a = createSignle()
let b = createSignle()

console.log('a = b ?', a === b);