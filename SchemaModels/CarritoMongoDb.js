const mongoose = require('mongoose');

const carritosCollection = 'Carritos';

const carritosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    productos:  {type: Array},
    id: {type: String , required: true}
})


module.exports = mongoose.model(carritosCollection, carritosSchema);