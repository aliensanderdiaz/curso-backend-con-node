const express = require('express')
const ProductService = require('../services/product.service')

const router = express.Router()
const service = new ProductService()


router.get('/', async (req, res) => {
  const products = await service.find()
  const { size } = req.query
  const limit = size || 10

  res.json(products.slice(0, limit))
})

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter')
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const product = await service.findOne(id)

    if (!product) {
      return res.status(404).send('not found')
    }

    res.status(200).json(product)

  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const newProduct = await service.create(body)

  res.status(201).json({
    message: 'created',
    data: newProduct
  })
})

router.patch('/:id', async (req, res, next) => {
  try {

    const body = req.body
    const { id } = req.params

    console.log({ body, id })

    const productEdited = await service.update(id, body)

    if (!productEdited) {
      res.status(404).send('not found')
    }

    res.json({
      message: 'update partial',
      data: productEdited
    })

  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res) => {
  const body = req.body
  const { id } = req.params

  res.json({
    message: 'update total',
    data: body,
    id
  })
})

router.delete('/:id', async (req, res, next) => {

  try {

    const { id } = req.params

    const productDeleted = await service.delete(id)

    if (!productDeleted) {
      return res.status(404).send('not found')
    }

    res.json({
      message: 'deleted',
      data: productDeleted
    })

  } catch (error) {
    next(error)
  }
})

module.exports = router
