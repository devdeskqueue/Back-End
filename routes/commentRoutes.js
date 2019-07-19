const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Load middleware

// ==== GET ==== //
router.get('/:ticket_id/comments', async (req, res) => {
  try {
    const data = await db.findByTicketId('Comments', req.params.ticket_id)
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:ticket_id/comments/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.findByTicketId('Comments', req.params.ticket_id)
    if (data) {
      const filteredData = data.find(obj => obj.id == req.params.id)
      res.send(filteredData)
    } else {
      res.status(404).json({ message: `Record ${id} not found` })
    }

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== POST ==== //
router.post('/:ticket_id/comments', async (req, res) => {
  try {
    const data = await db.insert('Comments', req.body)
    res.status(201).send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== PUT ==== //
router.put('/:ticket_id/comments/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await db.update('Comments', id, req.body)
    res.send(data)
  }

  catch (err) {
    res.status(500).send(err.message)
  }
})


// ==== DELETE ==== //
router.delete('/:ticket_id/comments/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.remove('Comments', id)
    if (data) {
      res.json(data)
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router