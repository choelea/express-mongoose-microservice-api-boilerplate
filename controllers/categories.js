const { wrap: async } = require('co')
const mongoose = require('mongoose')

const Category = mongoose.model('Category')
/* GET users listing. */
exports.list = async(function* list(req, res, next) {
  const options = {}

  const categories = yield Category.find(options).exec()
  res.json(categories)
})

exports.createOne = async(function* list(req, res, next) {
  try {
    const category = new Category(req.body)
    const result = yield category.save()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

