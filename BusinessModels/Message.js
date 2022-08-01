

class Message{
    #email
    #text

    constructor(message){      
        this.email = message.email,
        this.text = message.text  
    }

    get email() { return this.#email }

    set email(unEmail) {
        if (!unEmail) throw new Error('El email es un campo requerido')
        this.#email = unEmail
    }

    get text() { return this.#text }

    set text(unTexto) {
        if (!unTexto) throw new Error('El texto del mensaje es requerido')
        this.#text = unTexto
    }

}

module.exports = Message