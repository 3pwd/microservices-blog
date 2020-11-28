const { Router } = require('express')
const { handleEvent } = require('../lib')

module.exports = posts => {
  const router = Router()

  router.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log('received event', type)
    handleEvent(posts, type, data)
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

    // const approvedPosts = Object.entries(posts).reduce(
    //   (acc, [postId, { title, comments }]) => {
    //     acc[postId] = { title, comments: approvedComments(comments) }
    //     return acc
    //   },
    //   {}
    // )

    res.status(200).send(posts)
  })

  return router
}
