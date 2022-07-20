const express = require('express')
const Carrito = require('../Business/Carrito.js')
const { Router } = express
const router = Router()
const repository = require('../Dao/CarritosDaoMongoDB')
const daoCarritos = new repository()
const productosRepo = require('../Dao/ProductosDaoMongoDB')
const daoProductos = new productosRepo()
const daoFactory = require('../Dao/DaoFactory')
const errorProducto = 'producto no encontrado' 
const config = require('config');
const session = require('express-session')
const logger = require('../logger.js')
const { info } = require('../logger.js')
const passport = require('passport')
let util = require('util');
let ProductoCarrito = require('../Business/ProductoCarrito')
let Changuito = require('../Business/Carrito')

router.post('/',(req,res)=>{ 
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    let dao = factory.getDao()  
    let id = passport.session._id
  
     dao.saveCarrito(id)
        .then(carritoId => { 
           
            let idCarrito = carritoId
           // logger.info(`idCarrito: ${idCarrito}`)
            res.send({idCarrito})            
            
         })
        .catch(error =>
           
            res.send({error}) 
        )        
})




router.delete('/:id',(req,res)=>{
    let id = req.params.id
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    let dao = factory.getDao()  
      dao.delete(id)
         .then(carritoEliminado =>
             res.send({carritoEliminado})
         )
         .catch(error=>
             res.send({error})
         )
    
 })


 
//pendiente*****************************

router.get('/:id/productos',async (req,res)=>{
   let idCarrito = req.params.id
   let carrito 
   let chango
   if (idCarrito == ("undefined" || null || 0 )){
        res.render("CarritoVacio")
   }else{
        let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
        let dao = factory.getDao()
        try {
            carrito = await dao.getCarritoConProductos(idCarrito)
            logger.info(`carrito get productos ${carrito}`)
            chango = new Changuito(carrito)
            logger.info(`chango get productos  ${util.inspect(chango)}`)
            logger.info(Object.entries(chango))
        } catch (error) {
            logger.error(error)
            let err = 'Error al recuperar los productos del Carrito'
            res.send({err})
        }
       
        
        if(!carrito){           
            let error = 'Carrito de compras vacio'
            res.send({error})
        } else{
            //let productos = carrito.productos
            //res.send({productos})
            res.send({chango})
        }  

   }
  
         
})





//pendiente**********************************
router.post('/:id/productos', async (req,res)=>{
   
    const { id,cantidad } = req.body
    logger.info(`cantidad: ${cantidad}`)
    let idCarrito = req.params.id
   
    let factory2 = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    if(factory2.tipoPersistencia == 'carritoSql'){
       
    }else{
  
    let daoCarritos = factory2.getDao()
    let factory1 = new daoFactory(config.get('tipoPersistencia.persistenciaA')) 
    let daoProductos = factory1.getDao()
    let productoAgregado = await daoProductos.getById(id)
    let productoCarrito = new ProductoCarrito(productoAgregado)
    productoCarrito.cantidad = cantidad
   // logger.info(`productoCarrito: ${productoCarrito}`)
    
        if(!productoAgregado){
            res.send({errorProducto})
        }else{            
            try {
               let carrito = await daoCarritos.AgregarProductoAlCarrito(idCarrito,productoCarrito)
           //    logger.info('carrito from DB: ' + util.inspect(carrito))
               let chango = new Changuito(carrito)
            //   logger.info('chango: ' + util.inspect(chango))
               res.send({chango}) 
            } catch (error) {
               logger.error(error)
               let msgError = 'Error al recuperar el carrito'               
               res.send({msgError}) 
            }
            
           
              
            
            }
        }   
    
})






//pendiente****************************************
router.delete('/:id/productos/:id_prod',(req,res)=>{
    let idCarrito = req.params.id
    let idProducto = req.params.id_prod
    daoCarritos.eliminarProductoDelCarrito(idCarrito,idProducto)
        .then(
            res.send({'':'Producto Eliminado con éxito'}))
        .catch(error =>
            res.send(error)
        )
    
    
 })
 

module.exports = router