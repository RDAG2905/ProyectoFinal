const mongoose = require('mongoose');
const model = require('../SchemaModels/Order');
const logger = require('../logger');
const util = require('util')



class ContenedorPedidosMongoDB{

    constructor(){
         
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


    



    async save(element){
logger.info(` 5 - element : ${util.inspect(element)}`)   
        const saveModel = model(element);
        return await saveModel.save();
    }


  
    
}

module.exports = ContenedorPedidosMongoDB