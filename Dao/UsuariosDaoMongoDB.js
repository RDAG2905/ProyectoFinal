const ContenedorUsuarios = require('../Persistencia/ContenedorUsuariosMongoDB');
const mongoose = require('mongoose');

class UsuariosDaoMongoDB extends ContenedorUsuarios{
static instance
    
constructor(){
 super()
}

static getInstance(){
   
    if(!this.instance){
        this.instance = new UsuariosDaoMongoDB()
    }
    return this.instance
}

}

module.exports = UsuariosDaoMongoDB