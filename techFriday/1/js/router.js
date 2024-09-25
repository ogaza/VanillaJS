const Router = {
  init: function () {
    console.log("router init function");

    // use dom api to change the behaviour of all navigation links
    // taggeg with a specific class
    document.querySelectorAll("a.navlink").forEach(modifyAnchorBehaviour);

    // this is for handling user nawigation based on the history
    // so when user clicks back for example
    // this is no triggered when a user clicks navigation link
    window.addEventListener("popstate", handlePopstate);

    // check the initial url - the location that the user types in the browser
    // may not be the default home location, he can type sth like
    // mypage.com/someSubPath - so the deeplink
    // NOTE: this will work with the server redirecting
    // requests to the sub page's to the app root url
    Router.go(location.pathname);
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

function handlePopstate(event) {
  // we can take the path to navigate to from
  // current location
  // const url = location.href;
  // const pathname = location.pathname;

  // we can also take the route from the data that we pushed
  // to the history as a first param of the pushState function
  const { state } = event;
  const { route } = state || { route: "" };

  // navigate to the route taken from history, but do nod modify the history
  // therefore the socond arg here needs to be set to false
  Router.go(route, false);
}
