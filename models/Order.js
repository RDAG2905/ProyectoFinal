
const mongoose = require('mongoose');

const ordersCollection = 'orders';


const orderSchema = new mongoose.Schema({
    idCart:{type:String,required:true},
    idUser:{type:String,required:true},
    timestamp: {type: Date, default: Date.now}
})
/*const orderSchema = new mongoose.Schema({
    idCart:{type:mongoose.Types.ObjectId,required:true},
    idUser:{type:mongoose.Types.ObjectId,required:true},
    timestamp: {type: Date, default: Date.now}
})*/


module.exports = mongoose.model(ordersCollection, orderSchema);