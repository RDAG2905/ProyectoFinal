const productosDaoMongo = require('../Dao/ProductosDaoMongoDB')
const carritosDaoMongo = require('../Dao/CarritosDaoMongoDB')
const usuariosDaoMongo = require('../Dao/UsuariosDaoMongoDB')
const pedidosDaoMongo = require('../Dao/PedidosDaoMongoDB')
const mensajesDaoMongo = require('../Dao/MensajesDaoMongoDB')
const productosDaoSQL = require('../Dao/ProductosDaoSQL')
const carritosDaoSQL = require('../Dao/CarritosDaoSQL')
const modelProductoMongo = require('../SchemaModels/ProductoMongoDB');  
const modelCarritoMongo = require('../SchemaModels/CarritoMongoDb');  
const config = require('config');


class DaoFactory{

    constructor(tipo){
        this.tipoPersistencia = tipo
    }
    
   
    getDao(){
        
        if (this.tipoPersistencia == 'productoMongo') {
            return productosDaoMongo.getInstance()
        }else
         if (this.tipoPersistencia == 'carritoMongo') {
            return carritosDaoMongo.getInstance()
        }else
        if (this.tipoPersistencia == 'pedidoMongo') {
           return pedidosDaoMongo.getInstance()
       }
       else
        if (this.tipoPersistencia == 'mensajeMongo') {
           return mensajesDaoMongo.getInstance()
       }
        else{
            return usuariosDaoMongo.getInstance()
        }
 
    }

    

}

module.exports = DaoFactory


/*
if (this.tipoPersistencia == 'productoSql') {            
    return new productosDaoSQL('productos')
}else
if (this.tipoPersistencia == 'carritoSql') {
    return new carritosDaoSQL('carritos')
}else */