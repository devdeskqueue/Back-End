
exports.up = async function(knex) {
  await knex.schema.createTable('Categories', tbl => {
    tbl.increments('id')
    tbl.string('name').unique().notNullable()
    tbl.string('description', 1000)
  })

  await knex.schema.createTable('Roles', tbl => {
    tbl.increments('id')
    tbl.string('name').unique().notNullable()
  })

  await knex.schema.createTable('Users', tbl => {
    tbl.increments('id')
    tbl.string('first_name', 128)
    tbl.string('last_name', 128)
    tbl.string('password', 128).notNullable()
    tbl.string('email', 128).notNullable()
    tbl.integer('role_id')
      .notNullable()
      .defaultTo(2)
      .references('id')
      .inTable('Roles')
  })

  await knex.schema.createTable('Tickets', tbl => {
    tbl.increments('id')
    tbl.string('title').notNullable()
    tbl.string('description', 1000)
    tbl.integer('category_id')
      .references('id')
      .inTable('Categories')
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

  await knex.schema.createTable('Comments', tbl => {
    tbl.increments('id')
    tbl.integer('ticket_id')
      .references('id')
      .inTable('Tickets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.string('comment', 1000)
    tbl.integer('opened_by')
      .references('id')
      .inTable('Users')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.integer('updated_by')
      .references('id')
      .inTable('Users')
    tbl.timestamp('updated_at')
  })

};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('Categories')
  await knex.schema.dropTableIfExists('Roles')
  await knex.schema.dropTableIfExists('Users')
  await knex.schema.dropTableIfExists('Tickets')
  await knex.schema.dropTableIfExists('Comments')
};
