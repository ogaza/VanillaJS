// document.querySelector("body").innerHTML = "Hello JavaScript!";

await getData();

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

function showUserData({ name }) {
  document.querySelector("body").append(`Welcome  '${name}'`);
}
