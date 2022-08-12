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
      return await model.findById(id)
    }

    async getOrdersByUserId(id){
        //let idUser = new mongoose.Types.ObjectId(id)
        //let x = await model.find({'idUser': id})
        let x = await model.find({})
        logger.info(util.inspect(x))
        return x
      }



    async save(element){
        const saveModel = model(element);
        return await saveModel.save();
    }


  
    
}

module.exports = ContenedorPedidosMongoDB