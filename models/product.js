const mongoose = require('mongoose')

const Schama = mongoose.Schema

const ProductSchema = new Schama({
  code: { type: String, required: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  price: Number,
  categories: [String],
})

mongoose.model('Product', ProductSchema)
