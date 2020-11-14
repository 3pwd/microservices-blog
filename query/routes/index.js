const { Router } = require('express')

const router = Router()

const postsAndComments = {}

router.post('/events', (req, res) => {
  const {
    type,
    data: { postId, title, id: commentId, content }
  } = req.body

  console.log('received event', type)
  if (type === 'PostCreated') {
    postsAndComments[postId] = { title, comments: [] }
  }

  if (type === 'CommentCreated') {
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
