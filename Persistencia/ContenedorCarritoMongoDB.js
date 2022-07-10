const mongoose = require('mongoose');
const model = require('../models/CarritoMongoDb');    
const carrito = require('../Business/Carrito')
const config = require('config');
const logger = require('../logger');
const mongoConnectionString = config.get('mongoDB.connection')  


class ContenedorCarritoMongo{
       
    constructor(){
       
        const URL = mongoConnectionString
        let rta = mongoose.connect(URL, {});   
       
    }
   
     
    async getCarritoConProductos(idCarrito){
        logger.info(`carrito con Productos ${idCarrito}`)
        
        /*
        let idCar = idx.idCarrito
        logger.info(typeof idCar)
        logger.info(`idx: ${idCar}`)*/
        logger.info(typeof idCarrito)
        let carro = JSON.parse(idCarrito)
        let array = Object.values(carro)
        logger.info(`carro : ${array[0]}`)
        let idx = array[0]
      return await model.findById(idx)
    }



    async saveCarrito(idUsuario){
        let unCarrito = new carrito()
        const modelCarrito = model(unCarrito);
        let changuito = await modelCarrito.save();
        return changuito._id
        
    }




    async delete(id){
        await model.findByIdAndRemove(id)      
    }





    async AgregarProductoAlCarrito(idCarro,producto){
        logger.info(`idCarro: ${idCarro}`)
        
        //let idChango =  mongoose.Types.ObjectId.prototype.toHexS
        //let idChango = mongoose.Types.ObjectId(idCarro.idCarrito)
        //let idChango =  mongoose.Types.ObjectId.prototype.toHexString(idCarro.idCarrito)
        //logger.info(`idChango: ${idChango}`)
        let carrito = await this.getCarritoConProductos(idCarro)
        logger.info(`carritoDB : ${carrito}`)
        carrito.productos.push(producto)
        let carritoEditado = await this.editarCarrito(carrito,carrito._id) 
        logger.info(`carritoEditado : ${carritoEditado}`)
        return carritoEditado
       // this.getCarritoConProductos(carrito._id)      
    } 




    async eliminarProductoDelCarrito(idCarrito,idProducto){
        let carrito = await this.getCarritoConProductos(idCarrito)
        carrito.productos = carrito.productos.filter(prod =>prod._id != idProducto)
        this.editarCarrito(carrito,carrito._id)
    }




     async editarCarrito(carrito,idBuscado){
       // let id = new mongoose.Types.ObjectId(idBuscado) 
        return await model.findByIdAndUpdate(idBuscado,carrito)           
    }
}

module.exports = ContenedorCarritoMongo
