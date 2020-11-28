const { Router } = require('express')
const axios = require('axios')
const config = require('../../config')
const {
  'event-bus': { PORT: BUS_PORT }
} = config
const {
  COMMENT_MODERATED,
  COMMENT_CREATED,
  APPROVED,
  DENIED
} = require('../../types')

const {
  moderation: { FORBIDDEN }
} = config

const router = Router()

// handle event notifications from event bus
router.post('/events', async (req, res) => {
  let { type, data } = req.body
  console.log('received event', type)

  if (type === COMMENT_CREATED) {
    const status = data.content.toLowerCase().includes(FORBIDDEN)
      ? DENIED
      : APPROVED

    data = Object.assign(data, { status })

    await axios.post(`http://event-bus-cluster-ip-service:${BUS_PORT}/events`, {
      type: COMMENT_MODERATED,
      data
    })
  }

  res.status(204).send({})
})

module.exports = router
