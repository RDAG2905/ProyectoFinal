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


router.post('/',(req,res)=>{ 
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    let dao = factory.getDao()  
    let idUsuario = passport.session._id
  
     dao.saveCarrito(idUsuario)
        .then(carritoId => { 
           
            let idCarrito = carritoId
            res.send({idCarrito})            
            
         })
        .catch(error =>
           
            res.render("Error",{error}) 
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
  
   if (idCarrito == ("undefined" || null || 0 )){
        res.render("CarritoVacio")
   }else{
        let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
        let dao = factory.getDao()
        let carrito = await dao.getCarritoConProductos(idCarrito)
        if(!carrito){           
            let error = 'Carrito de compras vacio'
            res.render("Error",{error})
        } else{
            let productos = carrito.productos
            res.send({productos})
        }  

   }
  
         
})





//pendiente**********************************
router.post('/:id/productos', async (req,res)=>{
    let idProductoNuevo = req.body
    
    let idCarrito = req.params.id
   
    let factory2 = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    if(factory2.tipoPersistencia == 'carritoSql'){
       /* daoCarritos.AgregarProductoAlCarrito(idCarrito,idProductoNuevo)
        .then(
            res.send({'OK':'Producto Agregado con éxito'}) 
        )
        .catch(error=>
            res.send({error}) 
        )*/
    
    }else{
  
    let daoCarritos = factory2.getDao()
    let factory1 = new daoFactory(config.get('tipoPersistencia.persistenciaA')) 
    let daoProductos = factory1.getDao()
    let productoAgregado = await daoProductos.getById(idProductoNuevo)
   
        if(!productoAgregado){
            res.send({errorProducto})
        }else{            
             await daoCarritos.AgregarProductoAlCarrito(idCarrito,productoAgregado)
           
                .then(carrito => {
                   
                    res.send({carrito}) }
                )
                /*.catch(error=>
                    res.send({error}) 
                )*/
            
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