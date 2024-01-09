const Renderer = {
  renderRouteView,
  init: function () {
    // handle location changed
    window.addEventListener("locationChanged", handleWindowLocationChanged);
  }
};

const routeViewRenderers = {};

registerView("/router/", renderMainView);
registerView("/router/aboutMe/", renderAboutMeView);

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
function renderRouteView(route, parentNode) {
  const renderView = matchRouteToView(route);

  renderView(parentNode);
}

function matchRouteToView(route) {
  const rendererKey = Object.keys(routeViewRenderers).find((x) =>
    x.includes(route)
  );
  const viewRenderer = routeViewRenderers[rendererKey];

  return viewRenderer;
}

function registerView(route, renderFunction) {
  routeViewRenderers[route] = renderFunction;
}

function renderMainView(parentNode) {
  const parent = parentNode;
  parent.textContent = "Home page";
}

function renderAboutMeView(parentNode) {
  const parent = parentNode;
  parent.textContent = "Page about me";
}

function handleWindowLocationChanged(event) {
  const route = location.pathname;
  // console.log(`window location changed to: ${route}`);

  const pageContentNode = document.querySelector(".page-content");
  Renderer.renderRouteView(route, pageContentNode);
}

export default Renderer;
