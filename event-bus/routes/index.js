const { Router } = require('express')
const { ROOT_URL } = require('../config')
const axios = require('axios')

const router = Router()

router.post(ROOT_URL, (req, res) => {
  const event = req.body

  console.log('Event received', event.type)
  /* Echo event received to other services
  posts on port 4000
  comments on ports 4001
  query on port 4002
  */
  ;[0, 1, 2].forEach(digit =>
    axios.post(`http://localhost:400${digit}/events`, event)
  )

  res.status(200).send({ status: 'OK' })
})

module.exports = router
