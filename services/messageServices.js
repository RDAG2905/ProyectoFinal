
const Repository = require('../Repository/MensajesRepository')
const Message = require('../BusinessModels/Message')


const saveMessage = async(data)=>{
      let message = new Message(data)
      let repository = new Repository()
      return await repository.add(message)
}



const getMessages = async() =>{
    let repository = new Repository()
      return await repository.getAllMessages()
}


module.exports = { saveMessage , getMessages }