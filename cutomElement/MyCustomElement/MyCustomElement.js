import "../SubElement/SubElement.js";

export class MyElement extends HTMLElement {
  // constructor is where we can set up initial state and event handlers
  // you can use params in the constructor to pass objects and functions
  // to the instance of the custom element
  // but whatever you want to pass from the html must be in the form of string
  constructor() {
    super();

    // this is how and where we create a shadow DOM manually
    // in a custom element - within a constructor and
    // saving it in the created object instance property
    this.root = this.attachShadow({ mode: "open" });

    // if we tried to load the html in the constructor
    // and attach it to this element's DOM
    // we would get an error, as the DOM for the element (we do not
    // talk here about shadow DOM) does not exist yet

    // to style an elemet we create an empty style node within the shadow DOM
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    // and we fill the style node with the content from
    // the fetched css file
    fetchCSS();

    // fetch file with the component styling
    async function fetchCSS() {
      // we can improve the performance of this file load
      // adding a link with prefetch to the main html file
      // so when we make this request the browser will most probably
      // already have the file
      // <link rel="preload" href="/cutomElement/MyCustomElement.css" as="stylesheet">
      const request = await fetch(
        "/cutomElement/MyCustomElement/MyCustomElement.css"
      );
      const css = await request.text();

      styles.textContent = css;
    }
  }

  // lifecycle event handlers
  // element is added to the document (DOM)
  // what we do here is overriding of the same method from the super class
  connectedCallback() {
    // here we can create a markup for the component
    // and attach it to its shadow DOM
    // we can create the markup for a custom element in several ways
    // use DOM API
    // use templates from the main html file
    // use prefetched external html file
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser

    // loading element template from the main page's html
    // and attach it to the shadow DOM - this can be done
    // in the constructor as well
    const template = document.getElementById("my-element-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // we can create another custom sub element
    // and attach it to the main element's shadow DOM
    const subElem = document.createElement("sub-element");
    const placeholder = this.root.querySelector(".my-element__placeholder");
    placeholder.appendChild(subElem);

    // similarly, we have several ways in which we can apply styling
    // to a custom element
    // we can use CSSOM - CSS object model - like DOM but for CSS
    // we can use script tag in the template
    // we can use link tag in the template
    // we can use prefetched external css file and inject it into the
    // shadow DOM

    // by default there is no link between a html template and a custom element
    // we link them together manually using js code
    // this.root.appendChild(null);
  }
  // element is removed from the document
  disconnectedCallback() {}
  // element has beenmoved to another document
  // this is also when a component is moved from the shadow DOM
  // to the main page's DOM
  adoptedCallback() {}

  // this callback is related to the concept of the shadow DOM
  attributeChangedCallback(name, oldValue, newValue) {}
}

// note: custom element name must contain hyphen -
// this is required for future compatibility
// so the name like carousel is not correct
// but my-carousel is totally fine
customElements.define("my-element", MyElement);
