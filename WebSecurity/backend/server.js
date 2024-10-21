import cookieParser from "cookie-parser";
import express from "express";
import { appConfig, cookiesConfig } from "./config.js";
import { useMyApi } from "./api/api.js";
import { configurePages } from "./server_configurePages.js";

const { port } = appConfig;

const app = express();

if (cookiesConfig.enabled) {
  app.use(cookieParser());
}
app.use(express.static("./"));
useMyApi(app);

configurePages(app);

app.listen(port, () => {
  console.log(`web-security app's backend part is listening on port ${port}`);
});
