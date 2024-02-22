const title = "FuncJS - " + "transduction";
document.querySelector("h1").textContent = title;
document.title = title;

var mapReducer = R.curry(mapReducerFn);
var filterReducer = R.curry(filterReducerFn);

var list = [1, 2, 3, 4];
console.log("list:", list);

var newList = list.reduce(mapReducer(addOne)(listCombination), []);
console.log("new list:", newList);

var filteredNewList = newList.reduce(filterReducer(isOdd)(listCombination), []);
console.log("filtered new list:", filteredNewList);

// the same with combining the reducers - transduction
const transducer = R.compose(mapReducer(addOne), filterReducer(isOdd));
const summed = list.reduce(transducer(sum), 0);
console.log(summed);

console.log("-----------------");
// using library like ramda it should be possible
// to use its utility functions:
// R.transduce(transducer, sum, 0, list)

// the following does not work:
// const firstOddTransducer = R.compose(mapReducer(addOne), filterReducer(isOdd));
// but this works just fine:
const firstOddTransducer = R.compose(R.map(R.add(1)), R.filter(isOdd));
// const firstOddTransducer = R.compose(R.filter(isOdd), R.map(R.add(1)));
const result = R.transduce(firstOddTransducer, sum, 0, list);
// the following code returns [3,5]
// const result = R.transduce(
//   firstOddTransducer,
//   R.flip(R.append),
//   [],
//   [1, 2, 3, 4]
// );
// const result = R.transduce(firstOddTransducer, sum, 0, list);
console.log(result);

// -------------------------------------------------------
function mapReducerFn(mapFn, combineFn) {
  return function reducer(list, v) {
    return combineFn(list, mapFn(v));
  };
}

function filterReducerFn(predicateFn, combineFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) {
      return combineFn(list, v);
    }
    return list;
  };
}

function listCombination(list, v) {
  return [...list, v];
}

function isOdd(x) {
  return x % 2 === 1;
}

function addOne(x) {
  return x + 1;
}

function sum(x, y) {
  return x + y;
}

// function fullName(firstName, lastName) {
//   return firstName + " " + lastName;
// }
// const toUpperFullName = R.compose(R.toUpper, fullName);

// console.log(toUpperFullName("James", "Bond"));
