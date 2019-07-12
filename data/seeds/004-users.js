const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Users').insert([
    { 
      id: 1,
      firstName: 'George',
      lastName: 'Kaplan',
      email: 'gkaplan@mail.com',
      password: bcrypt.hashSync('pass', 12),
      role_id: 1
    },
    { 
      id: 2,
      firstName: 'Cindy',
      lastName: 'Brady',
      email: 'cindyb@gmail.com',
      password: bcrypt.hashSync('pass', 12),
      role_id: 2
    },
    { 
      id: 3,
      firstName: 'Steve',
      lastName: 'Rogers',
      email: 'steve@hotmail.com',
      password: bcrypt.hashSync('pass123', 12),
      role_id: 2
    },
  ])

};
