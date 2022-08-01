const logger = require('../logger');
const services = require('../services/messageServices')

const socket = (io) => {
    io.sockets.on('connection', (socket) => {
        socket.on('chateando',(chat) => {
           
            services.saveMessage(chat)
                .then(id => 
                    services.getMessages()
                            .then(chats => {                    
                             io.sockets.emit('mensajes',JSON.parse(chats) ) }))
                       
                .catch( err =>
                {
                    logger.error(err.stack)
                    let anError = 'Error al enviar el mensaje' 
                    io.sockets.emit('mensajes',JSON.parse(anError) ) 
                })
                      
        })
    });
};


module.exports = socket;