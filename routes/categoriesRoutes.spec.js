const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../server')

describe('Categories endpoint testing', () => {
  // Clean up database after each test
  afterEach(async () => {
    await db('Categories').truncate()
  })

  describe('GET /categories', () => {
    // Seed test data
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

    beforeEach(async () => {
      await db('Categories').insert(testData)
    })

    it('should returns status code 200', async () => {
      const res = await request(server).get('/api/categories')
      expect(res.status).toBe(200)
    })

    it('should return all tickets in test database', async () => {
      const res = await request(server).get('/api/categories')
      expect(res.body.length).toEqual(testData.length)
    })
  })

  describe('GET /categories/:id', () => {
    // Seed test data
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

    beforeEach(async () => {
      await db('Categories').insert(testData)
    })
    
    it('/categories/:id return ticket by id', async () => {
      let id = 2
      const res = await request(server).get(`/api/categories/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.name).toBe(testData[id - 1].name)
    })

    it('return 404 status code for missing record', async () => {
      let id = 9999
      const res = await request(server).get(`/api/categories/${id}`)
      expect(res.status).toBe(404)
    })
  })

  describe('POST /categories', () => {
    const testData = {
      name: 'Node',
      description: 'Node related questions'
    }

    it('will receive status code that record was created', async () => {
      const res = await request(server).post('/api/categories').send(testData)
      expect(res.status).toBe(201)
    })

    it('should receive the new ticket', async () => {
      const res = await request(server).post('/api/categories').send(testData)
      expect(res.body.id).toBe(1)
      expect(res.body.name).toBe(testData.name)
      expect(res.body.description).toBe(testData.description)
    })
  })

  describe('PUT /categories/:id', () => {
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

    beforeEach(async () => {
      await db('Categories').insert(testData)
    })

    it('update existing record', async () => {
      let id = 2
      const updateData = { 
        name: 'CSS3',
        description: 'Going down the CSS rabbit hole'
       }
      const res = await request(server)
        .put(`/api/categories/${id}`).send(updateData)
      expect(res.status).toBe(200)
      expect(res.body.name).toBe(updateData.name)
      expect(res.body.description).toBe(updateData.description)
    })
  })

  describe('DELETE /categories/:id', () => {
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

    beforeEach(async () => {
      await db('Categories').insert(testData)
    })

    it('confirm successful deletion', async () => {
      const id = 2
      const res = await request(server).delete(`/api/categories/${id}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ message: `1 record deleted` })
    })

    it('confirm ticket no longer exists', async () => {
      const id = 2
      await request(server).delete(`/api/categories/${id}`)
      const res = await request(server).get(`/api/categories/${id}`)
      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: `Record ${id} not found` })
    })

  })
})