
const mongoose = require('mongoose');

const ordersCollection = 'orders';


const orderSchema = new mongoose.Schema({
    idCart:{type:String,required:true},
    idUser:{type:String,required:true},
    timestamp: {type: Date, default: Date.now},
    products:  {type: Array}
})



module.exports = mongoose.model(ordersCollection, orderSchema);