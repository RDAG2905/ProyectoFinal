const express = require('express')
const {Router} = express
const router = Router()
const { fork } = require('child_process')
const path = require('path')

router.get('/',(req,res)=>{
    const cantidad = req.query.cant ?? 100000000
    const hijo  = fork(global.root + '/childProcess/calcularPares.js')
        hijo.send(cantidad.toString())
        hijo.on('message', 
            resultado => {
                res.send({ resultado })
        })   
 })





  module.exports = router