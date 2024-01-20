const initialStr = "hey!";

function stringBuilder(str) {
  return function next(value) {
    if (typeof value !== "string") {
      return str;
    }

    return stringBuilder((str || "") + value);
  };
}

var builder1 = stringBuilder(initialStr);
var builder2 = stringBuilder(initialStr);

var myString = builder1(" ")("my name is ")("Olaf")();
var theOtherString = builder2(" ")("whats up?")();

console.log(myString);
console.log(theOtherString);
console.log(initialStr);
