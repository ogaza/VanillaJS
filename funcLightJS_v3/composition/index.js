const title = "FuncJS - " + "composition";
document.querySelector("h1").textContent = title;
document.title = title;

function pipe(...funcs) {
  return function piped(value) {
    for (let func of funcs) {
      value = func(value);
    }

    return value;
  };
}

function compose(...funcs) {
  return pipe(...funcs.reverse());
}

function addOne(x) {
  return x + 1;
}

function multiplyByTwo(x) {
  return 2 * x;
}

const composed = compose(addOne, multiplyByTwo);
const piped = pipe(addOne, multiplyByTwo);

console.log(composed(1));
console.log(piped(1));
