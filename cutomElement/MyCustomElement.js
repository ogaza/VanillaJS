class MyElement extends HTMLElement {
  constructor() {
    super();
  }
}

// note: custom element name must contain hyphen -
// this is required for future compatibility
// so the name like carousel is not correct
// but my-carousel is totally fine
customElements.define("my-element", MyElement);
