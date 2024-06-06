window.addEventListener("DOMContentLoaded", startTheApp);

let myName = "";
let jsInput;
let jsDiv;
let vDOM;
let interval = 15;

// the DOM is loaded
function startTheApp() {
  console.log("the DOM is loaded, we can start the APP!");
  // first render
  updateDOM();
  // refresh the page every 15 miliseconds
  setInterval(updateDOM, interval);
}

function updateDOM() {
  var isFocused = document.activeElement == jsInput;

  vDOM = createVDOM();
  jsInput = convert(vDOM[0]);
  jsDiv = convert(vDOM[1]);

  document.body.replaceChildren(jsInput, jsDiv);

  if (isFocused) {
    jsInput.focus();
  }
}

function createVDOM() {
  return [
    ["input", myName, handle],
    ["div", `Hello ${myName} :)`]
  ];
}

function convert(node) {
  const elem = document.createElement(node[0]);
  elem.textContent = node[1];
  elem.value = node[1];
  elem.oninput = node[2];

  return elem;
}

function handle() {
  myName = jsInput.value;
}
