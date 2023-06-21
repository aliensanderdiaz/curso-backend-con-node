const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlPicsumPhotos(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000);
    })
  }

  async findOne(id) {
    const productDB = this.products.find(product => product.id === id)
    if (!productDB) {
      throw boom.notFound('product not found')
    }
    if (productDB.isBlock) {
      throw boom.conflict('product is block')
    }
    return productDB
  }

  async update(id, data) {
    const index = this.products.findIndex(product => product.id === id)
    console.log({ index })
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    this.products[index] = { ...this.products[index], ...data }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw boom.notFound('product not found')
    }

    let productDeleted = { ...this.products[index] }
    this.products.splice(index, 1)
    console.log({ length: this.products.length })
    return productDeleted
  }
}

module.exports = ProductService
