
exports.up = async function(knex) {
  await knex.schema.createTable('Comments', tbl => {
    tbl.increments('id')
    tbl.integer('ticket_id')
      .references('id')
      .inTable('Tickets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.string('comment', 1000)
    tbl.integer('created_by')
      .references('id')
      .inTable('Users')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.integer('updated_by')
      .references('id')
      .inTable('Users')
    tbl.timestamp('updated_at')
  })

};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Comments')
};
