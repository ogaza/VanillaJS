import { readFile } from "fs/promises";
import { authenticate } from "./middleware.js";
import { isProdEnv } from "./config.js";
import { getUser } from "./database.js";
import { clearSessionFor, createNewSessionFor } from "./database_sessions.js";

export function configurePages(app) {
  app.get("/", authenticate, (req, res) => {
    res.redirect("/profile");
  });

  app.get("/login", async (req, res) => {
    const loginPage = await readFile("./backend/pages/login.html", "utf-8");
    res.send(loginPage);
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const { id: userId } = getUser({ username, password });

    if (!userId) {
      res.status(403).redirect("/login?&error=Invalid login credentials");
      return;
    }

    const { id: sessionId } = createNewSessionFor(userId);

    const useSecureCookie = isProdEnv();
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: useSecureCookie,
      signed: true
    });

    res.redirect("/profile");
  });

  app.post("/logout", authenticate, (req, res) => {
    const { id } = req?.user || {};
    clearSessionFor(id);

    res.clearCookie("session");
    res.redirect("/login");
  });

  app.get("/profile", authenticate, async (_, res) => {
    const profilePage = await readFile("./backend/pages/profile.html", "utf-8");
    res.send(profilePage);
  });
}
