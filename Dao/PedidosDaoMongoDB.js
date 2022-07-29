const ContenedorPedidos = require('../Persistencia/ContenedorPedidosMOngoDB');
const mongoose = require('mongoose');


class PedidosDaoMongoDB extends ContenedorPedidos{
constructor(tipo){
 super(tipo)
}

}

module.exports = PedidosDaoMongoDB