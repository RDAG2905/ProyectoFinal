
const services = require('../services/productServices')
const logger = require('../logger')


async function obtenerProductos() {
    logger.info(`1- GET api/productos`)
    try{
        return await services.getProductsFromDB()
    }
    catch (err){
        logger.error(err);
        return err
    }
}


async function obtenerUnProducto(producto) {
    logger.info(`2- GET api/productos/id/{idProducto}`)
    try{
        return await services.getProductsFromDB(producto.id)
    }
    catch (err){
        logger.error(err);
        return err
    }
}


async function agregarProducto(producto) {
    logger.info(`3- POST api/productos`)
    try{
        return await services.createProductFromDB(producto.datos)
    }
    catch (err){
        logger.error(err);
        return err
    }
}


async function borrarProducto(producto) {
    logger.info(`4- DELETE api/productos`)
    try{
       return await services.deleteProductFromDB(producto.id)
    }
    catch (err){
        logger.error(err);
        return err
    }
}

module.exports = { obtenerProductos,obtenerUnProducto,agregarProducto,borrarProducto}