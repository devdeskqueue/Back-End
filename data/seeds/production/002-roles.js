
exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Roles').insert([
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'Student' }
  ])
};
