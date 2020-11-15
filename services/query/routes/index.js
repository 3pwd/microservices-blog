const { Router } = require('express')
const {
  POST_CREATED,
  COMMENT_CREATED,
  COMMENT_UPDATED,
  APPROVED
} = require('../../types')

const router = Router()

const postsAndComments = {}

router.post('/events', (req, res) => {
  const {
    type,
    data: { postId, title, id: commentId, content, status }
  } = req.body

  console.log('received event', type)

  if (type === POST_CREATED) {
    postsAndComments[postId] = { title, comments: {} }
  }

  if ([COMMENT_CREATED, COMMENT_UPDATED].includes(type)) {
    const comment = { content, status }
    postsAndComments[postId].comments[commentId] = comment
  }

  res.status(200).send({})
})

router.get('/posts', (_, res) => {
  // const approvedComments = comments =>
  //   Object.entries(comments).reduce((acc, [commentId, comment]) => {
  //     if (comment.status === APPROVED) {
  //       acc[commentId] = comment
  //       return acc
  //     } else {
  //       return acc
  //     }
  //   }, {})

  // const approvedPosts = Object.entries(postsAndComments).reduce(
  //   (acc, [postId, { title, comments }]) => {
  //     acc[postId] = { title, comments: approvedComments(comments) }
  //     return acc
  //   },
  //   {}
  // )

  res.status(200).send(postsAndComments)
})

module.exports = router
