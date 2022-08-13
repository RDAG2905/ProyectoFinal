const express = require('express')
const {Router} = express
const userRouter = Router()


const { failRegisterController, successRegisterController }   = require('../controllers/AuthControllerJwt')
    

const authController = require('../controllers/AuthControllerJwt')


// registro de usuarios
userRouter.post('/register', authController.register)
userRouter.post('/successRegister', successRegisterController)
userRouter.post('/failRegister', failRegisterController)


module.exports = userRouter