const { randomBytes } = require('crypto')

module.exports = app => {
  const posts = {}

  app.route('/posts').get((req, res) => {
    res.status(200).send(posts)
  })

  app.route('/posts').post((req, res) => {
    // generate random ID
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = {id,title}

    res.status(201).send(posts[id])
  })
}