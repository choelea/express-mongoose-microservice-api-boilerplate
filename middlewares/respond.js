module.exports = (req, res) => {
  // const resjson = { code: 0 }
  const resjson = {}
  if (req.$data) {
    Object.assign(resjson, req.$data)
  }
  res.json(resjson)
}
