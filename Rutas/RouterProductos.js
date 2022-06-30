const express = require('express')
const { tipoPersistencia } = require('../config/default')
const { Router } = express
const router = Router()
const repository = require('../Dao/ProductosDaoMongoDB')
const productosDao = new repository()
const error = 'producto no encontrado' 
const daoFactory = require('../Dao/DaoFactory')
const config = require('config');




const getDao = (tipoPersistencia)=>{
    let factory = new daoFactory(tipoPersistencia) 
    return factory.getDao();
}



router.get('/:id?',(req,res)=>{
   let idProducto = req.params.id    
   let dao = getDao(config.get('tipoPersistencia.persistenciaA'))
   
        if(!idProducto){
                    dao.getAll()
                        .then(productos =>
                           res.render("tabla",{productos}))
                           
                        .catch(error=>                           
                            res.render("Error",{error}))
                            
        }else{
                    dao.getById(idProducto)
                        .then(producto =>
                            res.send({producto})
                        )
                        .catch(error => 
                            res.send({error}))                           
        }   
})




router.post('/',(req,res)=>{
    let productoNuevo = req.body
    let dao = getDao(config.get('tipoPersistencia.persistenciaA'))
    dao.save(productoNuevo)
        .then(productoCreado =>
            res.send({productoCreado}) 
        )
        .catch( error =>
            res.send({error})       
        )
    
})



router.put('/:id',(req,res)=>{
   let idProducto = req.params.id    
   let productoEdicion = req.body
   let dao = getDao(config.get('tipoPersistencia.persistenciaA'))
            dao.update(productoEdicion,idProducto)
                .then( productoEditado =>
                      res.send({productoEditado})
                )
                .catch( error =>
                      res.send({error})
                )    
})



router.delete('/:id',(req,res)=>{
   let id = req.params.id
   let dao = getDao(config.get('tipoPersistencia.persistenciaA'))
                 dao.delete(id)
                    .then(productoEliminado =>
                        res.send({productoEliminado}))
                    .catch(error=>
                        res.send({error})
                    )
    
})

module.exports = router