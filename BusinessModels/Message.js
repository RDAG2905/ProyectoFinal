

class Message{
    #email
    #text

    constructor(message){      
        this.email = message.email,
        this.text = message.text  
    }

    get email() { return this.#email }

    set email(unEmail) {
        if (!unEmail) throw new Error('email is required')
        this.#email = unEmail
    }

    get text() { return this.#text }

    set text(unTexto) {
        if (!unTexto) throw new Error('text is required')
        this.#text = unTexto
    }

}

module.exports = Message