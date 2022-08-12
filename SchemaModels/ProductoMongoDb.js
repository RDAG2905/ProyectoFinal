const mongoose = require('mongoose');

const productosCollection = 'Productos';
//-id -name -description -price -image (url de la foto guardada con multer, servida con express.static)

const productosSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    name: {type: String, required: true, max: 50},
    description: {type: String, required: true, max: 50},
    price: {type: Number, required: true},     
    image: {type: String, required: true, max: 100},
    id: {type: String , required: true}
})




module.exports = mongoose.model(productosCollection, productosSchema);