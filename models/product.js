const mongoose = require('mongoose')

const Schama = mongoose.Schema

const ProductSchema = new Schama({
  code: { type: String, required: true, index: true, unique: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0, max: 100000 },
  categories: [String],
})

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
