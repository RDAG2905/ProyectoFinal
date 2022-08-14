
const logger = require('../logger')

const util = require('util')
const Repository = require('../Repository/UsuariosRepository')
const User = require('../BusinessModels/User')
const Cart = require('../BusinessModels/Cart')
let repository = new Repository()
const { createCartByUser } = require('../services/cartServices')


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
  //  checkRegisterData(typeof(datosUsuario))    
    let msg
        if(datosUsuario.email){
            let userExists = await verifyName(datosUsuario.email)
            
            if(!userExists){
            let newUser = await saveUser(datosUsuario)
                    if(newUser){
                    await createShoppingCart(newUser)           
                    }
            msg = 'The User has been registered !!'                 
            }
            
        }
        else{
            msg = 'The data sent is wrong. Email not found'
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



const createShoppingCart = async(userData)=>{
    return await createCartByUser(userData.id) 
}



const checkLoginData=(email,password)=>{
     if(!email || !password){
        throw new Error('Email and password are required !!')
     }
}



const checkRegisterData = (userData)=>{
    logger.info(Object.getOwnPropertyNames(userData))
        if(userData=={}){
            throw new Error('User data is required')
        }
}



module.exports = {
    authenticate,
    registerUser
}