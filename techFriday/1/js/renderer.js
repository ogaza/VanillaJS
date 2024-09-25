const Renderer = {
  init: function () {
    console.log("renderer init function");
    // handle location changed
    window.addEventListener("locationChanged", handleWindowLocationChanged);
  }
};

export default Renderer;

function handleWindowLocationChanged(event) {
  const route = location.pathname;
  console.log(`window location changed to: ${route}`);
}
