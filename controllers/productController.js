
const logger = require('../logger')
const { getProductsFromDB , createProductFromDB , editProductFromDB , deleteProductFromDB,getProductById } = require('../services/productServices')
const jwt = require("jsonwebtoken");




const getProducts = (req, res)=>{
    getProductsFromDB()
            .then(prod => 
                res.send(prod))
            .catch(err =>
                {
                logger.error(err.stack)
                let msg = 'Error getting products'
                res.status(400).send({msg})   
                }) 
}


const getProduct = (req, res)=>{
    let idProducto = req.params.id 
   
    getProductById(idProducto)
            .then(prod => 
                res.send(prod))
            .catch(err =>
                {
                logger.error(err.stack)
                let msg = 'Error getting product'
                res.status(400).send({msg})   
                }) 
}





const createProduct = (req, res) =>{
    createProductFromDB(req.body)
            .then(productos =>{
                res.send(productos)
            })
            .catch(err =>{
                logger.error(err.stack)
                let msg = 'Error creating Product'
                res.status(400).send({msg})  
            })
}





const editProduct = (req, res) =>{
    let idProducto = req.params.id    
    let productoEdicion = req.body
    
             editProductFromDB(productoEdicion,idProducto)
                 .then( productoEditado =>{
                    res.send({productoEditado})
                 }                    
                 )
                 .catch( error => {
                    logger.error(error.stack)
                    let msg = 'Error editing product'   
                    res.status(404).send({msg})
                 }
                )    
}




const deleteProduct = (req, res) =>{
        let id = req.params.id   
                deleteProductFromDB(id)
                        .then(productoEliminado =>{
                            let result = 'The product has been removed'
                            res.send({result})
                        })                           
                        .catch(error=>{
                            logger.error(error.stack)
                            let msg = 'Error deleting product'
                            res.status(400).send({msg})
                        }
                            
                        )
        
}




module.exports = { getProducts,createProduct,editProduct,deleteProduct,getProduct}