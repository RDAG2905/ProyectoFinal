const express = require('express')
const {Router} = express
const router = Router()
const controller = require('../controllers/ChatController')


router.get('/chatRoom',controller.getChatRoom)

module.exports = router