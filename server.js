const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

const userRoutes = require("./routes/userRoutes");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger("dev"));

userRoutes(server);

// Respond with "hello world" for requests that hit our root "/"
server.use("/", (req, res) => {
  res.send("hello world");
});

module.exports = server;
