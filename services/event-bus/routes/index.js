const { Router } = require('express')
const { ROOT_URL } = require('../../config')['event-bus']
const axios = require('axios')
const config = require('../../config')

const router = Router()

router.post(ROOT_URL, (req, res) => {
  const event = req.body

  console.log('Event received', event.type)
  /* Echo event received to other services
  posts on port 4000
  comments on ports 4001
  query on port 4002
  */
  ;['posts', 'comments', 'query', 'moderation'].forEach(service =>
    axios.post(`http://localhost:${config[service].PORT}/events`, event)
  )

  res.status(200).send({ status: 'OK' })
})

module.exports = router
