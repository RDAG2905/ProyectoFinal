const passport = require("passport")
const {transporter} = require('../helpers/nodeMailerHelper')
const logger = require('../logger.js')





const getMessage =(body,user)=>{
 //  const { username,nombre,direccion,telefono } = user //passport.session
   const { email,name,lastName,phone } = user //passport.session
   logger.info(`user: ${user}`)
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
        to: global.adminEmail,
        subject: 'Nuevo Registro',
        html: mensaje
     }

 try {
    let info = await transporter.sendMail(mailRegisterOptions)
    logger.info(info)
 } catch (error) {
    logger.error(err)
 }

}



const armarPedidoHtml = (chango)=>{
   let mensajePedido = ""
   let productos = chango.productos
   productos.forEach(element => {
     let producto = `<br>producto : ${element.name}</br>`
     let precio = `<br>precio : ${element.price}</br>`
     let cantidad = `<br>cantidad : ${element.quantity}</br>`
     let salto = '<br>-----------------</br>'
     mensajePedido += (producto + precio + cantidad + salto)
   });
mensajePedido += `<br>total : ${chango.totalGeneral}</br>`
mensajePedido += '<br>-----------------</br>'
return mensajePedido
}



const notificarPedido = async (chango,user)=>{
  
   let mensajePedido = armarPedidoHtml(chango) 
   let { email } = user //passport.session

    const mailPedidoOptions = {
        from: email,
        to: global.adminEmail,
        subject: 'Nuevo Pedido de ' + email,
        html: mensajePedido
      }

 try {
    let info = await transporter.sendMail(mailPedidoOptions)
    logger.info(info)
 } catch (error) {
    logger.error(error)
 }

}
 



module.exports={
    notificarRegistro,notificarPedido
}