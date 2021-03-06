const express = require('express')
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./models') // Bootstrap models, must be required before routers
const route = require('./routes')
const logger = require('./logger')
const accessLogger = require('./middlewares/accessLogger')
const respond = require('./middlewares/respond')

// mongoose starting, autoIndex is something tricky, pls try to learn more from below link.
// https://stackoverflow.com/questions/14342708/mongoose-indexing-in-production-code
function connect() {
  logger.info('Trying to connect mongodb ...')
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.EMM_DB || 'mongodb://localhost/emmab', { useMongoClient: true, config: { autoIndex: true } })
  return mongoose.connection
}
connect()
  .on('error', logger.error)
  .on('disconnected', connect)

// starting express
const app = express()

app.use(accessLogger)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', route)
// app.use(respond)  // Actually, don't need to use this. Just res.json in the controller js file

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.code = '404'
  err.message = 'Request resource doesn\'t exist'
  next(err)
})

/**
 * error-handling functions MUST have four arguments, otherwise it won't work.
 */
app.use((err, req, res, next) => {
  if (err) { logger.error(err) }
  res.status(err.status || 500)
  res.json({ code: err.code || 500, message: err.message })
})


module.exports = app
