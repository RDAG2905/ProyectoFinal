const daoUsuarios = require('../Dao/UsuariosDaoMongoDB')
const logger = require('../logger')
const bCrypt = require('../helpers/bCryptHelper')
const util = require('util')
const Repository = require('../Repository/UsuariosRepository')
const User = require('../BusinessModels/User')


const authenticate = async (username, password) => {
    let repository = new Repository()
    let usuario =  await repository.getByEmail(username)
    if(!bCrypt.isValidPassword(usuario,password)){
        throw new Error('Invalid Password')
    }
    return usuario
}





const registerUser = async (datosUsuario) => {      
        let msg
        let userExists = await verifyName(datosUsuario.email)
        logger.info(`userExists : ${userExists }`)
        if(!userExists){
           await saveUser(datosUsuario)
           msg = 'EL Usuario ha sido registrado !!'          
        }else{
           msg = 'EL Usuario ya existe !!' 
        }
        return msg
     
    
}





const saveUser = async (user) =>{  
       // user.password =  bCrypt.createHash(user.password)
        logger.info(util.inspect(user))
        let newUser = new User(user)
        newUser.createId()
        let repository = new Repository()
        let  createdUser = await repository.add(newUser)
        return createdUser
  
}




const verifyName = async (username) => {  
        let repository = new Repository()         
        let user = await repository.getByEmail(username)
        if (user) throw new Error('el nombre de usuario no está disponible')
        return user
   
}





module.exports = {
    authenticate,
    registerUser
}