import express from "express";
import dotenv from "dotenv";

// dotenv enables the usage of the .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`web-security app's backend part is listening on port ${PORT}`);
});
