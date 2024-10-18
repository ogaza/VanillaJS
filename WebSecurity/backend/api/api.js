import { userIsLoggedIn } from "../security/security.js";

export function useMyApi(app) {
  app.get("/api", async (req, res) => {
    if (userIsLoggedIn(req)) {
      res.send(JSON.stringify(createUserInfoFrom(req)));
      return;
    }
    res.status(403);
  });
}

function createUserInfoFrom(req) {
  const {
    cookies: { username: name }
  } = req;

  return { user: { name } };
}
