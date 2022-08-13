const twilio = require('twilio')
const logger = require('../logger')


//const accountSid = 'AC10f649afb3b45c73c7251640a90fec3d'
//const authToken = '133a978e5fc2b308adfcb7bf7a5eaee8'

const enviarSms = async (msg)=>{

const client = twilio(accountSid, authToken)
try {
 const message = await client.messages.create({
 body: msg,
 from: global.celAdmin,
 to: global.celAdmin
 })
 logger.info(message)
} catch (error) {
 logger.error(error)
}

}


const enviarWhatsapp = async () =>{
    const client = twilio(accountSid, authToken)

const options = {
    body: 'Hola soy un WSP desde Node.js!',
    from: ('whatsapp:' + global.celAdmin),
    to: ('whatsapp:' + global.celAdmin)
}

try {
    const message = await client.messages.create(options)
    console.log(message)
} catch (error) {
    console.log(error)
}
}


module.exports = { enviarSms , enviarWhatsapp }