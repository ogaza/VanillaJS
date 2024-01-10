const AppRenderer = {
  init: function () {
    window.addEventListener("store.menu.changed", handleAppMenuChanged);
  }
};

function handleAppMenuChanged() {
  renderMenu();
}

function renderMenu() {
  const menuItems = app.store.menu;

  const menuNode = document.querySelector("menu");
  menuNode.textContent = null;

  menuItems.forEach((item, i) => {
    const menuItem = document.createElement("li");
    menuItem.textContent = item.name;
    menuNode.appendChild(menuItem);
  });
}

AppRenderer.init();

export default AppRenderer;
