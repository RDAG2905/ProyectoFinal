const daoFactory = require('../Dao/DaoFactory')

const logger = require('../logger')
const Repository = require('../Repository/ProductosRepository')
const util = require('util')
let repository = new Repository()
const Product = require('../BusinessModels/Product')


const  getProductsFromDB = async ()=>{       
            return await repository.getAll()      
}


const getProductById = async(idProducto)=>{
   
        if(idProducto){
            return await repository.getById(idProducto)
        }else{
            throw new Error('Product Id is required')
        }
      
}



const createProductFromDB = async (productData)=> {    
        let productoNuevo = new Product(productData)
        productoNuevo.createId()
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



module.exports = { getProductsFromDB,createProductFromDB,deleteProductFromDB,getProductById,editProductFromDB}