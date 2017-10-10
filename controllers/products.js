const { wrap: async } = require('co')
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const { responseError } = require('../utils')

const { assign } = Object
const Product = mongoose.model('Product')
/* GET users listing. */

exports.list = async(function* list(req, res) {
  const options = {}
  if (req.query.cate) {
    assign(options, { categories: req.query.cate })
  }
  const products = yield Product.find(options).exec()
  res.json(products)
})

exports.pageList = async(function* pageList(req, res) {
  try {
    const index = parseInt(req.query.page, 10) || 1
    const size = parseInt(req.query.size, 10) || 10
    const conditions = {}
    if (req.query.cate) {
      assign(conditions, { categories: req.query.cate })
    }
    logger.debug(`index is ${index}`)
    const count = yield Product.count(conditions).exec()
    const products = yield Product.pageList(conditions, index - 1, size)
    res.json({ data: products, page: index, pages: Math.ceil(count / size) })
  } catch (err) {
    responseError(res, err)
  }
})

exports.createOne = async(function* list(req, res) {
  try {
    const product = new Product(req.body)
    const newProduct = yield product.save()
    res.json(newProduct)
  } catch (err) {
    responseError(res, err)
  }
})

