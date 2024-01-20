const title = "FuncJS - point free";

document.querySelector("h1").textContent = title;
document.title = title;

// document.addEventListener("DOMContentLoaded", processTheApp);
// function processTheApp() {
//   document.title = title;
//   document.querySelector("h1").textContent = title;
// }

function not(predicate) {
  return function negated(...args) {
    return !predicate(...args);
  };
}

function when(fn) {
  return function (predicate) {
    return function (...args) {
      if (predicate(...args)) {
        return fn(...args);
      }
    };
  };
}

// *********************
var output = console.log.bind(console);
var printIf = when(output);
var isLongEnough = not(isShortEnough);

function isShortEnough(str) {
  return str.length <= 5;
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
