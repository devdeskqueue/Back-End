const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../server')

describe('Comments endpoint testing', () => {
  // Clean up database after each test
  afterEach(async () => {
    await db('Comments').truncate()
  })

  describe('GET /comments', () => {
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

    beforeEach(async () => {
      await db('Comments').insert(testData)
    })

    it('should returns status code 200', async () => {
      const ticket_id = 1
      const res = await request(server).get(`/api/tickets/${ticket_id}/comments`)
      expect(res.status).toBe(200)
    })

    it('should return all comments in test database', async () => {
      const ticket_id = 1
      const res = await request(server).get(`/api/tickets/${ticket_id}/comments`)
      expect(res.body.length).toEqual(testData.length)
    })
  })

  describe('GET /comments/:id', () => {
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

    beforeEach(async () => {
      await db('Comments').insert(testData)
    })

    it('/comments/:id return ticket by id', async () => {
      const ticket_id = 2
      const id = 2
      const res = await request(server).get(`/api/tickets/${ticket_id}/comments/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.comment).toBe(testData[ticket_id - 1].comment)
    })

    it('return 404 status code for missing record', async () => {
      const ticket_id = 1
      const id = 9999
      const res = await request(server)
        .get(`/api/tickets/${ticket_id}/comments/${id}`)
      expect(res.status).toBe(404)
    })

  })

  describe('POST /comments', () => {
    const testData = {
      ticket_id: 2,
      comment: `When we do a setState({}) nothing is happening.`,
      opened_by: 2
    }

    const ticket_id = testData.ticket_id

    it('will receive status code that record was created', async () => {
      const res = await request(server).post(`/api/tickets/${ticket_id}/comments`).send(testData)
      expect(res.status).toBe(201)
    })

    it('should receive the new comment', async () => {
      const res = await request(server).post(`/api/tickets/${ticket_id}/comments`).send(testData)
      expect(res.body.id).toBe(1)
      expect(res.body.comment).toBe(testData.comment)
    })
  })

  describe('UPDATE /comments/:id', () => {
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

    beforeEach(async () => {
      await db('Comments').insert(testData)
    })

    it('update existing record', async () => {
      const ticket_id = 1
      const id = 2
      const updateData = { comment: `Update test` }
      const res = await request(server)
        .put(`/api/tickets/${ticket_id}/comments/${id}`).send(updateData)
      expect(res.body.comment).toBe(updateData.comment)
    })

    it(`test update timestamp`, async () => {
      const ticket_id = 1
      const id = 2
      const updateData = { comment: 'Timestamp Test' }
      const res = await request(server)
        .put(`/api/tickets/${ticket_id}/comments/${id}`).send(updateData)
      expect(res.body.updated_at).not.toBeNull()
    })
  })

  describe('DELETE /comments/:id', () => {
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

    beforeEach(async () => {
      await db('Comments').insert(testData)
    })

    it('confirm successful deletion', async () => {
      const ticket_id = 1
      const id = 2
      const res = await request(server)
        .delete(`/api/tickets/${ticket_id}/comments/${id}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ message: `1 record deleted` })
    })

    it('confirm ticket no longer exists', async () => {
      const ticket_id = 1
      const id = 2
      await request(server).delete(`/api/tickets/${ticket_id}/comments/${id}`)
      const res = await request(server).get(`/api/tickets/${ticket_id}/comments/${id}`)
      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: `Record ${id} not found` })
    })

  })
})