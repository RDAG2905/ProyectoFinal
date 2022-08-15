const mongoose = require('mongoose');
const model = require('../SchemaModels/MensajesMongoDb');

const logger = require('../logger');


class ContenedorMensajesMongoDB{

    constructor(){
       
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(id){
      return await model.findById(id)
    }

    
    async getByUserName(userName){
        return await model.find({idUser: userName})
      }



    async save(element){
        const saveModel = model(element);
        return await saveModel.save();
    }


  
    
}

module.exports = ContenedorMensajesMongoDB