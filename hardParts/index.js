window.addEventListener("DOMContentLoaded", startTheApp);

let myName = "";
let interval = 15;

const vDOM = [
  ["input", myName, handle],
  ["div", `Hello ${myName} :)`]
];

// the DOM is loaded
function startTheApp() {
  console.log("the DOM is loaded, we can start the APP!");

  // refresh the page every 15 miliseconds
  setInterval(updateDOM, interval);
}

function updateDOM() {
  const elems = vDOM.map(convert);
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
  myName = e.target.value;
}
