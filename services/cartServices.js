const daoFactory = require('../Dao/DaoFactory')
const config = require('config');
let tipoProd = config.get('tipoPersistencia.persistenciaA')
let tipoCart = config.get('tipoPersistencia.persistenciaB')
const logger = require('../logger')
const CartRepository = require('../Repository/CartRepository')
const ProductRepository = require('../Repository/ProductosRepository')
const Product = require('../BusinessModels/Product')
const util = require('util')
const Cart = require('../BusinessModels/Cart')

/*
const getDao = (tipoPersistencia)=>{
    let factory = new daoFactory(tipoPersistencia) 
    return factory.getDao();
}
*/


const createCartDB = async (newCar)=>{  
        let repository = new CartRepository()
        return await repository.add(newCar)
                  
}



const deleteCartDB = async (id) =>{
    let repository = new CartRepository()
    return await repository.removeById(id)  
 }




 const getCartDB = async (id) =>{
   let repository = new CartRepository()
    return await repository.getCartById(id)  
 }




 const addProductToCartDB = async (idCart,idProduct,quantity) =>{
   
    let cartRepository = new CartRepository()

    let productRepository = new ProductRepository()

    let product = await productRepository.getById(idProduct)
  
    let cart = await cartRepository.getCartById(idCart)
     cart.productos.push({product,quantity})
    
    return await cartRepository.editCart(cart,idCart)
      
 }


 
 const removeProductFromCartDB = async (idCart,idProduct) =>{
    let cartRepository = new CartRepository()
    let cartDto = await cartRepository.getCartById(idCart)
    let cart = new Cart(cartDto)
    logger.info(util.inspect(`cart 1: ${cart}`))
    cart.EliminarProducto(idProduct)
    logger.info(util.inspect(`cart 2: ${cart}`))
    return await cartRepository.editCart(cart,idCart)
 }


  const getProductsByCar = async (idCart)=>{
        let cart = await getCartDB(idCart)
        logger.info(util.inspect(cart))
        return cart.productos
  }



module.exports= { createCartDB , deleteCartDB ,getCartDB ,addProductToCartDB , removeProductFromCartDB, getProductsByCar}