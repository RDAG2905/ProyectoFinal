const mongoose = require('mongoose');

const productosCollection = 'Productos';
//-id -name -description -price -image (url de la foto guardada con multer, servida con express.static)

const productosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    name: {type: String, required: true, max: 50},
    description: {type: String, required: true, max: 50},
    price: {type: Number, required: true},     
    image: {type: String, required: true, max: 100}
})

/*
 this.id = id,
      this.name = name,
      this.description = description,
      this.price = price,
      this.image= image
*/

/* 

const productosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    nombre: {type: String, required: true, max: 50},
    fotoUrl: {type: String, required: true, max: 100},
    precio: {type: Number, required: true}  
})

const productosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    nombre: {type: String, required: true, max: 50},
    descripción: {type: String, max: 100},
    código: {type: Number},
    fotoUrl: {type: String, required: true, max: 100},
    precio: {type: Number, required: true},
    stock: {type: Number}
})
*/

module.exports = mongoose.model(productosCollection, productosSchema);