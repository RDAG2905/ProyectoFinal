const daoFactory = require('../Dao/DaoFactory')
const config = require('config');

const logger = require('../logger')
const Repository = require('../Repository/ProductosRepository')





const  getProductsFromDB = async (idProducto)=>{    
    let productos        
    let repository = new Repository()
                if(!idProducto){
                    productos  =  await repository.getAll() 
                }else{
                    productos  = await repository.getById(idProducto)
                    
                }
                return productos
}




const createProductFromDB = async (productoNuevo)=> {    
        let repository = new Repository()
        let productSave = await repository.add(productoNuevo)  
        if(productSave){
            return await repository.getAll()
        } else{
            logger.error(`create Product : ${productSave}`)
            throw new Error('Error al crear el Producto') 
        }       
}



const deleteProductFromDB = async(id)=>{
        let repository = new Repository()
        return await repository.removeById(id) 
}



module.exports = { getProductsFromDB,createProductFromDB,deleteProductFromDB}