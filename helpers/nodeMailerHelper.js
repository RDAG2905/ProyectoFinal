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
/*
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tyrel.ullrich@ethereal.email',
        pass: 'SHPDeCxnpKuT3hzJph'
    }
});
*/



module.exports = { transporter}