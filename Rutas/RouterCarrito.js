const express = require('express')
const { Router } = express
const router = Router()

const cartController = require('../controllers/cartController')


router.post('/',cartController.createCart)
router.delete('/:id', cartController.deleteCart)
router.get('/:id/productos', cartController.getCart)
router.post('/:id/productos',cartController.addProductToCart)
router.delete('/:id/productos/:id_prod',cartController.removeProductFromCart)

 

module.exports = router