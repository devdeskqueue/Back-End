const db = require("../dbConfig");

async function findByTable(table, ticketID = null) {
  try {
    let data;
    if (ticketID) {
      data = await db(table)
        .where(ticketID, "id")
        .orderBy("id");
    } else {
      data = await db(table).orderBy("id");
    }

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
      return updatedRecord;
    }
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
      return "delete successful";
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  db,
  findByTable,
  findById,
  findByUser,
  findByField,
  insert,
  update,
  remove
};
