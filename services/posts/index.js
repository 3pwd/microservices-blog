const express = require('express')
const router = require('./routes')
const middlewares = require('./middlewares')

const { PORT } = require('../config').posts

const app = express()

app.use(middlewares)
app.use(router)

app.listen(PORT, () => console.log(`Posts service 👂 on port ${PORT}`))
