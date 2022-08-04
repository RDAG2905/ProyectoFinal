const logger = require('../logger')
const { createCartDB , deleteCartDB , getCartDB , addProductToCartDB ,removeProductFromCartDB } = require('../services/cartServices')


const createCart = (req, res) =>{
    createCartDB(req.body)
            .then(idCart =>{
                res.send({idCart})
            })
            .catch(err =>{
                logger.error(err.stack)
                let msg = 'Error al crear al Carrito'
                res.send({msg})  
            })
}



const deleteCart = (req, res) =>{
    let id = req.params.id
    let msg = 'El carrito ha sido eliminado'
      deleteCartDB(id)
         .then(
             res.send({msg})
         )
         .catch(error=>{
            logger.error(error.stack)
            let errMsg = 'Error al eliminar del carrito'
            res.send({errMsg})
         }         
         )
}



const getCart = (req,res)=>{
    let idCart = req.params.id
         getCartDB(idCart)
            .then(productos =>
                res.send({productos}))
            .catch(err =>
                {
                logger.error(err)
                let msg = 'Error al recuperar los productos del carrito'
                res.send({msg})
                })
          
 }




 const addProductToCart = (req,res)=>{
    let idCart = req.params.id   
    const { idProduct, quantity } = req.body
    
         addProductToCartDB(idCart,idProduct,quantity)
            .then(cart =>
                res.send({cart}))
            .catch(err =>
            {
            logger.error(err. stack)
            let msg = 'Error al agregar el agregar producto al carrito'
            res.send({msg})
            })
          
 }




 const removeProductFromCart = (req,res)=>{
    let idCart = req.params.id
    let idProduct = req.params.id_prod   
    
        removeProductFromCartDB(idCart,idProduct)
            .then(cart =>
                res.send({cart}))
            .catch(err =>
            {
            logger.error(err)
            let msg = 'Error al eliminar el producto del carrito'
            res.send({msg})
            })
          
 }


module.exports = { createCart , deleteCart ,getCart ,addProductToCart,removeProductFromCart}