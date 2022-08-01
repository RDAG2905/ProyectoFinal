const mongoose = require('mongoose');

const productosCollection = 'Productos';

const productosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    nombre: {type: String, required: true, max: 50},
    fotoUrl: {type: String, required: true, max: 100},
    precio: {type: Number, required: true}  
})

/* 
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