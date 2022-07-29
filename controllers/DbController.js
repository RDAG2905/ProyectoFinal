const mongoose = require('mongoose');


let baseConectada = false;


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