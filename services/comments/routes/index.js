const { Router } = require('express')
const axios = require('axios')
const config = require('../../config')
const { randomBytes } = require('crypto')
const {
  COMMENT_CREATED,
  PENDING,
  COMMENT_MODERATED,
  COMMENT_UPDATED
} = require('../../types')

const { ROOT_URL } = config.comments
const { PORT: EVENT_BUS_PORT } = config['event-bus']

const router = Router()
const commentsByPostId = {}

router.get(`${ROOT_URL}/:id/comments`, (req, res) => {
  const { id } = req.params
  res.status(200).send(commentsByPostId[id])
})

router.post(`${ROOT_URL}/:id/comments`, async (req, res) => {
  const { id: postId } = req.params

  // generate random ID for comment
  const commentId = randomBytes(4).toString('hex')

  const { content } = req.body
  const comments = commentsByPostId[postId] || {}
  const newComment = { content, status: PENDING }
  comments[commentId] = newComment
  commentsByPostId[postId] = comments

  // dispatch event to event bus
  await axios.post(
    `http://event-bus-cluster-ip-service:${EVENT_BUS_PORT}/events`,
    {
      type: COMMENT_CREATED,
      data: Object.assign(newComment, { postId, id: commentId })
    }
  )

  res.status(201).send(newComment)
})

// handle event notifications from event bus
router.post('/events', async (req, res) => {
  const { type, data } = req.body
  console.log('received event', type)

  const { postId, id: commentId, content, status } = data

  if (type === COMMENT_MODERATED) {
    commentsByPostId[postId][commentId] = { content, status }

    await axios.post(`http://event-bus:${EVENT_BUS_PORT}/events`, {
      type: COMMENT_UPDATED,
      data
    })
  }
  res.status(204).send({})
})

module.exports = router
