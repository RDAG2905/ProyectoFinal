const { createTransport} = require('nodemailer')




const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tyrel.ullrich@ethereal.email',
        pass: 'SHPDeCxnpKuT3hzJph'
    }
});


module.exports = { transporter}