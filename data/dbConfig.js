require("dotenv").config();
const knex = require("knex");

// Import knex configuration settings
const knexConfig = require("../knexfile");

module.exports = knex(
  knexConfig[process.env.DB_ENV || process.env.NODE_ENV || "development"]
);
