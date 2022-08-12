const mongoose = require('mongoose');
const model = require('../SchemaModels/User');
//const config = require('config');
//const mongoConnectionString = config.get('mongoDB.connection')  
const logger = require('../logger');

const { MONGO_URI } = require('../config/config')
const mongoConnectionString = MONGO_URI 
//const mongoConnectionString = process.env.MONGODB

logger.info(`MONGO_URI: ${MONGO_URI}`)
logger.info(`MONGO_URI: ${typeof(MONGO_URI)}`)

class ContenedorUsuariosMongoDB{

    constructor(){
        
      //  const URL = mongoConnectionString
      //  mongoose.connect(URL, {});   
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


    async getUserByUserName(username) {
        try {
            logger.info(`email: ${username}`)
            return await model.findOne({ 'email': username })
        } catch (error) {
            logger.error(error)
            throw Error('Error al buscar el usuario por email')
        }
       
    }
    
}

module.exports = ContenedorUsuariosMongoDB