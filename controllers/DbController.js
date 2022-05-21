const mongoose = require('mongoose');
const config = require('config');
const { mongoDB } = require('../config/default');

let baseConectada = false;
let url = config.get('mongoDB.connection')

function conectarDB(url, cb) {
  mongoose.connect(url, { }, err => {
    if (!err) {
      baseConectada = true;
    }
    if (cb != null) {
      cb(err);
    }
  });
}

module.exports = {
  conectarDB
}