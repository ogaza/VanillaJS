const handler = {
  get: handleGetProperty,
};

function handleGetProperty(target, property) {
  if (property === "age") {
    return `${target[property]} years old`;
  }
  return target[property];
}

const original = {
  name: "Olaf",
  age: 39,
};
const s = new Proxy(original, handler);
console.log(s.name, s.age);
