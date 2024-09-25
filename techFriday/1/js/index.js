import Router from "./router.js";
import Renderer from "./renderer.js";

// attach the app to the window, so it is awailable
// everywhere within the page
window.app = {};
app.router = Router;
app.renderer = Renderer;

// run the app once the whole DOM is loaded
window.addEventListener("DOMContentLoaded", startTheApp);

function startTheApp() {
  // once the app DOM is loaded
  // we want to modify all the anchors' behaviour
  app.renderer.init();
  app.router.init();
}
