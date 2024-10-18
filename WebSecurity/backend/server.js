import cookieParser from "cookie-parser";
import express from "express";
import { readFile } from "fs/promises";
import { appConfig, cookiesConfig } from "./config.js";
import { userIsLoggedIn } from "./security/security.js";

const { port } = appConfig;

const app = express();

if (cookiesConfig.enabled) {
  app.use(cookieParser());
}

app.get("/", (req, res) => {
  // if (!req.cookies) {
  //   res.send("cookies are disabled");
  //   return;
  // }

  if (userIsLoggedIn(req)) {
    res.redirect("/profile");
    return;
  }

  if (!userIsLoggedIn(req)) {
    res.redirect("/login");
    return;
  }
});

app.get("/login", async (req, res) => {
  if (userIsLoggedIn(req)) {
    res.redirect("/profile");
    return;
  }

  const loginPage = await readFile("./backend/pages/login.html", "utf-8");
  res.send(loginPage);
});

// Simulate user login and set a cookie
app.post("/login", async (req, res) => {
  res.cookie("username", "test", {
    httpOnly: true
  });

  res.redirect("/profile");
});

app.post("/logout", (_, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.get("/profile", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.redirect("/login");
    return;
  }

  const profilePage = await readFile("./backend/pages/profile.html", "utf-8");
  res.send(profilePage);
});

app.listen(port, () => {
  console.log(`web-security app's backend part is listening on port ${port}`);
});
