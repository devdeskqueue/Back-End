const db = require("../dbConfig");

async function getUsers() {
  try {
    let data = await db("Users")
      .select("id", "username", "department")
      .orderBy("id");
    return data;
  } catch (err) {
    return err;
  }
}

async function find(table) {
  try {
    let data = await db(table).orderBy("id");
    return data;
  } catch (err) {
    return err;
  }
}

async function findById(id, table) {
  try {
    let data = await db(table)
      .select("id", "username")
      .where({ id: Number(id) })
      .first();
    return data;
  } catch (err) {
    return err;
  }
}

async function findByUser(username, table) {
  try {
    let data = await db(table)
      .where({ username })
      .first();
    return data;
  } catch (err) {
    return err;
  }
}

async function findByField(table, field, data) {
  try {
    let query = await db(table)
      .where(`${field}`, data)
      .first();
    return query;
  } catch (err) {
    return err;
  }
}

async function insert(data, table) {
  try {
    let newRecordId = await db(table).insert(data, "id");
    let newRecord = await findById(newRecordId, table);
    return newRecord;
  } catch (err) {
    return err;
  }
}

async function update(id, data, table) {
  try {
    let updateCount = await db(table)
      .where({ id })
      .update(data);
    if (updateCount > 0) {
      let updatedRecord = await findById(id, table);
      console.log(`update db method invoked updatedRecord: `, updatedRecord);
      return updatedRecord;
    } else throw err;
  } catch (err) {
    return err;
  }
}

async function remove(id, table) {
  try {
    let deleteCount = await db(table)
      .where({ id })
      .del();
    if (deleteCount > 0) {
      return {
        message: `${deleteCount} ${
          deleteCount > 1 ? "records" : "record"
        } deleted`
      };
    } else throw err;
  } catch (err) {
    return err;
  }
}

module.exports = {
  db,
  find,
  findById,
  findByUser,
  findByField,
  insert,
  update,
  remove,
  getUsers
};
