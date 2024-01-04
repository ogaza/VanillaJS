export class SubElement extends HTMLElement {
  constructor() {
    super();
  }

  // element is added to the document (DOM)
  connectedCallback() {
    fetchCSS(this, "/cutomElement/SubElement/SubElement.css");
    loadElementTemplate(this, "sub-element-template");
  }

  // this callback is related to the concept of the shadow DOM
  attributeChangedCallback(name, oldValue, newValue) {}
}

// note: custom element name must contain hyphen -
// this is required for future compatibility
// so the name like carousel is not correct
// but my-carousel is totally fine
customElements.define("sub-element", SubElement);

// loading element template from the main page's html
// and attach it to the elements's DOM
function loadElementTemplate(node, templateId) {
  const template = document.getElementById(templateId);
  const content = template.content.cloneNode(true);
  node.appendChild(content);
}

// there are several ways in which we can apply styling
// to a custom element
// we can use CSSOM - CSS object model - like DOM but for CSS
// we can use script tag in the template
// we can use link tag in the template
// we can use prefetched external css file and inject it into the
// DOM or into the shadow DOM
async function fetchCSS(node, cssFilePath) {
  const request = await fetch(cssFilePath);
  const css = await request.text();

  const styles = document.createElement("style");
  node.appendChild(styles);

  styles.textContent = css;
}
