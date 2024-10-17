import cookieParser from "cookie-parser";
import express from "express";
import { appConfig, cookiesConfig } from "./config.js";

const { port } = appConfig;

const app = express();

if (cookiesConfig.enabled) {
  app.use(cookieParser());
}

app.get("/", (req, res) => {
  if (!req.cookies) res.send("cookies are disabled");

  if (req.cookies.username) {
    res.redirect("/profile");
  }

  if (!req.cookies.username) {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.send("login page");
});

app.get("/profile", (req, res) => {
  res.send("profile page");
});

app.listen(port, () => {
  console.log(`web-security app's backend part is listening on port ${port}`);
});
