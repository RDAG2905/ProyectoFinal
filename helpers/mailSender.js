const passport = require("passport")
const {transporter} = require('../helpers/nodeMailerHelper')
const logger = require('../logger.js')
const { adminEmail} = require('../config/config')

const util = require('util')


const getMessage =(body,user)=>{
 
   const { email,name,lastName,phone } = user //passport.session
  
   let textoUserName = `<br>username : ${email}</br>`
   let textoNombre = `<br>nombre : ${name}</br>`
   let textoDireccion= `<br>direccion : ${lastName}</br>`
   let textoTelefono= `<br>telefono : ${phone}</br>`
   
   let mensajeRegistro = textoUserName + textoNombre + textoDireccion + textoTelefono
   return mensajeRegistro
}



const notificarRegistro = async (body)=>{
  
   let mensaje = getMessage(body)
    const mailRegisterOptions = {
        from: body.email,
        to: adminEmail,
        subject: 'Nuevo Registro',
        html: mensaje
     }

 try {
    let info = await transporter.sendMail(mailRegisterOptions)
    
 } catch (err) {
    logger.error(err.stack)
 }

}



const armarPedidoHtml = (chango)=>{
   let mensajePedido = ""
   let productos = chango.productos
   let total = chango.totalGeneral 
   
   productos.forEach(element => {
    
     let name = Object.entries(element.product)[1][1]
     let price = Object.entries(element.product)[3][1]
    
     let producto = '<br>producto :' + name + '</br>'
     let precio = '<br>precio :' +  price + '</br>'
     let cantidad = `<br>cantidad : ${element.quantity}</br>`
     let salto = '<br>-----------------</br>'
     mensajePedido += (producto + precio + cantidad + salto)
   });
mensajePedido += `<br>total : ${total}</br>`
mensajePedido += '<br>-----------------</br>'
return mensajePedido
}



const notificarPedido = async (chango,user)=>{
  
   let mensajePedido = armarPedidoHtml(chango) 
   let { email } = user 

    const mailPedidoOptions = {
        from: email,
        to: adminEmail,
        subject: 'Nuevo Pedido de ' + email,
        html: mensajePedido
      }

      const pedidoRecepcionadoOptions = {
         from: adminEmail,
         to: email,
         subject: 'Pedido confirmado',
         html: mensajePedido
       }

 try {
    await transporter.sendMail(mailPedidoOptions)
    await transporter.sendMail(pedidoRecepcionadoOptions)
   
 } catch (error) {
    logger.error(error)
 }

}
 



module.exports={
    notificarRegistro,notificarPedido
}