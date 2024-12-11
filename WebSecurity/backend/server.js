import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import express from "express";
import { appConfig, cookiesConfig } from "./config.js";
import { useMyApi } from "./api/api.js";
import { configurePages } from "./server_configurePages.js";
import { currentUser, checkCsrfToken } from "./middleware.js";

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (cookiesConfig.enabled) {
  app.use(cookieParser(cookiesConfig.secret));
}
app.use(currentUser);
app.use(checkCsrfToken);
app.use(express.static("./"));
useMyApi(app);

configurePages(app);

app.listen(port, () => {
  console.log(`web-security app's backend part is listening on port ${port}`);
});
