const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../data/models");

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
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  try {
    let newUser = await db.insert("Users", user);
    let token = generateToken(newUser);
    res.status(201).json({
      message: `Welcome ${newUser.firstName}`,
      token
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function login(req, res) {
  let { email, password } = req.body;
  try {
    let { id } = await db.db("Users").where("email", email);
    let user = await db.findById("Users", id);
    if (user && bcrypt.compareSync(password, user.password)) {
      let token = generateToken(user);
      res.json({
        message: `Welcome ${user.email}`,
        token
      });
    } else {
      res.status(401).json({ message: "Incorrect email or password" });
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
