require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const db = require("../dbConfig");
const { isValidEmail, isValidPassword } = require("./middleware/middleware");
const jwt = require("jsonwebtoken");

const ticketRoutes = require("./routes/ticketRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const server = express();

server.use(express.json(), helmet(), cors());

const secret = process.env.JWT_SECRET_KEY;

const generateToken = user => {
  const { Firstname, Lastname, username, admin, avatar, id } = user;
  const payload = {
    Firstname,
    Lastname,
    username,
    admin,
    avatar,
    id
  };
  const options = {
    expiresIn: "1h",
    jwtid: bcrypt.hashSync(user.username, 4),
    subject: `${id}`
  };
  return jwt.sign(payload, secret, options);
};

// Respond with "hello world" for requests that hit our root "/"
server.get("/", (req, res) => {
  res.send("hello world");
});

// Route handling
server.use("/api/tickets", ticketRoutes);
server.use("/api/tickets/:ticket_id/comments", commentRoutes);
server.use("/api/categories", categoriesRoutes);

// Auth
server.post("/register", isValidPassword, isValidEmail, (req, res) => {
  const creds = req.body;
  if (
    !creds.password ||
    !creds.username ||
    !creds.Firstname ||
    !creds.Lastname ||
    !creds.email
  ) {
    res.status(400).json({ error: "All fields are required!" });
  } else {
    creds.password = bcrypt.hashSync(creds.password, 12);
    db("users")
      .insert(creds)
      .then(ids => {
        db("users")
          .where("id", ids[0])
          .first()
          .then(user => res.status(201).json(generateToken(user)));
      })
      .catch(err => res.status(500).json(err));
  }
});

server.post("/login", (req, res) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res
      .status(400)
      .json({ message: "Username and Password are both required!" });
  } else {
    db("users")
      .where("username", creds.username)
      .first()
      .then(user =>
        user && bcrypt.compareSync(creds.password, user.password)
          ? res.status(200).json(generateToken(user))
          : res.status(401).json({ message: "Invalid username or password!" })
      )
      .catch(err => res.status(500).json(err));
  }
});

module.exports = server;
