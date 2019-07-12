
exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Comments').insert([
    {
      id: 1,
      ticket_id: 2,
      comment: `When we do a setState({}) nothing is happening.`,
      opened_by: 2
    },
    {
      id: 2,
      ticket_id: 2,
      comment: 'A fix has been implemented. Pleave verify issue has been resolved.',
      opened_by: 1
    },
    {
      id: 3,
      ticket_id: 1,
      comment: 'Try using Flexbox',
      opened_by: 1
    },
    {
      id: 4,
      ticket_id: 4,
      comment: 'This is an asynchronous function use Prommises or Async/Await functions',
      opened_by: 3
    }
  ])
};
