
const mongoose = require('mongoose');

const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    username: {type: String, max: 100, required: true},
    password: {type: String, required: true},  
    nombre : {type: String,required: true},
    direccion : {type: String,required: true},
    edad:{type: Number},
    telefono:{type: String,required: true},
    //tipoUsuario: {type: String,required: true},
    isAdmin:{type: Boolean,default:false},
    fotoUrl:  {type: String}
})


module.exports = mongoose.model(usuariosCollection, usuariosSchema);