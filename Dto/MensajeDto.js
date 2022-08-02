class MessageDto{
    
    constructor(message){      
        this.email = message.email,
        this.date = message.date,
        this.text = message.text  
    }

}


module.exports = MessageDto