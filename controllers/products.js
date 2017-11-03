const { wrap: async } = require('co')
const mongoose = require('mongoose')
const logger = require('../logger')
const { err } = require('../utils')
const only = require('only')

const { assign } = Object
const Product = mongoose.model('Product')
/* GET users listing. */

exports.list = async(function* list(req, res, next) {
  const options = {}
  if (req.query.cate) {
    assign(options, { categories: req.query.cate })
  }
  const products = yield Product.find(options).exec()
  req.$data = products
  next()
})

exports.pageList = async(function* pageList(req, res, next) {
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
    // res.json({ data: products, page: index, pages: Math.ceil(count / size) })
    req.$data = { data: products, page: index, pages: Math.ceil(count / size) }
  } catch (error) {
    next(error)
  }
  next()
})

exports.createOne = async(function* createOne(req, res, next) {
  try {
    const product = new Product(req.body)
    const existProduct = yield Product.loadByCode(product.code)
    if (existProduct) {
      throw (err(400, 'ERR_PRD_CODE_EXIST', 'Product with give code already exists'))
    }
    const newProduct = yield product.save()
    req.$data = { newProduct }
  } catch (error) {
    next(error)
  }
  next()
})

exports.update = async(function* update(req, res, next) {
  const { product } = req
  assign(product, only(req.body, 'name price'))
  try {
    yield product.save()
  } catch (error) {
    next(error)
  }
  next()
})

exports.loadByCode = async(function* loadByCode(req, res, next, code) {
  try {
    req.product = yield Product.loadByCode(code)
    if (!req.product) return next(new Error('Product not found'))
  } catch (error) {
    return next(error)
  }
  return next()
})

exports.get = (req, res, next) => {
  req.$data = only(req.product, '_id code name price')
  next()
}
