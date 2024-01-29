const title = "FuncJS - " + "reducer";
document.querySelector("h1").textContent = title;
document.title = title;

var myDict = reduce(addToRecord, {}, [
  ["firstName", "olaf"],
  ["lastName", "gaza"]
]);

console.log(myDict);

// we can define custom reduce function as follows or...
function reduce(reducer, initVal, arr) {
  var result = initVal;

  for (let elem of arr) {
    result = reducer(result, elem);
  }

  return result;
}

function addToRecord(record, [key, value]) {
  return { ...record, [key]: value };
}

// ... w can use built in function of the Array
// prototype
var myDict = [
  ["age", "39"],
  ["location", "Krakow"]
].reduce(addToRecord, myDict);

console.log(myDict);

// we can also implement function composition using
// reduce or the reduceRight
function compose(...fns) {
  return function composed(v) {
    return fns.reduceRight(invoke, v);
  };

  function invoke(val, fn) {
    return fn(val);
  }
}

const addOneAndVivByTwo = compose(divTwo, addOne);

console.log(addOneAndVivByTwo(7));

function addOne(x) {
  return x + 1;
}

function divTwo(x) {
  return x / 2;
}
