const db = require('../dbConfig')
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
    it('find all records in table', async () => {
      // Seed with test data
      const testCategories = [
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

      await db('Categories').insert(testCategories)

      const categories = await Models.findAll('Categories')

      expect(categories).toEqual(testCategories)
    })
  })
})