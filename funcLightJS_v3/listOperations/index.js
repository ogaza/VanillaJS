const title = "FuncJS - " + "list operations";
document.querySelector("h1").textContent = title;
document.title = title;

const five = constant(5);
const nine = constant(9);

console.log(addn([constant(2), constant(8), five, five, nine, constant(1)]));
// console.log(addn(constant(2), constant(8), five, five, nine, constant(1)));
function constant(n) {
  return function f() {
    return n;
  };
}

// the reduction approach
function addn(fns) {
  const composedFn = fns.reduce(function reducer(bigFn, fn) {
    return function f() {
      return add2(bigFn, fn);
    };
  });

  return composedFn();
}

const numbers = [5, 5, 1, 2, 2];
console.log("numbers:", numbers);

const uniqueNumbers = numbers.reduce(function unique(newList, num) {
  if (newList.includes(num)) {
    return newList;
  }

  return [...newList, num];
}, []);

console.log("unique numbers:", uniqueNumbers);

// change the list of numbers into a list of functions
// then
// get the sum of the unique numbers
// this is by suming the list of function values
const sumOfUniqueNumbers = addn(uniqueNumbers.map(constant));

console.log("sum of unique numbers:", sumOfUniqueNumbers);

// recursive approach
// notice here how the recursive call
// fill the Proper Tail Call Position
// requirement, so this recursion can be
// optimized by the JS engine
// function addn([fn0, fn1, ...rest]) {
//   if (rest.length === 0) {
//     return add2(fn0, fn1);
//   }
//   // recursive call is on an array smaller by one elem
//   return addn([
//     function f() {
//       return add2(fn0, fn1);
//     },
//     ...rest
//   ]);
// }

// deffer the job with functions approach
// function addn(...fns) {
//   while (fns.length > 2) {
//     let [fn0, fn1, ...rest] = fns;

//     fns = [
//       function f() {
//         return add2(fn0, fn1);
//       },
//       ...rest
//     ];
//   }

//   return add2(fns[0], fns[1]);
// }

function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

function add(x, y) {
  return x + y;
}

// function five() {
//   return 5;
// }
// function nine() {
//   return 9;
// }
