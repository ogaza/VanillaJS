export function userIsLoggedIn(req) {
  return !!req.cookies.username;
}
