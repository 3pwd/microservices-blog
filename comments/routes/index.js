const { Router } = require('express')
const { randomBytes } = require('crypto')
const { ROOT_URL } = require('../config')

const router = Router()
const commentsByPostId = {}

router.route(`${ROOT_URL}/:id/comments`).get((req, res) => {
  const { id } = req.params
  res.status(200).send(commentsByPostId[id])
})

router.route(`${ROOT_URL}/:id/comments`).post((req, res) => {
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
