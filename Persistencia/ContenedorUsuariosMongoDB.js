const mongoose = require('mongoose');
const model = require('../SchemaModels/User');

const logger = require('../logger');




class ContenedorUsuariosMongoDB{

    constructor(){
      
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(id){
        return await model.findOne({ 'id': id })
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


    async getUserByUserName(username) {
        return await model.findOne({ 'email': username })
       
      
      
    }
    
}

module.exports = ContenedorUsuariosMongoDB