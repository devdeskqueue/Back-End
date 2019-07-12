const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// Respond with "hello world" for requests that hit our root "/"
server.get("/", (req, res) => {
  res.send("hello world");
});

loginRoute(server);
registerRoute(server);

module.exports = server;
