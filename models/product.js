const mongoose = require('mongoose')

const Schama = mongoose.Schema

const minlength = [5, 'The value of `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

const ProductSchema = new Schama({
  code: { type: String, required: true, minlength, index: true, unique: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0, max: 100000 },
  categories: [String],
})

ProductSchema.path('code').validate(function uniqueCode(code) {
  const Product = mongoose.model('Product')
  // Check only when it is a new Product or when code field is modified
  if (this.isNew || this.isModified('code')) {
    Product.find({ code }).exec((err, products) => (!err && products.length === 0))
  }
  return true
}, 'Product with given code already exists')

ProductSchema.statics = {


  /**
   * List products
   *
   * @param {Object} options
   * @api private
   */

  pageList: function pageList(conditions, index, size) {
    const criteria = conditions || {}
    const page = index || 0
    const limit = size || 30
    return this.find(criteria)
      .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec()
  },
}

mongoose.model('Product', ProductSchema)
