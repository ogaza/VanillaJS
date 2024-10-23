import { getUserById } from "../database.js";
import { getActiveSessionFor } from "../database_sessions.js";
import { userIsLoggedIn } from "../security/security.js";

export function useMyApi(app) {
  app.get("/api", async (req, res) => {
    if (!userIsLoggedIn(req)) {
      res.status(403);
      return;
    }

    res.send(JSON.stringify(createUserInfoFrom(req)));
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
