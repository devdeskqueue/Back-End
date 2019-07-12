
exports.up = async function(knex) {
  await knex.schema.createTable('Users', tbl => {
    tbl.increments('id')
    tbl.string('firstName', 128)
    tbl.string('lastName', 128)
    tbl.string('password', 128).notNullable()
    tbl.string('email', 128).notNullable()
    tbl.integer('role_id')
      .notNullable()
      .defaultTo(2)
      .references('id')
      .inTable('Roles')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Users')
};
