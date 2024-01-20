// wrapper example

// a global variable p
var p = { x: 1 };
console.log("global p initially:", p);

// wraper makes an impure function call pure
// in this case by making copy of global variable
// and passing this copy to impure function
function wrapper(p) {
  const pCopy = { ...p };

  return change(pCopy);
}

// this function is impure
// becuse it changes the content
// of the object passed to it
// as a parameter
function change(p) {
  p.x = p.x + 1;

  return p;
}

const wrapperResult = wrapper(p);
console.log("result of wrapped change:", wrapperResult);

console.log("global p finally:", p);

// adpater excercise

// in this case we have no access to a lexical scope of a function
// that simpy modifies a variable from its outer scope
// for example lets say it modifies a global variable
// to contain such impurity we make a snapshot
// of this global variable before the impure function call
// we invoke the impure function
// finally we restore the global variable from the snapshot

var globalVariable = { value: 1 };
console.log("global variable initially: ", globalVariable);

function modifyGlobalVariable() {
  globalVariable.value = globalVariable.value + Math.floor(Math.random() * 100);
}

// take a snapshot
const snapshot = { ...globalVariable };

// call the impure function
modifyGlobalVariable();
console.log(
  "global variable after an impure function call and before its restore: ",
  globalVariable
);

// restore global variable
globalVariable = snapshot;
console.log("global variable after  restore: ", globalVariable);
