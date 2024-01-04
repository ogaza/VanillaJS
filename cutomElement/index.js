import "./MyCustomElement/MyCustomElement.js";

// we can create custom elements using js
const myElem = document.createElement("my-element");
document.body.appendChild(myElem);

// depending on where we create sub element
// its styling will or will not affect the
// main page's styling
// const subElem = document.createElement("sub-element");
// document.body.appendChild(subElem);
