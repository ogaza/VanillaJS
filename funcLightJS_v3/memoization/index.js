const title = "FuncJS - memoization";
document.querySelector("h1").textContent = title;
document.title = title;

function repeater(func) {
  var invoked;
  var value;

  return function invoke() {
    if (!invoked) {
      invoked = true;
      value = func();
    }
    return value;
  };
}

function someFunction() {
  console.log("someFunction invocation");

  return Math.floor(Math.random() * 100);
}

var memoized = repeater(someFunction);
var memoized2 = repeater(someFunction);

console.log(memoized());
console.log(memoized());

console.log(memoized2());
console.log(memoized2());

console.log(memoized());

console.log(memoized2());
console.log(memoized2());
