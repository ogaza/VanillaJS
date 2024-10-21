export function userIsLoggedIn(req) {
  return !!req.signedCookies.username;
}
