

const logger = require('../logger')
const CartRepository = require('../Repository/CartRepository')
const ProductRepository = require('../Repository/ProductosRepository')
const Product = require('../BusinessModels/Product')
const ProductCart = require('../BusinessModels/ProductCart')
const util = require('util')
const Cart = require('../BusinessModels/Cart')
const cartError = 'The cart does not exist !!'
const productError = 'The product does not exist !!'
const productIdError = 'The product Id was not provided !!'
const cartIdError = 'The shoppingCart Id was not provided !!'

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




 const addProductToCartDB = async (idCart,productId,quantity) =>{
   let productCart
   let product
   let cartDto 
        product = await productRepository.getById(productId)
         if(product){
            productCart ={product,quantity}

            cartDto = await cartRepository.getCartById(idCart)
               if(cartDto){
                  let cart = new Cart(cartDto)
                 
                 cart.productos.push(productCart)

                  return await cartRepository.editCart(cart)
               }else{
                  throw new Error(cartError)       
               }              
         }else{
            throw new Error(productError)            
         }
      
   }


 
 const removeProductFromCartDB = async (idCart,idProduct) =>{
      if (!idProduct) throw new Error(productIdError)
      if (!idCart) throw new Error(cartIdError)
      let cartDto = await cartRepository.getCartById(idCart)

         if(cartDto){
            let cart = new Cart(cartDto)
            cart.removeProduct(idProduct)
            return await cartRepository.editCart(cart)
         }else{
            throw new Error(cartError)
         }
      
 }


  const getProductsByCar = async (idCart)=>{
        let cart = await getCartDB(idCart)
        return cart.productos
  }



module.exports= { createCartDB , deleteCartDB ,getCartDB ,addProductToCartDB , removeProductFromCartDB, getProductsByCar ,createCartByUser }