
const logger = require('../logger')
const { getProductsFromDB , createProductFromDB , editProductFromDB , deleteProductFromDB } = require('../services/productServices')





const getProducts = (req, res)=>{
    let idProducto = req.params.id 
    logger.info('idProducto : ' + idProducto)
    getProductsFromDB(idProducto)
            .then(prod => 
                res.send(prod))
            .catch(err =>
                {
                logger.error(err)
                let msg = 'Error al obtener productos'
                res.send({err})   
                }) 
}





const createProduct = (req, res) =>{
    createProductFromDB(req.body)
            .then(productos =>{
                res.send(productos)
            })
            .catch(err =>{
                logger.error(err)
             //   let msg = 'Error al crear al Producto'
                res.status(400).send({err})  
            })
}





const editProduct = (req, res) =>{
    let idProducto = req.params.id    
    let productoEdicion = req.body
    
             editProductFromDB(productoEdicion,idProducto)
                 .then( productoEditado =>{
                    let msg = 'Producto editado correctamente'
                    res.send({msg})
                 }                    
                 )
                 .catch( error => {
                    logger.error(error)
                    let msg = 'Error al editar al Producto'   
                    res.send({msg})
                 }
                )    
}




const deleteProduct = (req, res) =>{
        let id = req.params.id   
                deleteProductFromDB(id)
                        .then(productoEliminado =>{
                            let msg = 'Producto ha sido eliminado'
                            res.send({msg})
                        })                           
                        .catch(error=>{
                            logger.error(error)
                            let msg = 'Error al eliminar el producto'
                            res.send({msg})
                        }
                            
                        )
        
}




module.exports = { getProducts,createProduct,editProduct,deleteProduct}