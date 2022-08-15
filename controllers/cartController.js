const logger = require('../logger')
const { createCartDB , deleteCartDB , getCartDB , addProductToCartDB ,removeProductFromCartDB , getProductsByCar} = require('../services/cartServices')
const util = require('util')

const createCart = (req, res) =>{
    createCartDB(req.body)
            .then(data =>{
                res.send({data})
            })
            .catch(err =>{
                logger.error(err.stack)
                let msg = 'Cart creation failed . ' + err
                res.send({msg})  
            })
}



const deleteCart = (req, res) =>{
    let id = req.user.id
    let msg = 'Cart has been removed'
      deleteCartDB(id)
         .then(
             res.send({msg})
         )
         .catch(error=>{
            logger.error(error.stack)
            let errMsg = 'Cart deletion failed . ' + error
            res.send({errMsg})
         }         
         )
}



const getCart = (req,res)=>{
    let idCart = req.user.id
         getCartDB(idCart)
            .then(product =>
                res.send({product}))
            .catch(err =>
                {
                logger.error(err)
                let msg = 'product recovery failed . ' + err
                res.send({msg})
                })
          
 }




 const addProductToCart = (req,res)=>{
    let idCart = req.user.id   
    const { productId, quantity } = req.body
    
         addProductToCartDB(idCart,productId,quantity)
            .then(cart =>
                res.send({cart}))
            .catch(err =>
            {
            logger.error(err. stack)
            let msg = 'Error adding product to cart . ' + err
            res.send({msg})
            })
          
 }




 const removeProductFromCart = (req,res)=>{
    let idProduct = req.params.id
    let idCart = req.user.id
        removeProductFromCartDB(idCart,idProduct)
            .then(cart =>
                res.send({cart}))
            .catch(err =>
            {
            logger.error(err)
            let msg = 'Error deleting product from cart . ' + err
            res.send({msg})
            })
          
 }


 
const getProducts = (req, res) =>{
    let idCart = req.user.id
        getProductsByCar(idCart)
                .then(products =>{
                    res.send({products})
                })
                .catch(err =>{
                    logger.error(err.stack)
                    let msg = 'Error recovering products from cart . ' + err
                    res.send({msg})  
                })
}

module.exports = { createCart , deleteCart ,getCart ,addProductToCart,removeProductFromCart,getProducts}