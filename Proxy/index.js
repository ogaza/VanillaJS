import store from "./Store.js";
import "../AppRenderer/appRenderer.js";

window.app = {};
app.store = store;

window.addEventListener("DOMContentLoaded", startTheApp);

// the DOM is loaded
function startTheApp() {
  loadMenu();
}

async function loadMenu() {
  app.store.menu = await getMenuItems();
}

async function getMenuItems() {
  const response = await fetch("http://localhost:5500/Data/menuContent.json");
  const result = await response.json();

  return await deleay(() => result, 700);
}

function deleay(func, delayInMs) {
  const result = func();

  return new Promise(executor);

  function executor(resolve) {
    setTimeout(function resolvePromise() {
      resolve(result);
    }, delayInMs);
  }
}
