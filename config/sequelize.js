require('dotenv').config()

let config = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || "3306",
    dialect: process.env.DATABASE_DIALECT || "mysql",
    dialectOptions: {
        timezone: 'Etc/GMT+3',
    },
}

switch (config.dialect) {
    case 'mariadb': {
        config.dialectModule = require('mariadb')
        break
    }
}

module.exports = {
    test: config,
    production: config,
    development: config,
    use_env_variable: true,
}
