const twilio = require('twilio')
const logger = require('../logger')



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