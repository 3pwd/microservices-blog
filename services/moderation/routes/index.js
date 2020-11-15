const { Router } = require('express')
const axios = require('axios')
const { randomBytes } = require('crypto')
const config = require('../../config')
const {
  COMMENT_MODERATED,
  COMMENT_CREATED,
  APPROVED,
  DENIED
} = require('../../types')

const {
  moderation: { ROOT_URL, FORBIDDEN },
  'event-bus': { PORT: EVENT_BUS_PORT }
} = config

const router = Router()
const commentsByPostId = {}

router.post(`${ROOT_URL}/:id/comments`, async (req, res) => {
  const { id: postId } = req.params

  // generate random ID for comment
  const commentId = randomBytes(4).toString('hex')

  const { content } = req.body
  const comments = commentsByPostId[postId] || []
  const newComment = { id: commentId, content }
  comments.push(newComment)
  commentsByPostId[postId] = comments

  // dispatch event to event bus
  await axios.post(`http://localhost:${EVENT_BUS_PORT}/events`, {
    type: COMMENT_CREATED,
    data: Object.assign(newComment, { postId })
  })

  res.status(201).send(newComment)
})

// handle event notifications from event bus
router.post('/events', async (req, res) => {
  let { type, data } = req.body
  console.log('received event', type)

  if (type === COMMENT_CREATED) {
    const status = data.content.toLowerCase().includes(FORBIDDEN)
      ? DENIED
      : APPROVED

    data = Object.assign(data, { status })

    await axios.post(`http://localhost:${EVENT_BUS_PORT}/events`, {
      type: COMMENT_MODERATED,
      data
    })
  }

  res.status(204).send({})
})

module.exports = router
