const daoFactory = require('../Dao/DaoFactory')
const config = require('config');
let tipoProd = config.get('tipoPersistencia.persistenciaA')
let tipoCart = config.get('tipoPersistencia.persistenciaB')
const logger = require('../logger')


const getDao = (tipoPersistencia)=>{
    let factory = new daoFactory(tipoPersistencia) 
    return factory.getDao();
}


const createCartDB = async (newCar)=>{  
        let dao = getDao(tipoCart)
        return await dao.save(newCar)
                  
}



const deleteCartDB = async (id) =>{
    let factory = new daoFactory(tipoCart) 
    let dao = factory.getDao()  
    return await dao.delete(id)  
 }




 const getCartDB = async (id) =>{
    let factory = new daoFactory(tipoCart) 
    let dao = factory.getDao()  
    return await dao.getCart(id)  
 }




 const addProductToCartDB = async (idCart,idProduct,quantity) =>{
    let factory = new daoFactory(tipoCart) 
    let cartDao = factory.getDao()  
    let factory2 = new daoFactory(tipoProd) 
    let productDao = factory2.getDao()  
    let product = await productDao.getById(idProduct)
    let cartProduct= {
      nombre: product.nombre,
      precio: product.precio,
      cantidad : quantity
    }
    return await cartDao.addProductToCart(idCart,cartProduct)  
 }


 
 const removeProductFromCartDB = async (idCart,idProduct) =>{
    let factory = new daoFactory(tipoCart) 
    let cartDao = factory.getDao()  
    return await dao.removeProductFromCart(idCart,idProduct)
 }


module.exports= { createCartDB , deleteCartDB ,getCartDB ,addProductToCartDB , removeProductFromCartDB }