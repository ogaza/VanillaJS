const users = [{ id: 1, username: "olaf", password: "passw0rd" }];

export function getUser(user) {
  const existingUser = users.find(getComparerTo(user));

  return { ...existingUser };
}

export function getUserById(userId) {
  const existingUser = users.find((x) => x.id == userId);

  return { ...existingUser };
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
