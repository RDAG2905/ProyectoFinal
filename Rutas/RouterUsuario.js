
const express = require('express')
const session = require('express-session')
const { Router } = express
const router = Router()
const passport = require('passport')


router.get('/getData',(req,res)=>{
      let user = passport.session
      res.send()
})