const db = require('../dbConfig')
const bcrypt = require('bcryptjs')
const Models = require('./index')

const databaseTables = ['Categories', 'Roles', 'Users', 'Tickets', 'Comments']
describe('Models testing', () => {
  // Clean up database after each test
  afterEach(async () => {
    for (let i = 0; i < databaseTables.length; i++) {
      await db(databaseTables[i]).truncate()
    }
  })

  describe('findAll()', () => {
    it(`find all records in Categories table`, async () => {
      // Seed with test data
      const testData = [
        {
          id: 1,
          name: 'HTML',
          description: 'HTML related questions',
        },
        {
          id: 2,
          name: 'CSS',
          description: 'Uncovering the mysteries of CSS',
        },
        {
          id: 3,
          name: 'Javascript',
          description: 'Vanilla Javascript related questions',
        }
      ]

      await db('Categories').insert(testData)

      // Run Model
      const categories = await Models.findAll('Categories')

      // Validate Model
      expect(categories).toEqual(testData)
    })
  })

  describe('findById()', () => {
    it('find record by id', async () => {
      // Seed with test data
      const testData = [
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
      ]

      await db('Users').insert(testData)

      // Run Model
      const id = 2
      const data = await Models.findById('Users', id)

      // Validate Model
      expect(data.email).toEqual(testData[id-1].email)
      expect(data.first_name).toEqual(testData[id-1].first_name)
      expect(data.last_name).toEqual(testData[id-1].last_name)
    })
  })


})