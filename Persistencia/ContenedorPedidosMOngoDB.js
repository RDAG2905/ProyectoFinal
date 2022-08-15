const mongoose = require('mongoose');
const model = require('../SchemaModels/Order');
//const config = require('config');
const logger = require('../logger');
//const mongoConnectionString = config.get('mongoDB.connection') 
const util = require('util')
const { MONGO_URI } = require('../config/config')
const mongoConnectionString = MONGO_URI  


class ContenedorPedidosMongoDB{

    constructor(){
        
       // const URL = mongoConnectionString
       // mongoose.connect(URL, {});   
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(id){
      return await model.findOne({ 'id': id })
  }
 

  async getOrdersByUserId(id){
    return await model.find({ 'idUser': id })
  }

/*
    async getById(id){
      return await model.findById(id)
    }


    async getOrdersByUserId(id){
        let x = await model.find({})
        logger.info(util.inspect(x))
        return x
      }
*/
    



    async save(element){
logger.info(` 5 - element : ${util.inspect(element)}`)   
        const saveModel = model(element);
        return await saveModel.save();
    }


  
    
}

module.exports = ContenedorPedidosMongoDB