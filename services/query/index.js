const express = require('express')
const axios = require('axios')
const router = require('./routes')
const middlewares = require('./middlewares')
const { handleEvent } = require('./lib')
const config = require('../config')
const {
  query: { PORT },
  'event-bus': { PORT: EVENT_BUS_PORT }
} = config

let postsAndComments = {}

const app = express()

app.use(middlewares)
app.use(router(postsAndComments))

app.listen(PORT, async () => {
  // sync to event bus
  console.log('Syncing with event bus')
  const { data: events } = await axios.get(
    `http://event-bus:${EVENT_BUS_PORT}/events`
  )
  events.forEach(({ type, data }) => {
    console.log(`Processing event ${type}`)
    handleEvent(postsAndComments, type, data)
  })
  console.log('Query service synced')
  console.log(`Query service 👂 on port ${PORT}`)
})
