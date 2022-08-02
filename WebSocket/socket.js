const logger = require('../logger');
const services = require('../services/messageServices')

const webSocket = (io) => {
  
        io.on('connection', async (socket) => {

            socket.emit('mensajes', await services.getMessages())
                 socket.on('chateando',(chat) => {
                    logger.info(chat)
                    services.saveMessage(chat)
                        .then(id => 
                            services.getMessages()
                                    .then(chats => {    
                                    io.sockets.emit('mensajes',chats) }))                
                                    
                        .catch( err =>
                        {
                            logger.error(err.stack)
                          
                            let msg = {
                                email:'Error al enviar el mensaje : ',
                                date:'Causa',
                                text: err.message
                            }
                            io.sockets.emit('mensajes',[msg] ) 
                        })
                            
            })
        });
};


module.exports = webSocket;