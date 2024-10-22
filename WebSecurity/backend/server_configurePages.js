import { readFile } from "fs/promises";
import { userIsLoggedIn } from "./security/security.js";
import { appConfig } from "./config.js";
import { getUser } from "./database.js";

export function configurePages(app) {
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
    const { username, password } = req.body;
    const user = getUser({ username, password });

    if (!user) {
      res.status(403).redirect("/login?&error=Invalid login credentials");
      return;
    }

    res.cookie("username", username, {
      httpOnly: true,
      secure: appConfig.env === "prod",
      signed: true
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
}
