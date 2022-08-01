const ContenedorProductos = require('../Persistencia/ContenedorProductosMongoDB');
const mongoose = require('mongoose');

class ProductosDaoMongoDB extends ContenedorProductos{
    static instance 

constructor(){
 super()
}

static getInstance(){
   
    if(!this.instance){
        this.instance = new ProductosDaoMongoDB()
    }
    return this.instance
}

}




module.exports = ProductosDaoMongoDB