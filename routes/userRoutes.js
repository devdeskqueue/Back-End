const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../data/dbconfig.js");

const { inputDataChecker, requiredData } = require("../auth/authenticate");
const requiredFields = ["email", "password"];

module.exports = server => {
  server.post(
    "/api/register",
    requiredData(inputDataChecker, requiredFields),
    register
  );
  server.post(
    "/api/login",
    requiredData(inputDataChecker, requiredFields),
    login
  );
};

async function register(req, res) {
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
}

async function login(req, res) {
  const creds = req.body;
  if (!creds.email || !creds.password) {
    res.status(400).json({ message: "Email and Password are both required!" });
  } else {
    db("Users")
      .where("email", creds.email)
      .first()
      .then(user =>
        user && bcrypt.compareSync(creds.password, user.password)
          ? res.status(200).json(generateToken(user))
          : res.status(401).json({ message: "Invalid email or password!" })
      )
      .catch(err => res.status(500).json(err));
  }
}

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h"
    }
  );
}
