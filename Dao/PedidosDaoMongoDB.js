const ContenedorPedidos = require('../Persistencia/ContenedorPedidosMOngoDB');
const mongoose = require('mongoose');


class PedidosDaoMongoDB extends ContenedorPedidos{
static instance

constructor(){
 super()
}


static getInstance(){
   
    if(!this.instance){
        this.instance = new PedidosDaoMongoDB()
    }
    return this.instance
}
}

module.exports = PedidosDaoMongoDB