function foo () {
  console.log('this:::', this);
}

const obj = {}

obj.foo = foo

// foo()

// obj.foo()
// console.log('global', globalThis);
foo.call({a: 1})