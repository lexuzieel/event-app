require('dotenv').config()

require('sequelize')

const express = require('express')
const session = require("express-session")
const app = express()
const port = process.env.PORT || 3000

const key = process.env.KEY

if (!key) {
    console.warn(
        "WARNING: Application key is empty! Use npm run install to generate one."
    )
    process.exit()
}

app.use(session({
    resave: true,
    secret: key,
    saveUninitialized: false
}))

require('./helpers')(express, app)

require('./auth')(express, app)

require('./routes')(express, app)

app.listen(port, () => console.log(`App listening on port ${port}!`))
