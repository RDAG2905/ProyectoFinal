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
      let id = new mongoose.Types.ObjectId(idProducto)
      return await model.findById(id)
    }


    async save(producto){
        const productSaveModel = model(producto);
        await productSaveModel.save();
        return await this.getAll()
    }


    async update(producto,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,producto)     
       
    }


    async delete(id){
        await model.findByIdAndRemove(id)
        
    }
}

module.exports = ContenedorProductosMongo