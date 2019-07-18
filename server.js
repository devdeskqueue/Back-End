require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const server = express();

server.use(express.json(), helmet(), cors());

// Route handling
server.use("/api/tickets", ticketRoutes);
server.use("/api/tickets", commentRoutes);
server.use("/api/categories", categoriesRoutes);
userRoutes(server);

module.exports = server;
