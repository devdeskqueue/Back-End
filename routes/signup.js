const bcrypt = require("bcryptjs");

const db = require("knex")(require("../knexfile").development);

module.exports = server => {
  server.post("/api/signup", register);
};

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
