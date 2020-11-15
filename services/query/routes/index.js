const { Router } = require('express')
const { POST_CREATED, COMMENT_CREATED } = require('../../types')

const router = Router()

const postsAndComments = {}

router.post('/events', (req, res) => {
  const {
    type,
    data: { postId, title, id: commentId, content }
  } = req.body

  console.log('received event', type)
  if (type === POST_CREATED) {
    postsAndComments[postId] = { title, comments: [] }
  }

  if (type === COMMENT_CREATED) {
    postsAndComments[postId].comments.push({
      id: commentId,
      content
    })
  }

  res.status(200).send({})
})

router.get('/posts', (_, res) => {
  res.status(200).send(postsAndComments)
})

module.exports = router
