const { wrap: async } = require('co')
const mongoose = require('mongoose')

const Product = mongoose.model('Product')
/* GET users listing. */
exports.list = async(function* list(req, res) {
  const options = {}

  const articles = yield Product.find(options).exec()
  res.json(articles)
})

exports.createOne = async(function* list(req, res) {
  const PRODUCT = { code: 'product-1', name: 'Product A', price: 10 }
  const product = new Product(PRODUCT)
  const newProduct = yield product.save()
  res.json(newProduct)
})

