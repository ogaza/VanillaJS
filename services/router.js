const Router = {
  init: function () {
    // use dom api to change the behaviour of all navigation links
    // taggeg with a specific class
    document.querySelectorAll("a.navlink").forEach(modifyAnchorBehaviour);

    // check the initial url - the location that the user types in the browser
    // may not be the hefault home location, he can type sth like
    // mypage.com/someSubPath - so the deeplink
    Router.go(location.pathname);
  },

  go: function (route, addToHistory = true) {
    console.log(`naviage to ${route}`);

    // the following code is just for presentational purposes
    // it is not generic solution for every application
    // For that there should be some other abstraction layers
    // probably
    // You can always consider using already existing libraries
    // providing the routing functionality
    // that is still a good alternative for using the whole JS
    // framework which contains a router solution as one of its
    // parts

    if (addToHistory) {
      // now we use the browser's api
      // the first arg is data which can be anything
      // we pass here an object with a selected route
      // second param is unused
      // the last one is the actual route
      history.pushState({ route }, "", route);
    }
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

  // the difference between event.target and event.currentTarget
  // target is the element to which the handler is attached
  // currentTarget is the actually for example clicked element
  // so it can be some sub element of for example button or link

  console.log("link clicked, url:", url);
  // change the location using the go function
  Router.go(url);
}

// there are two ways of changing the page's content
// one is to remove one content and put a new content
// to the DOM based on user's actions
// the other way is to show one part and hide the other parts
// using the hidden attribute like
// <section id="sectionOne"> ...
// <section id="sectionTwo" hidden> ...
// which is better?
// it depends for example on the size of the application
// its better to show/hide only in small ones
// but do we always write big applications?
