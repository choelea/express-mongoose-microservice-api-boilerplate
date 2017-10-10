const { assign } = Object
const response = { success: true }

module.exports.respondError = function respondError(res, err) {
  if (err.name === 'ValidationError' || err.code === 11000) {
    res.status(400).json(err)
  } else {
    res.status(500).json(err)
  }
}

module.exports.respondSuccess = function respondError(res, obj) {
  const returnObj = response
  if (obj) {
    assign(returnObj, obj)
  }
  res.status(200).json(returnObj)
}
