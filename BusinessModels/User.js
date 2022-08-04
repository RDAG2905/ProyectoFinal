const bCrypt = require('../helpers/bCryptHelper')
const { v4 } = require("uuid");

class User {
    #id
    #name
    #lastName
    #email
    #password
    #phone
    #isAdmin
    #url

    constructor(user){
        this.name = user.name,
        this.lastName = user.lastName,
        this.email = user.email,
        this.password = user.password,
        this.phone = user.phone,
        this.isAdmin = user.isAdmin,
        this.url = user.url
        //this.id = user.id ? user.id : this.createId()
    }
    
   

    get name() { return this.#name }

    set name(nombre) {
        if (!nombre) throw new Error('The "name" is required')
        this.#name = nombre
    }

    get lastName() { return this.#lastName }

    set lastName(apellido) {
        if (!apellido) throw new Error('The "lastName" is required')
        this.#lastName = apellido
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

    createId (){
        this.id = v4()
    }
     

    


    }
    
    
    module.exports = User

    

     /*
    constructor(user){
        this.username = user.username,
        this.nombre = user.nombre,
        this.direccion = user.direccion,
        this.edad = user.edad,
        this.telefono = user.telefono,
        this.isAdmin = user.isAdmin,
        this.fotoUrl = user.fotoUrl
    }
   */ 

    
     

     /*
     get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('The"id" is required')
        this.#id = id
    }
     */