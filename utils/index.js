

module.exports.err = function error(status, code, message) {
  const err = new Error(message)
  err.status = status
  err.code = code
  return err
}
