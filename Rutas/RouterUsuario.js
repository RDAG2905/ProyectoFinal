
const express = require('express')
const session = require('express-session')
const { Router } = express
const router = Router()


router.get('/getData',(req,res)=>{
      let user = session.user
})