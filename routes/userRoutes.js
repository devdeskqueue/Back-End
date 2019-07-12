const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("knex")(require("../knexfile").development);
const jwtKey = process.env.JWT_KEY;

module.exports = server => {
  server.post("/api/login", login);
  server.post("/api/register", register);
};

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const secret = jwtKey;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

function login(req, res) {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "you shall not pass!!" });
      }
    })
    .catch(err => res.status(400).json(err));
}

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(400).json(err));
}
