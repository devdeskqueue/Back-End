
exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Tickets').insert([
    {
      id: 1,
      title: `Help! Can't center text box`,
      description: `I need help trying to vertically and horizontally center a text box`,
      category_id: 2,
      opened_by: 2
    },
    {
      id: 2,
      title: 'State not updating',
      description: 'Having problems updating state',
      category_id: 4,
      opened_by: 1
    },
    {
      id: 3,
      title: 'Weird error message',
      description: 'Another weird error message',
      category_id: 1,
      opened_by: 3
    },
    {
      id: 4,
      title: 'Promise unresolved',
      description: 'Promise is still unresolved',
      category_id: 5,
      opened_by: 2
    }
  ])
};
