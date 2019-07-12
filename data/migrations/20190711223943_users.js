
exports.up = async function(knex) {
  await knex.schema.createTable('Users', tbl => {
    tbl.increments('id')
    tbl.string('username', 255)
    tbl.string('firstName', 128)
    tbl.string('lastName', 128)
    tbl.string('password', 128)
    tbl.string('email', 128)
    tbl.integer('role_id')
      .references('id')
      .inTable('Users')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Users')
};
