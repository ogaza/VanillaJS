window.addEventListener("DOMContentLoaded", startTheApp);

const dataModel = { name: "" };
var proxiedDataModel;
var previousDataModel = {};
var form;
var restoreButton;

// the DOM is loaded
function startTheApp() {
  form = document.forms.myForm;
  form.addEventListener("submit", handleFormSubmit);
  setFormBindings();

  restoreButton = document.querySelector(".restore-button");
  restoreButton.addEventListener("click", handleRestoreButtonClick);
}

function handleFormSubmit(event) {
  event.preventDefault();
  storeFormModel();
  showPreviusFormModel();
  clearFormModel();
  // TODO Here the data can be sent to the server
}

const proxyHandler = {
  set(target, property, value) {
    target[property] = value;
    form.elements[property].value = value;

    return true;
  }
};

function storeFormModel() {
  previousDataModel = { ...dataModel };
}

function showPreviusFormModel() {
  const historyInfo = document.querySelector(".form-history__info");
  historyInfo.innerHTML = "";

  const entries = Object.entries(previousDataModel);
  entries.forEach((entry) => {
    historyInfo.innerHTML += `<div>${entry[0]}: ${entry[1]}</div>`;
  });
}

function clearFormModel() {
  // clearing the model will clear the form as well
  Object.keys(proxiedDataModel).forEach(clearModelProperty);
}

function setFormBindings() {
  if (!form) {
    return;
  }
  // Set double data binding
  proxiedDataModel = new Proxy(dataModel, proxyHandler);
  Array.from(form.elements).forEach(addEventListenerForInputChange);
}

function addEventListenerForInputChange(formInput) {
  formInput.addEventListener("change", handleFormInputChange);
}

function handleFormInputChange(event) {
  proxiedDataModel[event.target.name] = event.target.value;
}

function handleRestoreButtonClick() {
  restorePreviusFormValues();
}

function restorePreviusFormValues() {
  Object.keys(previousDataModel).forEach(restoreDataModelProperty);
}

function restoreDataModelProperty(propertyName) {
  proxiedDataModel[propertyName] = previousDataModel[propertyName];
}

function clearModelProperty(propertyName) {
  proxiedDataModel[propertyName] = "";
}
