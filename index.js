const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// Respond with "hello world" for requests that hit our root "/"
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

module.exports = app;
