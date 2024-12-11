import jwt from "jsonwebtoken";
import { isProdEnv, jwtConfig } from "./config.js";

let newUserId = 1;
let newSessionId = 1;

export function configurePages(app) {
  app.post("/login", async (req, res) => {
    console.log("login reached");

    const { username, password } = req.body;
    const userId = newUserId++;

    if (!userId) {
      res.status(403).redirect("/login?&error=Invalid login credentials");
      return;
    }

    // -------------------------------
    // user name cookie
    res.cookie("userName", username, {
      httpOnly: false,
      secure: false,
      signed: false
    });

    // -------------------------------
    // session cookie
    const sessionId = newSessionId++;

    const useSecureCookie = isProdEnv();
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: useSecureCookie,
      signed: true
    });

    // -------------------------------
    // jwt cookie
    const { secret: jwtEncryptionSecret } = jwtConfig;
    var token = jwt.sign({ username }, jwtEncryptionSecret);

    console.log("jwtEncryptionSecret: ", jwtEncryptionSecret);
    console.log("token: ", token);

    // in production the token cookie
    // should be httpOnly, secured and signed
    // also the sameSite should be set
    // probably to either strict or lax
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      signed: false
    });

    // -------------------------------
    // end request with redirection
    res.redirect("/jwt_sample/profile");
  });

  // app.post("/logout", authenticate, (req, res) => {
  //   const { id } = req?.user || {};
  //   clearSessionFor(id);

  //   res.clearCookie("session");
  //   res.redirect("/login");
  // });
}
