const express = require('express')
const products = require('../controllers/products')
const categories = require('../controllers/categories')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Home Page' })
})

/* Products Related */
// router.param('productCode', products.loadByCode)
// router.get('/products', products.pageList)
// router.get('/products/:productCode', products.get)
// router.post('/products', products.createOne)
// router.put('/products/:productCode', products.update)

// router.get('/categories', categories.list)
// router.post('/categories', categories.createOne)

module.exports = router
