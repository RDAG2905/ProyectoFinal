const { createTransport} = require('nodemailer')
const { getNodemailerArgs} = require('../config/config')


const transporter = createTransport(getNodemailerArgs);


module.exports = { transporter}

/*
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tyrel.ullrich@ethereal.email',
        pass: 'SHPDeCxnpKuT3hzJph'
    }
});*/