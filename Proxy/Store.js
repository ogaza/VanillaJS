const store = {
  menu: null,
  cart: []
};

const handler = {
  get: handleGetProperty,
  set: handleSetProperty
};

const proxiedStore = new Proxy(store, handler);

export default proxiedStore;

// handler's methods
function handleGetProperty(target, property) {
  return target[property];
}

function handleSetProperty(target, property, value) {
  // actual set
  target[property] = value;
  // dispatch event using window api
  window.dispatchEvent(new Event(`store.${property}.changed`));

  return true;
}
