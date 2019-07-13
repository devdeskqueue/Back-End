// Instantiate database instance
const db = require('../dbConfig')

// ==== Global Database Methods ==== //
function findAll(table) {
  return db(table).orderBy('id')
}

module.exports = {
  db,
  findAll
}