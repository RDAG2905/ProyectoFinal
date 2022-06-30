const ContenedorCarritos = require('../Persistencia/ContenedorCarritoMongoDB');
const mongoose = require('mongoose');

class CarritosDaoMongoDB extends ContenedorCarritos{
constructor(tipo){
 super(tipo)
}


}

module.exports = CarritosDaoMongoDB