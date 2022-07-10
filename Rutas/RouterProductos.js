const express = require('express')
const { tipoPersistencia } = require('../config/default')
const { Router } = express
const router = Router()
const repository = require('../Dao/ProductosDaoMongoDB')
const productosDao = new repository()
const error = 'producto no encontrado' 
const daoFactory = require('../Dao/DaoFactory')
const config = require('config');
const logger = require('../logger')

let tipo = config.get('tipoPersistencia.persistenciaA')

const getDao = (tipoPersistencia)=>{
    let factory = new daoFactory(tipoPersistencia) 
    return factory.getDao();
}



router.get('/:id?',(req,res)=>{
   let idProducto = req.params.id    
   let dao = getDao(tipo)
  
        if(idProducto == 'undefined'){
                    dao.getAll()
                        .then(productos =>{
                          
                           res.send({productos})
                           //res.render("productosAdmin",{productos})
                        })
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




router.post('/',async (req,res)=>{
    let productoNuevo = req.body
    //logger.info(Object.values(productoNuevo))
    let dao = getDao(tipo)
    await dao.save(productoNuevo)
                .then(response =>{
                    //let productos = dao.getAll()
                    logger.info(response)
                    res.render("productosAdmin",{response}) 
                }
                )
                .catch( error => {
                    logger.error(error)
                    res.render("Error",{error})       
                })
    
})



router.put('/:id',(req,res)=>{
   let idProducto = req.params.id    
   let productoEdicion = req.body
   let dao = getDao(tipo)
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
   let dao = getDao(tipo)
                 dao.delete(id)
                    .then(productoEliminado =>
                        res.send({productoEliminado}))
                    .catch(error=>
                        res.send({error})
                    )
    
})

module.exports = router