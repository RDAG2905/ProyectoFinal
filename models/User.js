
const mongoose = require('mongoose');

const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    username: {type: String, max: 100, required: true},
    password: {type: String, required: true}   
})


module.exports = mongoose.model(usuariosCollection, usuariosSchema);