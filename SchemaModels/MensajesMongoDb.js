const mongoose = require('mongoose');

const mensajesCollection = 'Mensajes';


const mensajesSchema = new mongoose.Schema({    
    email:  { type: String,required:true },
    date: {type: Date, default: Date.now},
    text: { type: String,required:true }
})



module.exports = mongoose.model(mensajesCollection, mensajesSchema);