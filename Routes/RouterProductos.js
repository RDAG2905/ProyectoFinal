const express = require('express')
const { Router } = express
const router = Router()
const productController = require('../controllers/productController')
const jwt = require('../middlewares/jwt')


router.get('/',productController.getProducts)
router.get('/:id',productController.getProduct)
router.post('/',jwt.auth,jwt.adminAuth,productController.createProduct)
router.put('/:id',jwt.auth,jwt.adminAuth,productController.editProduct)
router.delete('/:id',jwt.auth,jwt.adminAuth,productController.deleteProduct)



module.exports = router