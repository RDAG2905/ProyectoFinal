const mongoose = require('mongoose');
const model = require('../SchemaModels/Order');
const config = require('config');
const logger = require('../logger');
const mongoConnectionString = config.get('mongoDB.connection')  
  
class ContenedorPedidosMongoDB{

    constructor(){
        
        const URL = mongoConnectionString
        mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(id){
      return await model.findById(id)
    }

    async getOrdersByUserId(id){
        //let idUser = new mongoose.Types.ObjectId(id)
        return await model.find({'idUser': id})
      }



    async save(element){
        const saveModel = model(element);
        return await saveModel.save();
    }


  
    
}

module.exports = ContenedorPedidosMongoDB