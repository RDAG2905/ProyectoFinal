const passport = require("passport")
const {transporter} = require('../helpers/nodeMailerHelper')
const logger = require('../logger.js')

const {username,nombre,direccion,telefono} = passport.session
let textoUserName = `<br>username : ${username}</br>`
let textoNombre = `<br>nombre : ${nombre}</br>`
let textoDireccion= `<br>direccion : ${direccion}</br>`
let textoTelefono= `<br>telefono : ${telefono}</br>`

let mensajeRegistro = textoUserName + textoNombre + textoDireccion + textoTelefono
 

const notificarRegistro = async ()=>{
  
    const mailRegisterOptions = {
        from: username,
        to: global.adminEmail,
        subject: 'Nuevo Registro',
        html: mensajeRegistro
     }


 try {
    let info = await transporter.sendMail(mailRegisterOptions)
    logger.info(info)
 } catch (error) {
    logger.error(err)
 }

}



const notificarPedido = async (listaDeProductos)=>{
  
    
    const mailPedidoOptions = {
        from: username,
        to: global.adminEmail,
        subject: 'Nuevo Pedido de ' + username,
        html: listaDeProductos
    }

 try {
    let info = await transporter.sendMail(mailPedidoOptions)
    logger.info(info)
 } catch (error) {
    logger.error(err)
 }

}
 



module.exports={
    notificarRegistro,notificarPedido
}