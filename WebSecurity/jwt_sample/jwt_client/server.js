import cookieParser from "cookie-parser";
import helmet from "helmet";
import express from "express";
import { appConfig, cookiesConfig } from "./config.js";
import { configurePages } from "./server_configurePages.js";

const { port } = appConfig;

const app = express();

// Use Helmet to set security headers
app.use(helmet());
// Setting up CSP
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"]
    }
  })
);

if (cookiesConfig.enabled) {
  app.use(cookieParser(cookiesConfig.secret));
}
app.use(express.static("./jwt_sample/jwt_client/"));

configurePages(app);

app.listen(port, () => {
  console.log(`web-security - jwt client app - listening on port ${port}`);
});
