module.exports.responseError = function responseError(res, err) {
  if (err.name === 'ValidationError' || err.code === 11000) {
    res.status(400).json(err)
  } else {
    res.status(500).json(err)
  }
}
