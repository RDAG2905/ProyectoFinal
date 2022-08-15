const express = require('express')
const { Router } = express
const router = Router()

const ordersController = require('../controllers/OrdersController')


router.post('/',ordersController.createOrder)
router.get('/', ordersController.getOrders)




module.exports = router ;