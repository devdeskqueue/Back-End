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

  describe('findByTicketId()', () => {
    it('find all comments by ticket ID', async () => {
      // Seed with test data
      const testData = [
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
      ]

      const ticketId = 2

      await db('Comments').insert(testData)

      // Run model
      const comments = await Models.findByTicketId('Comments', ticketId)

      // Validate model
      expect(comments.length).toBe(2)
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

    it('return undefined on an invalid id', async () => {
      const data = await Models.findById('Users', 999)
      expect(data).toBeUndefined()
    })
  })

  describe('insert()', () => {
    it('insert records into the database', async () => {
      const testData = {
        first_name: 'Harry',
        last_name: 'Potter',
        email: 'harry@hogwarts.edu',
        password: bcrypt.hashSync('pass123', 12),
        role_id: 2
      }

      // Run Model
      await Models.insert('Users', testData)

      // Validate Model
      const data = await db('Users')
      expect(data).toHaveLength(1)
      expect(data[0].first_name).toBe('Harry')
    })
  })

  describe('update()', () => {
    it('update record by id', async () => {
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
      const id = 3
      const newData = { name: 'Vanilla Javascript' }
      const data = await Models.update('Categories', id, newData)

      // Validate Model
      expect(data.name).toBe(newData.name)
    })
  })

  describe('remove()', () => {
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

    const id = 3

    beforeEach(async () => {
      await db('Categories').insert(testData)
    })
    
    it('confirm test data exists in the database', async () => {
      const data = await db('Categories')
      expect(data[1].id).toEqual(2)
    })

    it('confirm record is deleted', async () => {
      const data = await Models.remove('Categories', id)
      expect(data).toEqual({ message: `1 record deleted`})
    })

    it(`confirm record no longer exists`, async () => {
      await Models.remove('Categories', id)
      const data = await db('Categories').where({ id }).first()
      expect(data).toBeUndefined()
    })
  })

})