
const mongoose = require('mongoose');

const ordersCollection = 'orders';


const orderSchema = new mongoose.Schema({
    idUser:{type:String,required:true},
    timestamp: {type: Date, default: Date.now},
    products:  {type: Array},
    id:{type:String,required:true}
})



module.exports = mongoose.model(ordersCollection, orderSchema);