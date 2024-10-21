import express from "express";

const app = express();

app.use(express.static("./"));

const port = 5502;

app.listen(port, () => {
  console.log(`web-security app's frontend part is listening on port ${port}`);
});
