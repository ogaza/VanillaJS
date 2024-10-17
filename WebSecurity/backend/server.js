import dotenv from "dotenv";
import express from "express";

// dotenv enables the usage of the .env file
dotenv.config();

const {
  env: { PORT: port = 3030 }
} = process;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`web-security app's backend part is listening on port ${port}`);
});
