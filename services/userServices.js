
const logger = require('../logger')

const util = require('util')
const Repository = require('../Repository/UsuariosRepository')
const User = require('../BusinessModels/User')
let repository = new Repository()


const authenticate = async ({email, password}) => {
    checkLoginData(email,password)
    let usuario =  await repository.getByEmail(email)
    let user = new User(usuario)
    
    if(!user.isValidPassword(user,password)){    
        throw new Error('Invalid Password')
    }
    return usuario
}





const registerUser = async (datosUsuario) => {      
    checkRegisterData(datosUsuario)    
    let msg
        let userExists = await verifyName(datosUsuario.email)
        
        if(!userExists){
           await saveUser(datosUsuario)
           msg = 'The User has been registered !!'                 
        }
        return msg
     
    
}





const saveUser = async (user) =>{            
        let newUser = new User(user)
        newUser.createId()      
        return await repository.add(newUser)
         
}




const verifyName = async (username) => {     
        let user = await repository.getByEmail(username)
        if (user) throw new Error('the username is not available')
        return user
   
}


const checkLoginData=(email,password)=>{
     if(!email || !password){
        throw new Error('Email and password are required !!')
     }
}



const checkRegisterData = (userData)=>{
        if(!userData){
            throw new Error('User data is required')
        }
}



module.exports = {
    authenticate,
    registerUser
}