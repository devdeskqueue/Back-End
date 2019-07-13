const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Load middleware

// ==== GET ==== //
router.get('/', async (req, res) => {
  try {
    const data = await db.findAll('Tickets')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// router.get('/api/tickets/:id', async (req, res) => {
//   try {

//   }
//   catch (err) {
//     res.status(500).send(err.message)
//   }
// })


// ==== POST ==== //

// ==== PUT ==== //

// ==== DELETE ==== //

module.exports = router