require('dotenv').config()

module.exports = {
    "secret" : process.env.SECRET,
    "connectionString" : process.env.CONNECTION_STRING
}