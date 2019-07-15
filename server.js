require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const db = require("./data//dbConfig");
const { isValidEmail, isValidPassword } = require("./middleware/middleware");
const jwt = require("jsonwebtoken");

const ticketRoutes = require("./routes/ticketRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const server = express();

server.use(express.json(), helmet(), cors());

const secret = process.env.JWT_SECRET_KEY;

const generateToken = user => {
  const { first_name, last_name, email, id } = user;
  const payload = {
    first_name,
    last_name,
    email,
    id
  };
  const options = {
    expiresIn: "1h",
    jwtid: bcrypt.hashSync(user.email, 4),
    subject: `${id}`
  };
  return jwt.sign(payload, secret, options);
};

// Route handling
server.use("/api/tickets", ticketRoutes);
server.use("/api/tickets/:ticket_id/comments", commentRoutes);
server.use("/api/categories", categoriesRoutes);

// Auth
server.post("/register", isValidPassword, isValidEmail, (req, res) => {
  const creds = req.body;
  if (
    !creds.password ||
    !creds.first_name ||
    !creds.last_name ||
    !creds.email
  ) {
    res.status(400).json({ error: "All fields are required!" });
  } else {
    creds.password = bcrypt.hashSync(creds.password, 12);
    db("Users")
      .insert(creds)
      .then(ids => {
        db("Users")
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
    res.status(400).json({ message: "Email and Password are both required!" });
  } else {
    db("Users")
      .where("email", creds.email)
      .first()
      .then(user =>
        user && bcrypt.compareSync(creds.password, user.password)
          ? res.status(200).json(generateToken(user))
          : res
              .status(401)
              .json({ message: "Invalid usernaemailme or password!" })
      )
      .catch(err => res.status(500).json(err));
  }
});

module.exports = server;
