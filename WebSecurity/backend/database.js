const users = [{ id: 1, username: "olaf", password: "passw0rd" }];

export function getUser(user) {
  const { id, username } = users.find(getComparerTo(user));

  return { id, username };
}

export function getUserById(userId) {
  const { id, username } = users.find((x) => x.id == userId);

  return { id, username };
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
