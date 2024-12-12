import bodyParser from "body-parser";
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (cookiesConfig.enabled) {
  app.use(cookieParser(cookiesConfig.secret));
}
app.use(express.static("./"));

configurePages(app);

app.listen(port, () => {
  console.log(`web-security - jwt sample app - listening on port ${port}`);
});
