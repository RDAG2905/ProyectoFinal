const mongoose = require('mongoose');
const logger = require('../logger');
const model = require('../SchemaModels/ProductoMongoDB');
//const config = require('config');
//const mongoConnectionString = config.get('mongoDB.connection')  
//const { MONGO_URI } = require('../config/config')
//const mongoConnectionString = MONGO_URI 
  
class ContenedorProductosMongo{

    constructor(){
        
      //  const URL = mongoConnectionString
      //  mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     
/*
    async getById(idProducto){
      let id = new mongoose.Types.ObjectId(idProducto)
      return await model.findById(id)
    }
*/
    async getById(idProducto){
        logger.info(`idProducto: ${idProducto}`)
        logger.info(typeof(idProducto))
        return await model.findOne({'id':idProducto})
    }
  
    

    async save(producto){
        const productSaveModel = model(producto);
        return  await productSaveModel.save();
    }



    async update(producto,idBuscado){
        let product = await this.getById(idBuscado)    
        await model.findByIdAndUpdate(product._id,producto)   
        return await this.getById(idBuscado)  
          
    }



    async delete(id){
        let product = await this.getById(id)
        return await model.findByIdAndRemove(product._id)
        
    }
}

module.exports = ContenedorProductosMongo