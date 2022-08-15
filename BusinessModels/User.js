const bCrypt = require('../helpers/bCryptHelper')
const { v4 } = require("uuid");
const logger = require('../logger');
const util = require('util')

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
        
       /*
       let passw
        this.#password = async function(clave){
           return await bCrypt.createHash(clave)
        } 
        bCrypt.createHash(clave)
               .then(res => {
                logger.info('hash async' + util.inspect(res))
                passw = res
                this.#password = res
               })
               .catch(err => logger.error(err.stack))
               */
         //this.#password = passw        
       
    }


    get phone() { return this.#phone }

    set phone(nro) {
        if (!nro) throw new Error('"phone" is required')
        this.#phone = nro
    }

    

    async isValidPassword(user,password){
        return await bCrypt.isValidPassword(user,password)
    }
    
    createId(){
        this.id = v4()
    }



    }
    
    
    module.exports = User

    
