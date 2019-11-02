require('dotenv').config()

const redis = require('redis')
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

let RedisStore = require('connect-redis')(session)
let client = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_SESSION_DB || 1,
})

app.use(session({
    store: new RedisStore({ client }),
    resave: true,
    secret: key,
    saveUninitialized: false
}))

require('./helpers')(express, app)

require('./auth')(express, app)

require('./routes')(express, app)

app.listen(port, () => console.log(`App listening on port ${port}!`))
