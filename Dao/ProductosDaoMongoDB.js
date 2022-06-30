const ContenedorProductos = require('../Persistencia/ContenedorProductosMongoDB');
const mongoose = require('mongoose');

class ProductosDaoMongoDB extends ContenedorProductos{
constructor(tipo){
 super(tipo)
}

}

module.exports = ProductosDaoMongoDB