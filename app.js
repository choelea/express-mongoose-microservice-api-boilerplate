const express = require('express')
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./models') // Bootstrap models, must be required before routers
const index = require('./routes/index')
const users = require('./routes/products')
const logger = require('./utils/logger')
const accessLogger = require('./middlewares/accessLogger')

// mongoose starting
mongoose.Promise = global.Promise
mongoose.connect(process.env.EMM_DB, { useMongoClient: true, config: { autoIndex: false } }, (error) => {
  if (error) {
    logger.error(error.message)
  }
})

// starting express
const app = express()

app.use(accessLogger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/products', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.code = '404'
  err.message = 'Request resource doesn\'t exist'
  next(err)
})

// error handler
app.use((err, req, res) => {
  // render the error page
  if (err) { logger.error(err) }
  res.status(err.status || 500)
  res.json({ code: err.code || 500, message: err.message })
})

module.exports = app
