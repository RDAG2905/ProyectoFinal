const mongoose = require('mongoose');
const model = require('../SchemaModels/CarritoMongoDb');    
const carrito = require('../BusinessModels/Cart')

const logger = require('../logger');

const util = require('util')


class ContenedorCarritoMongo{
       
    constructor(){
       
    }
   /*
    async getCart(idCart){
      return await model.findById(idCart)
    }*/

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



/*
    async removeProductFromCart(idCarrito,idProducto){
        let carrito = await this.getCart(idCarrito)
        carrito.productos = carrito.productos.filter(prod =>prod._id != idProducto)
        this.editCart(carrito,carrito._id)
    }
*/



     async editCart(carrito){
        let editCart = await this.getCart(carrito.id)
        logger.info(`editCart  : ${editCart}`)
        let editado = await model.findByIdAndUpdate(editCart._id,carrito) 
        logger.info(`editado  : ${editado}`)
        if(editado){
            return await this.getCart(carrito.id)
        }
           
    }
}

module.exports = ContenedorCarritoMongo
