const { Router } = require('express')
const axios = require('axios')
const { randomBytes } = require('crypto')
const { POST_CREATED } = require('../../types')
const config = require('../../config')

const { ROOT_URL } = config.posts
const { PORT: EVENT_BUS_PORT } = config['event-bus']

const router = Router()
const posts = {}

router.get(ROOT_URL, (_, res) => {
  res.status(200).send(posts)
})

router.post(ROOT_URL, async (req, res) => {
  // generate random ID
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { title }

  // Dispatch event to event bus
  await axios.post(`http://localhost:${EVENT_BUS_PORT}/events`, {
    type: POST_CREATED,
    data: {
      postId: id,
      title
    }
  })
  res.status(201).send(posts[id])
})

// handle event notifications from event bus
router.post('/events', (req, res) => {
  const { type } = req.body
  console.log('received event', type)
  res.status(204).send({})
})

module.exports = router
