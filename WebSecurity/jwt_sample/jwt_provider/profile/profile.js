let cookieValue;
let cookieName;

cookieName = "userName";
getCookieValue();
console.log("userName: ", cookieValue);
document.querySelector("#userName").textContent = cookieValue;

cookieName = "token";
getCookieValue();
console.log("token: ", cookieValue);
document.querySelector("#token").textContent = cookieValue;

// -------------------------------------------------------

function getCookieValue() {
  const cookiesString = decodeURIComponent(document.cookie);

  const cookiesStringArray = cookiesString.split(";");

  cookiesStringArray.forEach(getCookieValueFromRawCookiesString);
}

function getCookieValueFromRawCookiesString(cookieString) {
  var splitted = cookieString.split("=");

  const name = splitted[0].trim();
  const value = splitted[1].trim();

  if (name == cookieName) {
    cookieValue = value;
  }
}
