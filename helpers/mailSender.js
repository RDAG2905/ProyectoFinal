const passport = require("passport")
const {transporter} = require('../helpers/nodeMailerHelper')
const logger = require('../logger.js')
const { adminEmail} = require('../config/config')
const { utils } = require("mocha")

const util = require('util')


const getMessage =(body,user)=>{
 //  const { username,nombre,direccion,telefono } = user //passport.session
   const { email,name,lastName,phone } = user //passport.session
  // logger.info(`user: ${user}`)
   //logger.info(`passport.session getMessage : ${passport.session}`)
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
     // logger.info('element: ' + util.inspect(element))
     // logger.info('product: ' + util.inspect(element.product))
     // logger.info(': ' + ( Object.entries(element.product)[3]))
     let name = Object.entries(element.product)[1][1]
     let price = Object.entries(element.product)[3][1]
     //logger.info(' name: ' + name)
     //logger.info(' price: ' + price)
     //let producto = `<br>producto : ${name}</br>`
     //let precio = `<br>precio : ${price}</br>`
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