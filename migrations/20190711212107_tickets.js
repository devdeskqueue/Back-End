
exports.up = async function(knex) {
  await knex.schema.createTable('Tickets', tbl => {
    tbl.increments('id')
    tbl.string('title').notNullable()
    tbl.string('description', 1000)
    tbl.integer('category_id')
      .references('id')
      .inTable('categories')
    tbl.integer('opened_by')
      .references('id')
      .inTable('Users')  
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.integer('assigned_to')
      .references('id')
      .inTable('Users')
    tbl.integer('updated_by')
      .references('id')
      .inTable('Users')
    tbl.timestamp('updated_at')
    tbl.boolean('is_complete').notNullable().defaultTo(false)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Tickets')
  // await knex.schema.dropTableIfExists('Comments')
  // await knex.schema.dropTableIfExists('Categories')
  // await knex.schema.dropTableIfExists('Users')
  // await knex.schema.dropTableIfExists('Roles')
};
