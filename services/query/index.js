const express = require('express')
const router = require('./routes')
const middlewares = require('./middlewares')

const { PORT } = require('./config')

const app = express()

app.use(middlewares)
app.use(router)

app.listen(PORT, () => console.log(`Query service 👂 on port ${PORT}`))
