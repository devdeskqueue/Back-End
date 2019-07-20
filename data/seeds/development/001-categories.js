
exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Categories').insert([
    { id: 1,
      name: 'HTML',
      description: 'HTML related questions',
    },
    { id: 2,
      name: 'CSS',
      description: 'Uncovering the mysteries of CSS',
    },
    { id: 3,
      name: 'Javascript',
      description: 'Vanilla Javascript related questions',
    },
    { id: 4,
      name: 'React',
      description: 'React related questions including Redux',
    },
    { id: 5,
      name: 'Node',
      description: 'Node related questions',
    },
  ])
};
