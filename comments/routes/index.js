const { Router } = require('express')
const { randomBytes } = require('crypto')
const { ROOT_URL } = require('../config')

const router = Router()
const commentsByPostId = {}

router.get(`${ROOT_URL}/:id/comments`, (req, res) => {
  const { id } = req.params
  res.status(200).send(commentsByPostId[id])
})

router.post(`${ROOT_URL}/:id/comments`, (req, res) => {
  const { id: postId } = req.params

  // generate random ID for comment
  const commentId = randomBytes(4).toString('hex')

  const { content } = req.body
  const comments = commentsByPostId[postId] || []
  const newComment = { id: commentId, content }
  comments.push(newComment)
  commentsByPostId[postId] = comments

  res.status(201).send(newComment)
})

module.exports = router
