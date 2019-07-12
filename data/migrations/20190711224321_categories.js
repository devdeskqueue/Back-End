
exports.up = async function(knex) {
  await knex.schema.createTable('Categories', tbl => {
    tbl.increments('id')
    tbl.string('name').unique().notNullable()
    tbl.string('description', 1000)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Categories')
};
