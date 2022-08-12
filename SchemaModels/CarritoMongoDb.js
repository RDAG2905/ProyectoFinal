const mongoose = require('mongoose');

const carritosCollection = 'Carritos';

const carritosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    productos:  {type: Array},
    usuarioId: { type: mongoose.Types.ObjectId},
    id: {type: String , required: true}
})


module.exports = mongoose.model(carritosCollection, carritosSchema);