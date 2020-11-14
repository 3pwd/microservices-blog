const { Router } = require('express')
const { randomBytes } = require('crypto')
const { ROOT_URL } = require('../config')

const router = Router()
const posts = {}

router.get(ROOT_URL, (_, res) => {
  res.status(200).send(posts)
})

router.post(ROOT_URL, (req, res) => {
  // generate random ID
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { title }

  res.status(201).send(posts[id])
})

module.exports = router
