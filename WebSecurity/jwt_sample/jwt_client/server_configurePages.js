import jwt from "jsonwebtoken";
import { isProdEnv, jwtConfig } from "./config.js";

export function configurePages(app) {
  app.get("/tokenSecuredTest", authenticateMiddleware, (req, res) => {
    res.send(
      JSON.stringify({
        jwtTokenTestResult: "success"
      })
    );
  });
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
        `http://localhost:5503/login?redirect=${req.originalUrl}&error=unauthorized`
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
