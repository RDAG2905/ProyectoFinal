const express = require('express')
const Carrito = require('../Business/Carrito.js')
const { Router } = express
const router = Router()
const repository = require('../Dao/CarritosDaoMongoDB')
const daoCarritos = new repository()
const productosRepo = require('../Dao/ProductosDaoMongoDB')
const daoProductos = new productosRepo()
const daoFactory = require('../Dao/DaoFactory')
//const error = 'carrito no encontrado' 
const errorProducto = 'producto no encontrado' 
const config = require('config');
const session = require('express-session')
const logger = require('../logger.js')


router.post('/',(req,res)=>{ 
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    let dao = factory.getDao()  
    let idUsuario = session.user.usuarioId
     dao.saveCarrito(idUsuario)
        .then(carrito =>         
            res.send({carrito}) 
        )
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
   logger.info(idCarrito)
   if (idCarrito == "undefined"){
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
            res.render("tabla",{productos})
        }  

   }
  
         
})





//pendiente**********************************
router.post('/:id/productos', async (req,res)=>{
    let idProductoNuevo = req.body.id
    let idCarrito = req.params.id
     
    let factory2 = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    if(factory2.tipoPersistencia == 'carritoSql'){
        daoCarritos.AgregarProductoAlCarrito(idCarrito,idProductoNuevo)
        .then(
            res.send({'OK':'Producto Agregado con éxito'}) 
        )
        .catch(error=>
            res.send({error}) 
        )
    
    }else{
  
    let daoCarritos = factory2.getDao()
    let factory1 = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    let daoProductos = factory1.getDao()
    let productoNuevo = await daoProductos.getById(idProductoNuevo)
    
        if(!productoNuevo){
            res.send({errorProducto})
        }else{            
             daoCarritos.AgregarProductoAlCarrito(idCarrito,productoNuevo)
                .then(
                    res.send({'OK':'Producto Agregado con éxito'}) 
                )
                .catch(error=>
                    res.send({error}) 
                )
            
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