const { Router } = require('express')
const axios = require('axios')
const { randomBytes } = require('crypto')
const { ROOT_URL } = require('../config')

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
  const comments = commentsByPostId[postId] || []
  const newComment = { id: commentId, content }
  comments.push(newComment)
  commentsByPostId[postId] = comments

  // dispatch event to event bus
  await axios.post('http://localhost:4003/events', {
    type: 'CommentCreated',
    data: Object.assign(newComment, { postId })
  })

  res.status(201).send(newComment)
})

// handle event notifications from event bus
router.post('/events', (req, res) => {
  const { type } = req.body
  console.log('received event', type)
  res.status(204).send({})
})

module.exports = router
