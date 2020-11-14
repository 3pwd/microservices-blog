const routes = require('./routes')
const express = require('express')
const { PORT } = require('./config')

const app = express()

app.use(express.json())
routes(app)

app.listen(PORT, () => console.log(`Posts service 👂 on port ${PORT}`))