const users = [{ username: "olaf", password: "passw0rd" }];

export function getUser(user) {
  return users.find(getComparerTo(user));
}

function getComparerTo(userOne) {
  return function isTheAsmeAs(userTwo) {
    return areTheSame(userOne, userTwo);
  };
}

function areTheSame(userOne, userTwo) {
  return (
    userOne.username == userTwo.username && userOne.password == userTwo.password
  );
}
