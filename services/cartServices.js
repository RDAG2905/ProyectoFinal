

const logger = require('../logger')
const CartRepository = require('../Repository/CartRepository')
const ProductRepository = require('../Repository/ProductosRepository')
const Product = require('../BusinessModels/Product')
const ProductCart = require('../BusinessModels/ProductCart')
const util = require('util')
const Cart = require('../BusinessModels/Cart')
const cartError = 'The cart does not exist !!'
const productError = 'The product does not exist !!'

let cartRepository = new CartRepository()
let productRepository = new ProductRepository()


const createCartDB = async (data)=>{        
        let cart = new Cart(data)
        cart.createId()
        return await cartRepository.add(cart)
                  
}


const createCartByUser = async (userId)=>{        
   let shoppingCart = new Cart()
   shoppingCart.initialize(userId)
   return await cartRepository.add(shoppingCart)
             
}



const deleteCartDB = async (id) =>{
    return await cartRepository.removeById(id)  
 }




 const getCartDB = async (id) =>{
    return await cartRepository.getCartById(id)  
 }




 const addProductToCartDB = async (idCart,idProduct,quantity) =>{
   
    let product = await productRepository.getById(idProduct)
         if(product){
            let productCart = new ProductCart(product,quantity)
            let cartDto = await cartRepository.getCartById(idCart)
               if(cartDto){
                  let cart = new Cart(cartDto)
                 // cart.productos.push(productCart)
                 cart.addProduct(productCart)
                  return await cartRepository.editCart(cart,idCart)
               }else{
                  throw new Error(cartError)       
               }              
         }else{
            throw new Error(productError)            
         }
      
   }


 
 const removeProductFromCartDB = async (idCart,idProduct) =>{
   
    let cartDto = await cartRepository.getCartById(idCart)
      if(cartDto){
         let cart = new Cart(cartDto)
      //  logger.info(util.inspect(`cart 1: ${cart}`))
         cart.removeProduct(idProduct)
      //  logger.info(util.inspect(`cart 2: ${cart}`))
         return await cartRepository.editCart(cart,idCart)
      }else{
         throw new Error(cartError)
      }
      
 }


  const getProductsByCar = async (idCart)=>{
        let cart = await getCartDB(idCart)
 //       logger.info(util.inspect(cart))
        return cart.productos
  }



module.exports= { createCartDB , deleteCartDB ,getCartDB ,addProductToCartDB , removeProductFromCartDB, getProductsByCar ,createCartByUser }