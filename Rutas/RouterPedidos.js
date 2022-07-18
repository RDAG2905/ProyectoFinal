const express = require('express')
const { Router } = express
const router = Router()
const config = require('config');
const daoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')
const {notificarPedido} = require('../helpers/mailSender') 
const util = require('util')


router.post('/crearPedido', async (req,res)=>{
    let carritoReq = req.body
    logger.info(`carritoReq :  ${util.inspect(carritoReq)}`)
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
        let dao = factory.getDao()
        let carrito;
        try {
            carrito = await dao.getCarritoConProductos(carritoReq.carrito)
        } catch (error) {
            logger.error(error)
        }
       
        if(!carrito){           
            let error = `Carrito de compras vacio : ${carrito}`
            logger.info(`carrito vacio :  ${carrito}`)
            res.send({error})
        } else{
            let productos = carrito.productos
            //logger.info(`productos: ${productos}`)
            let lista = ""
           
            productos.array.forEach(element => {
                logger.info(`productos pare el email : ${element}`)
                lista += element.toString() 
            });
           
            notificarPedido(lista)
            let msg = "Se ha notificado el pedido"
            res.send({msg})
        }

})



module.exports = router ;