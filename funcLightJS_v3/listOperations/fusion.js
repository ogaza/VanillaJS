import {} from "./index.js";

// fusion is the process of composing functions together

const numbers = [1, 2, 3];
console.log("rough numbers:", numbers);

// we declaritively create a processing flow for numbers
// first we add one to each number, then we multiply by two.
// Everything using pure functions
const composed = compose(multiplyByTwo, addOne);
const processedNumbers = numbers.map(composed);

console.log("processed numbers:", processedNumbers);

// one note here:
// the numbers.map(...) invocation is impure
// we rather use a standalone function map not the one
// attached to an array object
// we prefer standalone function because its result
// can be fruther processed, composed, etc. using the functional
// programing concepts

function compose(...funcs) {
  return pipe(...funcs.reverse());
}

function pipe(...funcs) {
  return function piped(value) {
    for (let func of funcs) {
      value = func(value);
    }

    return value;
  };
}

function addOne(x) {
  return x + 1;
}

function multiplyByTwo(x) {
  return 2 * x;
}
