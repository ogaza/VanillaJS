class MyOtherElement extends HTMLElement {
  // constructor is where we can set up initial state and event handlers
  // you can use params in the constructor to pass objects and functions
  // to the instance of the custom element
  // but whatever you want to pass from the html must be in the form of string
  constructor() {
    super();

    const myProperty = this.dataset.myproperty;
    console.log(myProperty);
  }

  // lifecycle event handlers
  // element is added to the document
  // what we do here is overriding of the same method from the super class
  connectedCallback() {
    console.log("element is added to the document");
  }
  // element is removed from the document
  disconnectedCallback() {}
  // element has beenmoved to another document
  adoptedCallback() {}

  // this callback is related to the concept of the shadow DOM
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define("my-other-element", MyOtherElement);
