const ContenedorCarritos = require('../Persistencia/ContenedorCarritoMongoDB');
const mongoose = require('mongoose');

class CarritosDaoMongoDB extends ContenedorCarritos{
    static instance 

    constructor(){
        super()
        }


    static getInstance(){
    
        if(!this.instance){
            this.instance = new CarritosDaoMongoDB()
        }
        return this.instance
    }

}

module.exports = CarritosDaoMongoDB