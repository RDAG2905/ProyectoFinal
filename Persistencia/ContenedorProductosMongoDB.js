const mongoose = require('mongoose');
const model = require('../models/ProductoMongoDB');
const config = require('config');
const mongoConnectionString = config.get('mongoDB.connection')  
  
class ContenedorProductosMongo{

    constructor(){
        
        const URL = mongoConnectionString
        mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(idProducto){
      return await model.findById(idProducto)
    }


    async save(producto){
        const productSaveModel = model(producto);
        return await productSaveModel.save();
    }


    async update(producto,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,producto)     
       
    }


    async delete(id){
        await model.findByIdAndRemove(id)
        
    }
}

module.exports = ContenedorProductosMongo