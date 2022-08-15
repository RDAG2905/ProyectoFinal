const bCrypt = require('bcrypt');


async function isValidPassword(user, password) {
    return await bCrypt.compare(password, user.password);
  }
  
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    //return bCrypt.hash(password,bCrypt.genSaltSync(10), null);
  }


  module.exports = {
    isValidPassword,createHash
  }