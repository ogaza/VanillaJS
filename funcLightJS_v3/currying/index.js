const title = "FuncJS - " + "currying";
document.querySelector("h1").textContent = title;
document.title = title;

function add(x, y) {
  return x + y;
}

function curriedAdd(constant) {
  return function addConstant(x) {
    return add(x, constant);
  };
}

// the same but using lambda notation
// const curriedAdd = (constant) => (x) => add(x, constant);

const addOne = curriedAdd(1);

const table = [1, 2, 3];
console.log(table);

console.log(table.map(addOne));
