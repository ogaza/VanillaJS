import { getUserById } from "./database.js";
import { getActiveSessionFor } from "./database_sessions.js";

/**
 * This middleware sets the user property on the request object
 * and on the the response locals object.
 * It's a simple example of how middleware can be used to
 * set up common properties for all routes.
 */
export const currentUser = async (req, res, next) => {
  const { session: sessionId } = req.signedCookies;

  if (!sessionId) {
    return next();
  }

  const { userId } = getActiveSessionFor(sessionId) || {};
  const user = userId && getUserById(userId);

  if (user) {
    req.user = user;
    res.locals.user = user;
  }

  next();
};

export const authenticate = async (req, res, next) => {
  console.log(req.user);

  if (!req.user) {
    return res
      .status(401)
      .redirect(
        `/login?redirect=${req.originalUrl}&error=You must be logged in to view that page.`
      );
  }

  next();
};
