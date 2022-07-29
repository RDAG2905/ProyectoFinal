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
    let factory = new daoFactory(config.get(tipoCart)) 
    let dao = factory.getDao()  
    return await dao.delete(id)  
 }




 const getCartDB = async (id) =>{
    let factory = new daoFactory(config.get(tipoCart)) 
    let dao = factory.getDao()  
    return await dao.getCart(id)  
 }




 const addProductToCartDB = async (idCart,idProduct) =>{
    let factory = new daoFactory(config.get(tipoCart)) 
    let cartDao = factory.getDao()  
    let factory2 = new daoFactory(config.get(tipoProd)) 
    let productDao = factory2.getDao()  
    let product = await productDao.getById(idProduct)
    return await cartDao.addProductToCart(idCart,product)  
 }


 
 const removeProductFromCartDB = async (idCart,idProduct) =>{
    let factory = new daoFactory(config.get(tipoCart)) 
    let cartDao = factory.getDao()  
    return await dao.removeProductFromCart(idCart,idProduct)
 }


module.exports= { createCartDB , deleteCartDB ,getCartDB ,addProductToCartDB , removeProductFromCartDB }