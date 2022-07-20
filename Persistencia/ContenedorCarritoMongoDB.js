const mongoose = require('mongoose');
const model = require('../models/CarritoMongoDb');    
const carrito = require('../Business/Carrito')
const config = require('config');
const logger = require('../logger');
const mongoConnectionString = config.get('mongoDB.connection')  
const util = require('util')

class ContenedorCarritoMongo{
       
    constructor(){
       
        const URL = mongoConnectionString
        let rta = mongoose.connect(URL, {});   
       
    }
   
     
    async getCarritoConProductos(idCarrito){
        logger.info(`idCarrito :${idCarrito}, typeof : ${typeof(idCarrito)}`)
        let carro = JSON.parse(idCarrito)
        let array = Object.values(carro)
        let idx = array[0]
      return await model.findById(idx)
    }



    async saveCarrito(idUsuario){
        let unCarrito = new carrito(undefined)
        const modelCarrito = model(unCarrito);
        let changuito = await modelCarrito.save();
        return changuito._id
        
    }




    async delete(id){
        await model.findByIdAndRemove(id)      
    }





    async AgregarProductoAlCarrito(idCarro,producto){
       
        let carrito = await this.getCarritoConProductos(idCarro)
        //logger.info(`carritoDB : ${carrito}`)
        carrito.productos.push(producto)
      
        let carritoEditado = await this.editarCarrito(carrito,carrito._id)
         //.then(carritoEditado =>{
         //   return carrito
         //} 
         //)
         logger.info(`carrito editado agregar: ${util.inspect(carritoEditado)}`)
        return carritoEditado;
       
       // this.getCarritoConProductos(carrito._id)      
    } 




    async eliminarProductoDelCarrito(idCarrito,idProducto){
        let carrito = await this.getCarritoConProductos(idCarrito)
        carrito.productos = carrito.productos.filter(prod =>prod._id != idProducto)
        this.editarCarrito(carrito,carrito._id)
    }




     async editarCarrito(carrito,idBuscado){
       // logger.info(`carrito a editar: ${carrito}`)
       // logger.info(`idBuscado a editar: ${idBuscado}`)
       // let id = new mongoose.Types.ObjectId(idBuscado) 
       return await model.findByIdAndUpdate(idBuscado,carrito) 
           
    }
}

module.exports = ContenedorCarritoMongo
