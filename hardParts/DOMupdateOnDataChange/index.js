window.addEventListener("DOMContentLoaded", startTheApp);

let myName = "";
let vDOM;
let elems;

function createVDOM() {
  return [
    ["input", myName, handle],
    ["div", `Hello ${myName} :)`]
  ];
}

// the DOM is loaded
function startTheApp() {
  console.log("the DOM is loaded, we can start the APP!");

  // initial render of the page
  updateDOM();
}

function updateDOM() {
  vDOM = createVDOM();
  elems = vDOM.map(convert);
  document.body.replaceChildren(...elems);
}

function convert(node) {
  const elem = document.createElement(node[0]);
  elem.textContent = node[1];
  elem.value = node[1];
  elem.oninput = node[2];

  return elem;
}

function handle(e) {
  myName = updateMyName(e.target.value);
}

function updateMyName(value) {
  myName = value;
  updateDOM();
}
