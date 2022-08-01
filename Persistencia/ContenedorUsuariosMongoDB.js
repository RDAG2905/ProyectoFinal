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
       /* let user =  await productSaveModel.save();
        if (!user) throw new Error('Error al guardar el Usuario')
        return user*/
    }


    async update(usuario,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,usuario)     
       
    }


    async delete(id){
        await model.findByIdAndRemove(id)
        
    }

    async getUserByName(username) {
        try {
            logger.info(`username: ${username}`)
            return await model.findOne({ 'username': username })
        } catch (error) {
            logger.error(error)
            throw Error('Error al buscar el usuario por email')
        }
       
    }
    
}

module.exports = ContenedorUsuariosMongoDB