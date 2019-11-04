require('dotenv').config()
const fs = require('fs')
const crypto = require('crypto')

if (!fs.existsSync('.env')) {
    fs.copyFileSync('.env-example', '.env')
}

if (!process.env.KEY) {

    let key = crypto.createHash('sha256')
        .update(crypto.randomBytes(256))
        .digest("hex")

    fs.appendFileSync('.env', `\nKEY=${key}\n`)
}
