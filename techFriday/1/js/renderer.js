import {
  aboutMeComponent,
  homeComponent,
  pageNotFoundComponent
} from "./components.js";

const Renderer = {
  init: function () {
    console.log("renderer init function");
    // register views
    registerViews();
    // handle location changed
    window.addEventListener("locationChanged", handleWindowLocationChanged);
  }
};

export default Renderer;

const routeViewRenderers = {};

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

  // the code above will return
  // key for home in case pf the
  // /techFriday/1/ roure

  const viewRenderer = routeViewRenderers[rendererKey];

  return viewRenderer ?? pageNotFoundComponent;
}

function registerViews() {
  registerView("/techFriday/1/home", homeComponent);
  registerView("/techFriday/1/aboutMe", aboutMeComponent);
}

function registerView(route, renderFunction) {
  routeViewRenderers[route] = renderFunction;
}
