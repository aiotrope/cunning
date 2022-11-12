/* eslint-disable no-undef */
const dotenv = require('dotenv')

dotenv.config()

const mongo_url_dev = process.env.MONGO_URL_DEV
const jwt_key = process.env.JWT_KEY
const port = process.env.PORT

const config = {
  mongo_url_dev,
  jwt_key,
  port
}

module.exports = config