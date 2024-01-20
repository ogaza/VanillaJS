// here are examples of making
// function that takes many arguments
// a function that takes for example
// only one ergument

function adaptToOneArgument(func) {
  return function oneArg(arg) {
    return func(arg);
  };
}

function adaptToTwoWrguments(func) {
  return function twoArg(arg1, arg2) {
    return func(arg1, arg2);
  };
}

function functionToBeAdopted(...args) {
  return console.log(args);
}

const functionAdoptedToOneArg = adaptToOneArgument(functionToBeAdopted);
const functionAdoptedToTwoArgs = adaptToTwoWrguments(functionToBeAdopted);

functionAdoptedToOneArg(1, 2, 3, 4); // [1]
functionAdoptedToTwoArgs(1, 2, 3, 4); // [1, 2]

// =========================================
// flip

// this adapter invokes the adapted function with
// two first params flipped
function adaptToFlippedArgs(func) {
  return function flipped(arg1, arg2, ...args) {
    return func(arg2, arg1, ...args);
  };
}

function logXandY(x, y) {
  return console.log(x, y);
}

const logYthenX = adaptToFlippedArgs(logXandY);

logYthenX(2, 1);

// =========================================
// spread args

// here is an example of how to adopt
// a function taking many args
// to take the same params but
// in a single aray

function spreadArgs(func) {
  return function spread(args) {
    // spread an array into seperate arguments
    // using the spread operator
    return func(...args);
  };
}

function funcWithManyArgs(x, y, z) {
  console.log(x, y, z);
}

const functionWithOneArrayArgument = spreadArgs(funcWithManyArgs);
functionWithOneArrayArgument([1, 2, 3]);

// this does the opposite
// adopts a function taking an array
// as a singl argument
// into a function taking multiple args
function unSpreadArgs(func) {
  // spread an array into seperate arguments
  // using the spread operator
  return function spread(...args) {
    return func(args);
  };
}

function f(arr) {
  console.log(...arr);
}

const fWithManyParams = unSpreadArgs(f);
fWithManyParams(11, 22, 33);

// function negation
function not(func) {
  return function negated(...args) {
    return !func(...args);
  };
}

function isOdd(n) {
  return n % 2 == 1;
}

const isEven = not(isOdd);

const n = 5;
console.log(n, "is even - ", isEven(5));
console.log(n, "is odd - ", isOdd(5));
