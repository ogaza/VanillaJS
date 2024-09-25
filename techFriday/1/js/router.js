const Router = {
  init: function () {
    console.log("router init function");

    // use dom api to change the behaviour of all navigation links
    // taggeg with a specific class
    document.querySelectorAll("a.navlink").forEach(modifyAnchorBehaviour);
  },
  go: function (route, addToHistory = true) {
    console.log("navigating to ", route);

    if (addToHistory) {
      // we use the browser's api
      // the first arg is data which can be anything
      // we pass here an object with a selected route
      // second param is unused
      // the last one is the actual route
      history.pushState({ route }, "", route);
    }

    // publish a custom event
    const event = new Event("locationChanged");
    window.dispatchEvent(event);
  }
};

export default Router;

function modifyAnchorBehaviour(anchor) {
  anchor.addEventListener("click", handleAnchorClicked);
}

function handleAnchorClicked(event) {
  event.preventDefault();

  // this will return the full url (with the host, etc)
  // const url = event.target.href;
  // therefore it maybe better to get the url as follows:
  const url = event.target.getAttribute("href");
  navigateToSelectedUrl(url);
}

function navigateToSelectedUrl(url) {
  Router.go(url);
}
