const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Load middleware

// ==== GET ==== //
router.get('/', async (req, res) => {
  try {
    const data = await db.findAll('Categories')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.findById('Categories', id)
    if (data) {
      res.send(data)
    } else {
      res.status(404).json({ message: `Record ${id} not found` })
    }

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== POST ==== //
router.post('/', async (req, res) => {
  try {
    const data = await db.insert('Categories', req.body)
    res.status(201).send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== PUT ==== //
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.update('Categories', id, req.body)
    res.send(data)
  }

  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== DELETE ==== //
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.remove('Categories', id)
    if (data) {
      res.json(data)
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router