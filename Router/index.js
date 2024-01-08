import Router from "../services/router.js";

// attach the app to the window, so it is awailable
// everywhere within the page
window.app = {};
app.router = Router;

window.addEventListener("DOMContentLoaded", startTheApp);

function startTheApp() {
  // once the app DOM is loaded
  // we want to modify all the anchors' behaviour
  app.router.init();
}
