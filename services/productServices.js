const daoFactory = require('../Dao/DaoFactory')

const logger = require('../logger')
const Repository = require('../Repository/ProductosRepository')
const util = require('util')
let repository = new Repository()
const Product = require('../BusinessModels/Product')


const  getProductsFromDB = async (idProducto)=>{    
    let productos        
    
                if(!idProducto){
                    productos  =  await repository.getAll() 
                }else{
                    productos  = await repository.getById(idProducto)
                    
                }
                //logger.info(util.inspect(productos))
                return productos
}




const createProductFromDB = async (productData)=> {    
        let productoNuevo = new Product(productData)
        let productSave = await repository.add(productoNuevo)  
            if(!productSave){           
                logger.error(`creating Product : ${productSave}`)
                throw new Error('the product cannot be created') 
            }   
        return productSave    
}


const editProductFromDB = async(productoEdicion,idProducto)=>{
    let product  = await repository.getById(idProducto)
        if(product){
            let productoAEditar = new Product(productoEdicion)  
            return await repository.edit(productoAEditar,idProducto)
        }else{
            throw new Error('Product not found')
        }
}


const deleteProductFromDB = async(id)=>{
        return await repository.removeById(id) 
}



module.exports = { getProductsFromDB,createProductFromDB,deleteProductFromDB}