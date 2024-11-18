// document.querySelector("body").innerHTML = "Hello JavaScript!";

await getData();
await postData();

async function getData() {
  const url = "./api";
  const response = await fetch(url);

  if (!response.ok) {
    console.log("fetch failed");
    return;
  }

  const { user } = await response.json();
  showUserData(user);
}

function showUserData({ username }) {
  document.querySelector("body").append(`Welcome  '${username}'`);
}

/**
 * Just a test to see if sending a data without csrf token will result
 * in an 'unauthorized' response
 * @returns
 */
async function postData() {
  const url = "./api";
  const response = await fetch(url, { method: "POST" });

  if (!response.ok) {
    console.log("fetch failed");
    return;
  }
}
