const mongoose = require('mongoose');
const model = require('../SchemaModels/ProductoMongoDB');
//const config = require('config');
//const mongoConnectionString = config.get('mongoDB.connection')  
const { MONGO_URI } = require('../config/config')
const mongoConnectionString = MONGO_URI 
  
class ContenedorProductosMongo{

    constructor(){
        
        const URL = mongoConnectionString
        mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(idProducto){
      let id = new mongoose.Types.ObjectId(idProducto)
      return await model.findById(id)
    }


    async save(producto){
        const productSaveModel = model(producto);
        return  await productSaveModel.save();
    }


    async update(producto,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,producto)   
        /*let obj = await model.findByIdAndUpdate({_id: idBuscado}, {$set: producto}) 
        console.log(`obj: ${obj}`)
        return  obj  */      
    }


    async delete(id){
        await model.findByIdAndRemove(id)
        
    }
}

module.exports = ContenedorProductosMongo