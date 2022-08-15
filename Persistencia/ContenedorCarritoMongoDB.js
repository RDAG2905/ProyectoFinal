const mongoose = require('mongoose');
const model = require('../SchemaModels/CarritoMongoDb');    
const carrito = require('../BusinessModels/Cart')

const logger = require('../logger');

const util = require('util')


class ContenedorCarritoMongo{
       
    constructor(){
       
    }
   

    async getCart(idCart){
        return await model.findOne({'id': idCart})
      }

    
    async save(unCarrito){
        const modelCarrito = model(unCarrito);
        let changuito = await modelCarrito.save();
        return changuito
        
    }




    async delete(id){
        await model.findByIdAndRemove(id)      
    }





     async editCart(carrito){
        let editCart = await this.getCart(carrito.id)
        let editado = await model.findByIdAndUpdate(editCart._id,carrito) 
        if(editado){
            return await this.getCart(carrito.id)
        }
           
    }
}

module.exports = ContenedorCarritoMongo
