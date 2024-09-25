const Router = {
  init: function () {
    console.log("router init function");

    // use dom api to change the behaviour of all navigation links
    // taggeg with a specific class
    document.querySelectorAll("a.navlink").forEach(modifyAnchorBehaviour);
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
  console.log("navigating to ", url);
}
