const router = require('express').Router()
const axios = require('axios')
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

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.findById('Tickets', id)
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
router.post('/', commentHandler, async (req, res) => {
  try {
    const data = await db.insert('Tickets', req.body)
   // await slackPostHandler(req.body)
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
    const data = await db.update('Tickets', id, req.body)
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
    const data = await db.remove('Tickets', id)
    if (data) {
      res.json(data)
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

async function commentHandler (req, res, next) {
  if (req.body.comment) {
    try {
      const comment = { comment: req.body.comment }
      delete req.body.comment
      const ticket = await db.insert('Tickets', req.body)
      comment.ticket_id = ticket.id
      comment.opened_by = ticket.opened_by
      await db.insert('Comments', comment)
      res.status(201).send(ticket)
    }
    catch (err) {
      res.status(500).send(err.message)
    }
  } else next()
}

/*async function slackPostHandler (data) {
  const url = 'https://hooks.slack.com/services/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'
  var text = `Someone has created a new ticket - ${data.title}.`;

  try {
    const data = await axios.post(url, JSON.stringify({
      text: text,
      channel: "help"
    }))
    return data
  }
  catch (err) {
    return { message: `"Could not post to Slack` }
  }
}*/

module.exports = router
