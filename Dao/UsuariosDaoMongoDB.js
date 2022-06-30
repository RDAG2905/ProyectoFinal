const ContenedorUsuarios = require('../Persistencia/ContenedorUsuariosMongoDB');
const mongoose = require('mongoose');

class UsuariosDaoMongoDB extends ContenedorUsuarios{
constructor(tipo){
 super(tipo)
}

}

module.exports = UsuariosDaoMongoDB