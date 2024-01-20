var mod2 = mod(2);
var isOne = isEqualTo(1);

// having the utility functions defined below
// see how we can switch the languade of operators
// to the language of function names
function isOdd(n) {
  return isOne(mod2(n));
}

function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function isEqualTo(y) {
  return function forX(x) {
    return x === y;
  };
}

var n = 17;
console.log(n, "is odd", isOdd(n));

// it can be done also taking advantage
// of the fact that isOne(mod2(n)) is
// a function composition

function compose(fn2, fn1) {
  return function composed(val) {
    return fn2(fn1(val));
  };
}

var isOdd_ = compose(isEqualTo(1), mod(2));
n = 24;
console.log(n, "is odd", isOdd_(n));
