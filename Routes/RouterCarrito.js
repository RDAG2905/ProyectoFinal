const express = require('express')
const { Router } = express
const router = Router()

const cartController = require('../controllers/cartController')


router.post('/',cartController.addProductToCart)
router.get('/', cartController.getProducts)
router.delete('/:id',cartController.removeProductFromCart)

//router.delete('/:id', cartController.deleteCart)
//router.post('/:id/productos',cartController.addProductToCart)

//router.delete('/:id/productos/:id_prod',cartController.removeProductFromCart)
//router.get('/:id/productos', cartController.getProducts)
//router.post('/',cartController.createCart) 

module.exports = router