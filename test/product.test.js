const mongoose = require('mongoose')
const request = require('supertest')
const { expect, assert } = require('chai')
const app = require('../app')
const { cleanup } = require('./helper')

const Product = mongoose.model('Product')
const agent = request.agent(app)
const PRODUCT = { code: 'test1', name: 'Product Name1', price: 1 }


before((done) => { cleanup(done) })

describe('try', () => {
  it('should create a new product', (done) => {
    const product = new Product(PRODUCT)
    product.save()
      .then((result) => {
        assert(result.code, 'test1')
        done()
      }).catch((err) => {
        done(err)
      })
  })
})

after((done) => { cleanup(done) })
