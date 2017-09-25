const express = require('express')
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./routes/index')
const users = require('./routes/users')
const logger = require('./utils/logger')
const accessLogger = require('./middlewares/accessLogger')

const app = express()

app.use(accessLogger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/users', users)

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
  res.status(err.status || 500)
  res.json({ code: err.code || 500, message: err.message })
})

mongoose.connect('mongodb://localhost/emmab', { useMongoClient: true }, (error) => {
  logger.error(error.message)
})

module.exports = app
