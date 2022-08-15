const { createTransport} = require('nodemailer')
const { hostNodeMailer,portNodeMailer,userNodeMailer,passNodeMailer} = require('../config/config')


const transporter = createTransport({
    host: hostNodeMailer,
    port: portNodeMailer,
    auth: {
        user: userNodeMailer,
        pass: passNodeMailer
    }
});




module.exports = { transporter}