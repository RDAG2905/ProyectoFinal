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



     async editCart(carrito,idBuscado){
       let editado = await model.findByIdAndUpdate(idBuscado,carrito) 
       if(editado){
        return await this.getCart(idBuscado)
       }
           
    }
}

module.exports = ContenedorCarritoMongo
