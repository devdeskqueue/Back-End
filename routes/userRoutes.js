const bcrypt = require("bcrypt");

const db = require("../data/dbConfig");
const tokenService = require("../auth/tokenService");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
};

/**
 * Endpoint to register a new user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function register(req, res) {
  // implement user registration
  let { password } = req.body;
  let user;

  password = bcrypt.hashSync(password, 10);
  user = { ...req.body, password };

  try {
    const result = await db("Users").insert(user);
    if (result) return res.status(201).json({ message: "User created" });

    return res.status(400).json({ message: "Something went wrong." });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
}

/**
 * Endpoint for logging in a user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function login(req, res) {
  // implement user login
  const { email, password } = req.body;

  try {
    const user = await db("Users")
      .where({ email })
      .first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenService.generateToken(user);
      res.status(200).json({
        message: "Login successful",
        token
      });
    } else {
      res.status(401).json({ message: "Something went wrong." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
}
