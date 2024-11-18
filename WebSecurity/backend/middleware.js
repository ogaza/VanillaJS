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

export const checkCsrfToken = async (req, res, next) => {
  const { method, url } = req;

  // skip if not a login request of anykind
  // probably could be better
  // if session is created (with the csfr token)
  // even before an user is logged in
  if (url.includes("/login")) {
    return next();
  }

  if (method !== "POST") {
    return next();
  }

  const { session: sessionId } = req.signedCookies;

  const { csrf_token } = getActiveSessionFor(sessionId) || {};

  // this needs to be refined probably
  // but anyway, here we check if the body
  // of a post request has the csfr token
  // if not, then the server should respond
  // with 'unauthorized' response
  if (!req._csrf !== csrf_token) {
    return res.status(403).send("Unauthorized");
  }

  next();
};
