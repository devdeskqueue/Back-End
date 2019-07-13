// Instantiate database instance
const db = require('../dbConfig')

// ==== Global Database Methods ==== //
function findAll(table) {
  return db(table).orderBy('id')
}

function findById(table, id) {
  return db(table).where({ id }).first()
}

async function insert(table, data) {
  try {
    const [id] = await db(table).insert(data)
    return await findById(table, id)
  }
  catch (err) {
    return err
  }
}

async function update(table, id, data) {
  try {
    const count = await db(table)
                  .where({ id })
                  .update(data)
    if (count > 0) {
      return await findById(table, id)
    } else throw error

  }
  catch (error) {
    return error
  }
}

module.exports = {
  db,
  findAll,
  findById,
  insert,
  update
}