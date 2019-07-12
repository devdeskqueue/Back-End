require("dotenv").config(); // load .env variables

const app = require("./server");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

module.exports = app;
