const Renderer = {
  init: function () {
    console.log("renderer init function");
    // handle location changed
    window.addEventListener("locationChanged", handleWindowLocationChanged);
  }
};

export default Renderer;

const routeViewRenderers = {
  routeNotFound: pageNotFoundView
};

function handleWindowLocationChanged(event) {
  renderMainView();
}

function renderMainView() {
  const route = location.pathname;
  const mainHtmlElem = document.querySelector("main");
  const renderFunction = matchRouteToView(route);
  renderFunction(mainHtmlElem);
}

function matchRouteToView(route) {
  const rendererKey =
    Object.keys(routeViewRenderers).find((x) => x.includes(route)) ??
    "routeNotFound";

  const viewRenderer = routeViewRenderers[rendererKey];

  return viewRenderer;
}

function pageNotFoundView(parentNode) {
  parentNode.textContent = "Page not found";
}
