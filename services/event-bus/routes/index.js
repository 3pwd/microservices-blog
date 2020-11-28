const { Router } = require('express')
const { ROOT_URL } = require('../../config')['event-bus']
const axios = require('axios')

const router = Router()

const events = []

router.post(ROOT_URL, (req, res) => {
  const event = req.body
  events.push(event)

  console.log('Event received', event.type)
  /* Echo event received to other services
  posts on port 4000
  comments on ports 4001
  query on port 4002
  */
  ;[
    ['posts', 4000],
    ['comments', 4001],
    ['query', 4002],
    ['moderation', 4003]
  ].forEach(([service, port]) =>
    axios.post(`http://${service}-cluster-ip-service:${port}/events`, event)
  )

  res.status(200).send({ status: 'OK' })
})

router.get('/events', (_, res) => res.status(200).send(events))

module.exports = router
