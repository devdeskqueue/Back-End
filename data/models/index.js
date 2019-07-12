let db = [];

async function getUsers() {
  try {
    return db;
  } catch (err) {
    return err;
  }
}

function findById(id) {
  try {
    let data = db.filter(user => user.id === id)[0];
    return data;
  } catch (err) {
    return err;
  }
}

function findByUser(username) {
  try {
    let data = db.filter(user => user.username === username)[0];
    return data;
  } catch (err) {
    return err;
  }
}

function insert(data) {
  try {
    db.push({ ...data, id: db.length });
    let newRecordId = db[db.length - 1].id;
    let newRecord = findById(newRecordId);
    return newRecord;
  } catch (err) {
    return err;
  }
}

function remove(id) {
  try {
    let user = db.find(user => user.id === id);
    db = db.filter(user => user.id !== id);

    return "success";
  } catch (err) {
    return err;
  }
}

module.exports = {
  db,
  findById,
  findByUser,
  insert,
  remove,
  getUsers
};
