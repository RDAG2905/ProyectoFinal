
const mongoose = require('mongoose');

const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    email: {type: String, max: 100, required: true},
    password: {type: String, required: true},  
    name : {type: String, required: true},
    lastName : {type: String, required: true},
    phone:{type: String, required: true},
    isAdmin:{type: Boolean, default:false},
    url: {type: String},
    id: {type: String , required: true}
})


module.exports = mongoose.model(usuariosCollection, usuariosSchema);