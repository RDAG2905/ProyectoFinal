const daoFactory = require('../Dao/DaoFactory')
const config = require('config');
let tipoProd = config.get('tipoPersistencia.persistenciaA')
let tipoCart = config.get('tipoPersistencia.persistenciaB')
const logger = require('../logger')
const CartRepository = require('../Repository/CartRepository')
const ProductRepository = require('../Repository/ProductosRepository')
const Product = require('../BusinessModels/Product')
const util = require('util')

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
    logger.info(`product: ${util.inspect(product)}`)
    
    let cartProduct = new Product(product)
    cartProduct.quantity = quantity
    logger.info(`cartProduct: ${util.inspect(cartProduct)}`)
    let cart = await cartRepository.getCartById(idCart)
    logger.info(`cart 1: ${ util.inspect(cart)}`)
    cart.productos.push({cartProduct})
    logger.info(`cart 2: ${util.inspect(cart)}`)
    return await cartRepository.editCart(cart)
    //return await cartRepository.addProduct(idCart,cartProduct)  
 }


 
 const removeProductFromCartDB = async (idCart,idProduct) =>{
    let factory = new daoFactory(tipoCart) 
    let cartDao = factory.getDao()  
    return await dao.removeProductFromCart(idCart,idProduct)
 }


module.exports= { createCartDB , deleteCartDB ,getCartDB ,addProductToCartDB , removeProductFromCartDB }