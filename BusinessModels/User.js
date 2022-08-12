const bCrypt = require('../helpers/bCryptHelper')
const { v4 } = require("uuid");

class User {
    #id
    #name
    #lastname
    #email
    #password
    #phone
    #isAdmin
    #url

    constructor(user){
        if(!user){
           throw new Error('User data is required')
        }
        this.name = user.name,
        this.lastname = user.lastname,
        this.email = user.email,
        this.password = user.password,
        this.phone = user.phone,
        this.isAdmin = user.isAdmin,
        this.url = user.url
        
    }
    
   

    get name() { return this.#name }

    set name(nombre) {
        if (!nombre) throw new Error('The "name" is required')
        this.#name = nombre
    }

    get lastname() { return this.#lastname }

    set lastname(apellido) {
        if (!apellido) throw new Error('The "lastName" is required')
        this.#lastname = apellido
    }

    get email() { return this.#email }

    set email(unEmail) {
        if (!unEmail) throw new Error('"email" is required')
        this.#email = unEmail
    }
    
    
    get password() { return this.#password }

    set password(clave) {
        if (!clave) throw new Error('"password" is required')
        this.#password = bCrypt.createHash(clave)
    }


    get phone() { return this.#phone }

    set phone(nro) {
        if (!nro) throw new Error('"phone" is required')
        this.#phone = nro
    }

    

    isValidPassword(user,password){
        return bCrypt.isValidPassword(user,password)
    }
    
    createId(){
        this.id = v4()
    }



    }
    
    
    module.exports = User

    
