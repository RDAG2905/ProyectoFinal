const daoFactory = require('../Dao/DaoFactory')
const config = require('config');
let tipo = config.get('tipoPersistencia.persistenciaA')
const logger = require('../logger')


const getDao = (tipoPersistencia)=>{
    let factory = new daoFactory(tipo) 
    return factory.getDao();
}




const  getProductsFromDB = async (idProducto)=>{    
    let productos        
    let dao = getDao(tipo)
                if(!idProducto){
                    productos  =  await dao.getAll() 
                }else{
                    productos  = await dao.getById(idProducto)
                    
                }
                return productos
}




const createProductFromDB = async (productoNuevo)=> {    
        let dao = getDao(tipo)
        let productSave = await dao.save(productoNuevo)  
        if(productSave){
            return await dao.getAll()
        } else{
            logger.error(`create Product : ${productSave}`)
            throw new Error('Error al crear el Producto') 
        }       
}



const editProductFromDB = async(productoEdicion,idProducto) => {    
        let dao = getDao(tipo)
        return await dao.update(productoEdicion,idProducto)   
}




const deleteProductFromDB = async(id)=>{
        let dao = getDao(tipo)
        return await dao.delete(id) 
}



module.exports = { getProductsFromDB,createProductFromDB,editProductFromDB,deleteProductFromDB}