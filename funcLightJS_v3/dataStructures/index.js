const title = "FuncJS - " + "data struct operations";
document.querySelector("h1").textContent = title;
document.title = title;

var obj = {
  firstName: "olaf",
  lastName: "gaza",
  age: 39,
  address: { city: "Krk" },
  print: function () {
    return `${this.firstName} ${this.lastName}, age ${this.age}`;
  }
};
console.log("obj:", obj);
console.log("mapped obj:", mapObj(toUpper, obj));
console.log("filtered obj:", filterObj(isString, obj));

function mapObj(mapperFn, o) {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    newObj[key] = mapperFn(o[key]);
  }

  return newObj;
}

function filterObj(predicateFn, o) {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    if (!predicateFn(o[key])) continue;

    newObj[key] = o[key];
  }

  return newObj;
}

function toUpper(str) {
  if (typeof str == "string") {
    return str.toUpperCase();
  }

  return str;
}

function isString(prop) {
  //console.log(typeof prop);
  return typeof prop == "string";
}
