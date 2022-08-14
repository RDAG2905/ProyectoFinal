const mongoose = require('mongoose');
const model = require('../SchemaModels/User');

const logger = require('../logger');

const { MONGO_URI } = require('../config/config')
const mongoConnectionString = MONGO_URI 



class ContenedorUsuariosMongoDB{

    constructor(){
      
    }
   

    async getAll(){
        return await model.find({});
    }
     
/*
    async getById(idUsuario){
      return await model.findById(idUsuario)
    }
*/
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
       
       /*
        try {
            logger.info(`email: ${username}`)
            return await model.findOne({ 'email': username })
        } catch (error) {
            logger.error(error)
            throw Error('Error al buscar el usuario por email')
        }
       */
    }
    
}

module.exports = ContenedorUsuariosMongoDB