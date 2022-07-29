
const mongoose = require('mongoose');

const ordersCollection = 'orders';

const orderSchema = new mongoose.Schema({
    idCart:{type:mongoose.Types.ObjectId,required:true},
    idUser:{type:mongoose.Types.ObjectId,required:true},
    timestamp: {type: Date, default: Date.now}
})


module.exports = mongoose.model(ordersCollection, orderSchema);