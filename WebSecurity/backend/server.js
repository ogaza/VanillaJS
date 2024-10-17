import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

// dotenv enables the usage of the .env file
dotenv.config();

const {
  env: { USE_COOKIES, COOKIE_ENCRYPTION_SECRET, PORT: port = 3030 }
} = process;

const cookieSettings = {
  enabled: USE_COOKIES == "true",
  secret: COOKIE_ENCRYPTION_SECRET
};

const app = express();

if (cookieSettings.enabled) {
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
