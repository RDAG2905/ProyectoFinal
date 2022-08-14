const mongoose = require('mongoose');
const model = require('../SchemaModels/MensajesMongoDb');
//const config = require('config');
//const mongoConnectionString = config.get('mongoDB.connection')  
const logger = require('../logger');
//const { MONGO_URI } = require('../config/config')
//const mongoConnectionString = MONGO_URI

class ContenedorMensajesMongoDB{

    constructor(){
        
       // const URL = mongoConnectionString
       // mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(id){
      return await model.findById(id)
    }

    
    async getByUserName(userName){
        //let idUser = new mongoose.Types.ObjectId(id)
        return await model.find({idUser: userName})
      }



    async save(element){
        const saveModel = model(element);
        return await saveModel.save();
    }


  
    
}

module.exports = ContenedorMensajesMongoDB