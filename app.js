const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const commentRouter = require('./routes/comment')

const app = express()
let dbURL
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  dbURL = config.mongo_url_dev
}

const opts = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(dbURL, opts)

const db = mongoose.connection
db.once('open', () => {
  logger.debug(`Database connected: ${dbURL}`)
})

db.on('error', (error) => {
  logger.error(`connection error: ${error}`)
})

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')))

app.use(helmet())

app.use(cors())

app.use(middleware.loggingMiddleware)

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogRouter
)

app.use(
  '/api/comments',
  middleware.tokenExtractor,
  middleware.userExtractor,
  commentRouter
)

app.use(middleware.endPoint404)

app.use(middleware.errorHandler)

module.exports = app
