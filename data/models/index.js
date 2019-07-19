// Instantiate database instance
const db = require("../dbConfig");

// ==== Global Database Methods ==== //
function findAll(table) {
  return db(table).orderBy("id");
}

// function findAllByField(table, field, data) {
//   return db(table).where({ field: `${data}` })
// }

async function findById(table, id) {
  let result = await db(table)
    .where({ id })
    .first();
  return result;
}

function findByTicketId(table, ticket_id) {
  return db(table).where({ ticket_id }).orderBy("id");
}

function findByEmail(email) {
  return db("Users")
    .where({ email })
    .first();
}

async function insert(table, data) {
  try {
    const [id] = await db(table).insert(data);
    return await findById(table, id);
  } catch (err) {
    return err;
  }
}

async function update(table, id, data) {
  try {
    if (data.closed) {
      await db(table)
        .where({ id })
        .update('completed_at', db.fn.now())
    }

    const count = await db(table)
      .where({ id })
      .update(data)
      .update('updated_at', db.fn.now())

    if (count > 0) {
      return findById(table, id);
    }
  } catch (err) {
    return err;
  }
}

async function remove(table, id) {
  try {
    const count = await db(table)
      .where({ id })
      .del();
    if (count > 0) {
      return {
        message: `${count} ${count > 1 ? "records" : "record"} deleted`
      };
    }
  } catch (error) {
    return error;
  }
}
module.exports = {
  db,
  findAll,
  findById,
  findByEmail,
  findByTicketId,
  insert,
  update,
  remove
};
