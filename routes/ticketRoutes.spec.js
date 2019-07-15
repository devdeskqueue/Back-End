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

    it('should return all tickets in test database', async () => {
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
      const id = 2
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.title).toBe(testData[id-1].title)
    })

    it('return 404 status code for missing record', async () => {
      const id = 9999
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(404)
    })

  })

  describe('POST /tickets', () => {
    const testData = {
      title: 'Promise unresolved',
      description: 'Promise is still unresolved',
      category_id: 5,
      opened_by: 2
    }

    it('will receive status code that record was created', async () => {
      const res = await request(server).post('/api/tickets').send(testData)
      expect(res.status).toBe(201)
    })

    it('should receive the new ticket', async () => {
      const res = await request(server).post('/api/tickets').send(testData)
      expect(res.body.id).toBe(1)
      expect(res.body.title).toBe(testData.title)
      expect(res.body.category_id).toBe(testData.category_id)
    })
  })

  describe('UPDATE /tickets/:id', () => {
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

    it('update existing record', async () => {
      const id = 2
      const timestamp = Date.now()
      const updateData = { closed: true, completed_at: timestamp }
      const res = await request(server).put(`/api/tickets/${id}`).send(updateData)
      expect(res.body.closed).toBeTruthy()
      expect(res.body.completed_at).toBe(updateData.completed_at)
    })

    it(`test update timestamp`, async () => {
      const id = 3
      const updateData = { title: 'Test' }
      const res = await request(server).put(`/api/tickets/${id}`).send(updateData)
      expect(res.body.updated_at).not.toBeNull()
    })
  })

  describe('DELETE /tickets/:id', () => {
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
    
    it('confirm successful deletion', async () => {
      const id = 2
      const res = await request(server).delete(`/api/tickets/${id}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ message: `1 record deleted` })
    })

    it('confirm ticket no longer exists', async () => {
      const id = 2
      await request(server).delete(`/api/tickets/${id}`)
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: `Record ${id} not found` })
    })

  })
})