const mongoose = require('mongoose');
const model = require('../models/User');
const config = require('config');
const mongoConnectionString = config.get('mongoDB.connection')  
  
class ContenedorUsuariosMongoDB{

    constructor(){
        
        const URL = mongoConnectionString
        mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(idUsuario){
      return await model.findById(idUsuario)
    }


    async save(usuario){
        const productSaveModel = model(usuario);
        return await productSaveModel.save();
    }


    async update(usuario,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,usuario)     
       
    }


    async delete(id){
        await model.findByIdAndRemove(id)
        
    }
}

module.exports = ContenedorUsuariosMongoDB