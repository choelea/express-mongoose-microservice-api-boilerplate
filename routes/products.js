const express = require('express')
const products = require('../controllers/products')

const router = express.Router()

/* GET users listing. */
router.get('/', products.list)
router.post('/', products.createOne)
module.exports = router
