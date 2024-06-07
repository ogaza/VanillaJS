window.addEventListener("DOMContentLoaded", startTheApp);

let myName = "";
let vDOM = createVDOM();
let prevVDOM;
let DOMelems;

function createVDOM() {
  return [
    ["input", myName, handle],
    ["div", `Hello ${myName} :)`]
  ];
}

// the DOM is loaded
function startTheApp() {
  console.log("the DOM is loaded, we can start the APP!");

  // first render
  DOMelems = vDOM.map(convert);
  document.body.append(...DOMelems);

  setInterval(updateDOM, 15);
}

function updateDOM() {
  prevVDOM = [...vDOM];
  vDOM = createVDOM();
  findDiff(prevVDOM, vDOM);
}

function findDiff(prevVDOM, currVDOM) {
  for (let i = 0; i < currVDOM.length; i++) {
    const prev_i_vdom_elem = JSON.stringify(prevVDOM[i]);
    const curr_i_vdom_elem = JSON.stringify(currVDOM[i]);

    if (prev_i_vdom_elem == curr_i_vdom_elem) continue;

    // change the actual DOM elem
    DOMelems[i].textContent = currVDOM[i][1];
    DOMelems[i].value = currVDOM[i][1];
  }
}

function handle(e) {
  myName = e.target.value;
}

function convert(node) {
  const elem = document.createElement(node[0]);
  elem.textContent = node[1];
  elem.value = node[1];
  elem.oninput = node[2];

  return elem;
}
