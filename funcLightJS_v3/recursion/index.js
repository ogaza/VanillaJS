const title = "FuncJS - " + "recursion";
document.querySelector("h1").textContent = title;
document.title = title;

// with classic recursion the call stack will grow
// with each recursive call possilby leading to
// a runtime error of stack overflow
function countVowelsClassicRecursion(str, count = 0) {
  count += isVowel(str[0]) ? 1 : 0;

  if (str.length <= 1) {
    return count;
  }
  return countVowelsClassicRecursion(str.slice(1), count);
}

// using this adapter, we eliminate the
// problem of stack overflow when invoking
// a recursive function
// in a trampoline recursive functions adds one frame
// to the stak, then returns a function so the stack
// goes one down again. this is repeated with
// each recursive call. so the stack goes only one frmae up
var countVowels = trampoline(function countVowels(str, count = 0) {
  count += isVowel(str[0]) ? 1 : 0;

  if (str.length <= 1) {
    return count;
  }

  // in order for this recursive function to be
  // adpated by trampoline we wrap the recursive call
  // with a function
  return function f() {
    return countVowels(str.slice(1), count);
  };
});

const myStr = "My string to process with recursive function";

console.log(myStr, "has", countVowelsClassicRecursion(myStr), "vowels");
console.log(myStr, "has", countVowels(myStr), "vowels");

function trampoline(fn) {
  return function trampolined(...args) {
    var result = fn(...args);

    while (typeof result == "function") {
      result = result();
    }

    return result;
  };
}

function isVowel(str) {
  var vowels = ["a", "e", "i", "o", "u", "y"];

  return vowels.includes(str);
}
