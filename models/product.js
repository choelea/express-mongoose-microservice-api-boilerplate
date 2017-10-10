const mongoose = require('mongoose')

const Schama = mongoose.Schema

const minlength = [3, 'The value of `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

const ProductSchema = new Schama({
  code: { type: String, required: true, minlength, index: true, unique: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0, max: 100000 },
  categories: [String],
})

// this has to be an async validator as modal.find() is async. Please refer to below
// http://mongoosejs.com/docs/validation.html#async-custom-validators
ProductSchema.path('code').validate({
  isAsync: true,
  validator: function v(code, respond) {
    const Product = mongoose.model('Product')
    // Check only when it is a new Product or when code field is modified
    if (this.isNew || this.isModified('code')) {
      Product.find({ code }).exec((err, products) => {
        if (!err && products.length > 0) {
          respond(false)
        }
      })
    } else {
      respond(true)
    }
  },
  message: 'Product with given code already exists', // Optional
})


ProductSchema.statics = {
  loadByCode: function loadByCode(code) {
    return this.findOne({ code }).exec()
  },
  pageList: function pageList(conditions, index, size) {
    const criteria = conditions || {}
    const page = index || 0
    const limit = size || 30
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec()
  },
}

mongoose.model('Product', ProductSchema)
