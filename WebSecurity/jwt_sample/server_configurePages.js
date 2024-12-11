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
    var token = jwt.sign({ username }, jwtEncryptionSecret, {
      expiresIn: "20s"
    });

    // console.log("jwtEncryptionSecret: ", jwtEncryptionSecret);
    // console.log("token: ", token);

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

  app.get("/tokenSecuredTest", authenticateMiddleware, (req, res) => {
    res.send(
      JSON.stringify({
        jwtTokenTestResult: "success"
      })
    );
  });

  // app.post("/logout", authenticate, (req, res) => {
  //   const { id } = req?.user || {};
  //   clearSessionFor(id);

  //   res.clearCookie("session");
  //   res.redirect("/login");
  // });
}

async function authenticateMiddleware(req, res, next) {
  const jwtToken = req?.cookies?.token;
  //  const jwtToken = req?.signedCookies?.token;

  console.log("jwtToken from request: ", jwtToken);

  const { secret: jwtEncryptionSecret } = jwtConfig;

  let verificationResult;
  try {
    verificationResult = jwt.verify(jwtToken, jwtEncryptionSecret, {
      algorithms: ["HS256"]
    });
  } catch (error) {
    console.log("error during token verification", error.message);
  }

  const { username } = verificationResult || {};
  console.log("username from token: ", username);

  if (!username) {
    // return res.status(403).send("Unauthorized");
    return res
      .status(401)
      .redirect(
        `/jwt_sample/login?redirect=${req.originalUrl}&error=unauthorized`
      );
  }

  next();

  // verificationResult = jwt.verify(
  //   jwtToken,
  //   jwtEncryptionSecret,
  //   function (err, decoded) {
  //     console.log("decoded token: ", decoded);

  //     if (err) {
  //       console.log("error during token verification", err);

  //       /*
  //       err = {
  //         name: 'JsonWebTokenError',
  //         message: 'jwt malformed'
  //       }
  //       */
  //     }
  //   }
  // );
}
