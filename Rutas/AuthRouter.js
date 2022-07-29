const express = require('express')
const {Router} = express
const authRouter = Router()


const {   failLoginController, successLoginController,
          failRegisterController, successRegisterController,logoutController
      }   = require('../controllers/AuthControllerJwt')

const authController = require('../controllers/AuthControllerJwt')


// registro
authRouter.post('/register', authController.register)
authRouter.post('/successRegister', successRegisterController)
authRouter.post('/failRegister', failRegisterController)

// login
authRouter.post('/login', authController.login)
authRouter.post('/successLogin', successLoginController)
authRouter.post('/failLogin', failLoginController)

// logout
authRouter.get('/logout', logoutController)


module.exports = authRouter