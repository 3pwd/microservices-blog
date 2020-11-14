const routes = require('./routes')
const express = require('express')

const PORT = 4000

const app = express()

app.use(express.json())
routes(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))