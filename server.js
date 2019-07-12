const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// Respond with "hello world" for requests that hit our root "/"
server.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = server;
