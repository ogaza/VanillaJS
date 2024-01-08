const options = {
  // by default once is false
  // once means that event handler is fired once and
  // removed from event handlers for a given event
  // once: true,
  once: false,
  // thing to remember is that js is sharing one thread with
  // the page rendering process
  // the browser waits to see if the event handler changes the DOM
  // passive true is like telling the browser that this event handler
  // will not change the DOM so the browser does not need to
  // wait for the handler execution end before painting the page
  passive: true
};

const button = document.querySelector("button");
const paragraph = document.querySelector("p");

// addEventListener uses the observer pattern
// with this you can register many handlers
// for the same event
// this is the preferred way for registering event handlers
// whenn you use onclick method for example
// there will be only one event handler
button.addEventListener("click", eventHandler, options);

var clickCounter = 0;

function eventHandler(event) {
  console.log("button clicked");
  paragraph.textContent = `button clicked ${++clickCounter} times`;
}

// the oposit to addEventListener is to use
// removeEventListener like button.addEventListener("click", eventHandler)
// this is useful mostly in a single page application when you add and remove
// dom elements and we do not want to have lots of functions in memory
// that we do not use anymore

// we can also broadcast custom events through document or window or a regular
// page element like button for example and by doing this
// inform some other part of the application of sth that just happened
// const event = new Event("myevent");
// element.dispatchEvent(event);
