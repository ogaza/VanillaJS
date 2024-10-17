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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`web-security app's backend part is listening on port ${port}`);
  console.log("cookie settings", cookieSettings);
});
