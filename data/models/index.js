// Instantiate database instance
const db = require('../dbConfig')

// ==== Global Database Methods ==== //
function findAll(table) {
  return db(table).orderBy('id')
}

function findById(table, id) {
  return db(table).where({ id }).first()
}

module.exports = {
  db,
  findAll,
  findById
}