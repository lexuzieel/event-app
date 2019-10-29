const fs = require('fs')
const crypto = require('crypto')

let key = crypto.createHash('sha256')
    .update(crypto.randomBytes(256))
    .digest("hex")

fs.appendFileSync('.env', `\nKEY=${key}\n`)
