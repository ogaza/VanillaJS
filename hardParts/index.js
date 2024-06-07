window.addEventListener("DOMContentLoaded", startTheApp);

let myName = "";
let vDOM;
let elems;
let interval = 15;

// this simple example
// shows the ONE DIRECTION
// of changing the data
// representing the page model
// into a page's DOM

// what it means is that in order
// to change how the page looks
// in the browser
// you chage the page model
// instead of changing anything
// in the DOM itself

// once the page model is change
// it is then transladed into the actual DOM
// in a single place that is in the updateDOM
// function

// additional resources:
// https://github.com/UIHP-Challenges/UIHP-Challenges-April23/blob/main/README.md

// this function represents
// the only place in which
// we produce the page model
function createVDOM() {
  return [
    ["input", myName, handle],
    ["div", `Hello ${myName} :)`]
  ];
}

// the DOM is loaded
function startTheApp() {
  console.log("the DOM is loaded, we can start the APP!");

  // refresh the page every 15 miliseconds
  setInterval(updateDOM, interval);
}

// this is the only place
// that renders the page
// based on actual page model
function updateDOM() {
  vDOM = createVDOM();
  elems = vDOM.map(convert);
  document.body.replaceChildren(...elems);
}

// this function changes an elemnt model
// into a DOM element
function convert(node) {
  const elem = document.createElement(node[0]);
  elem.textContent = node[1];
  elem.value = node[1];
  elem.oninput = node[2];

  return elem;
}

function handle(e) {
  myName = e.target.value;
}
