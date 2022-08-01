const ContenedorMensajes = require('../Persistencia/ContenedorMensajesMongoDb');
const mongoose = require('mongoose');


class MensajesDaoMongoDB extends ContenedorMensajes{
static instance

constructor(){
 super()
}


static getInstance(){
   
    if(!this.instance){
        this.instance = new MensajesDaoMongoDB()
    }
    return this.instance
}
}

module.exports = MensajesDaoMongoDB