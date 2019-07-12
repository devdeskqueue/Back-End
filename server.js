const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// Respond with "hello world" for requests that hit our root "/"
server.get("/", (req, res) => {
  res.send("hello world");
});

userRoutes(server);

module.exports = server;
