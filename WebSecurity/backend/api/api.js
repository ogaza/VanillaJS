import { getUserById } from "../database.js";
import { getActiveSessionFor } from "../database_sessions.js";
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
    signedCookies: { session: sessionId }
  } = req;

  const { userId } = getActiveSessionFor(sessionId) || {};
  const { id, username } = getUserById(userId);

  return { user: { id, username } };
}
