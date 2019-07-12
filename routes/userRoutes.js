const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database/models");

const { inputDataChecker, requiredData } = require("../auth/authenticate");
const requiredFields = ["username", "password"];

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
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  try {
    let newUser = await db.insert(user, "users");
    let token = generateToken(newUser);
    res.status(201).json({
      message: `Welcome ${newUser.username}`,
      token
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function login(req, res) {
  let { username, password } = req.body;
  try {
    let user = await db.findByUser(username, "users");
    if (user && bcrypt.compareSync(password, user.password)) {
      let token = generateToken(user);
      res.json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (err) {
    res.status(500).json(err.message);
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
