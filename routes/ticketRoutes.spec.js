const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../server')

describe('Tickets endpoint testing', () => {
  // Clean up database after each test
  afterEach(async () => {
    await db('Tickets').truncate()
  })

  describe('GET /tickets', () => {
    // Seed with test data
    const testData = [
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
    ]

    beforeEach(async () => {
      await db('Tickets').insert(testData)
    })

    it('should returns status code 200', async () => {
      const res = await request(server).get('/api/tickets')
      expect(res.status).toBe(200)
    })

    it('should return all users in test database', async () => {
      const res = await request(server).get('/api/tickets')
      expect(res.body.length).toEqual(testData.length)
    })
  })

  describe('GET /tickets/:id', () => {
    // Seed with test data
    const testData = [
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
    ]

    beforeEach(async () => {
      await db('Tickets').insert(testData)
    })

    it('/tickets/:id return ticket by id', async () => {
      let id = 2
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.title).toBe(testData[id-1].title)
    })

  })
})