require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./routes/index')(express, app)

app.listen(port, () => console.log(`App listening on port ${port}!`))
