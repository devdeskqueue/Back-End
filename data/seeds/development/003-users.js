const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Users').insert([
    { 
      id: 1,
      first_name: 'George',
      last_name: 'Kaplan',
      email: 'gkaplan@mail.com',
      password: bcrypt.hashSync('pass', 12),
      role_id: 1
    },
    { 
      id: 2,
      first_name: 'Cindy',
      last_name: 'Brady',
      email: 'cindyb@gmail.com',
      password: bcrypt.hashSync('pass', 12),
      role_id: 2
    },
    { 
      id: 3,
      first_name: 'Steve',
      last_name: 'Rogers',
      email: 'steve@hotmail.com',
      password: bcrypt.hashSync('pass123', 12),
      role_id: 2
    },
  ])

};
