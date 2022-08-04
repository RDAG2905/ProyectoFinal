const mongoose = require('mongoose');
const model = require('../SchemaModels/User');
const config = require('config');
const logger = require('../logger');
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


    async getUserByUserName(username) {
        try {
            logger.info(`username: ${username}`)
            return await model.findOne({ 'email': username })
        } catch (error) {
            logger.error(error)
            throw Error('Error al buscar el usuario por email')
        }
       
    }
    
}

module.exports = ContenedorUsuariosMongoDB