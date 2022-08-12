const mongoose = require('mongoose');
const model = require('../SchemaModels/CarritoMongoDb');    
const carrito = require('../BusinessModels/Cart')
//const config = require('config');
const logger = require('../logger');
//const mongoConnectionString = config.get('mongoDB.connection')  
const util = require('util')
const { MONGO_URI } = require('../config/config')
const mongoConnectionString = MONGO_URI 

class ContenedorCarritoMongo{
       
    constructor(){
       
        const URL = mongoConnectionString
        let rta = mongoose.connect(URL, {});   
       
    }
   
  

    async getCart(idCart){
      return await model.findById(idCart)
    }


   
    
    async save(idUsuario){
        let unCarrito = new carrito(undefined)
        const modelCarrito = model(unCarrito);
        let changuito = await modelCarrito.save();
        return changuito._id
        
    }




    async delete(id){
        await model.findByIdAndRemove(id)      
    }




    async removeProductFromCart(idCarrito,idProducto){
        let carrito = await this.getCart(idCarrito)
        carrito.productos = carrito.productos.filter(prod =>prod._id != idProducto)
        this.editCart(carrito,carrito._id)
    }




     async editCart(carrito,idBuscado){
       let editado = await model.findByIdAndUpdate(idBuscado,carrito) 
       if(editado){
        return await this.getCart(idBuscado)
       }
           
    }
}

module.exports = ContenedorCarritoMongo
