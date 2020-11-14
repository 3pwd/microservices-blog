const { randomBytes } = require('crypto')
const { ROOT_URL } = require('../config')

module.exports = app => {
  const posts = {}

  app.route(ROOT_URL).get((req, res) => {
    res.status(200).send(posts)
  })

  app.route(ROOT_URL).post((req, res) => {
    // generate random ID
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = {id,title}

    res.status(201).send(posts[id])
  })
}