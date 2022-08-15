
const parseArgs = require('minimist')

const MONGO_URI = process.env.MONGODB
const PORT =  process.env.PORT

//twilio credentials
//const accountSid = 'AC10f649afb3b45c73c7251640a90fec3d'
//const authToken = '133a978e5fc2b308adfcb7bf7a5eaee8'

const getNodemailerArgs = {
  host: 'smtp.ethereal.email',
    port: 587,
    auth: {
            user: 'tyrel.ullrich@ethereal.email',
            pass: 'SHPDeCxnpKuT3hzJph'
          }
}



module.exports =  {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    HOST: process.env.HOST ?? '127.0.0.1',
    PORT,
    PRIVATE_KEY : "myprivatekey",
    MONGO_URI ,
    getNodemailerArgs,
    adminEmail : "admin@admin.com",
    hostNodeMailer: 'smtp.ethereal.email',
    portNodeMailer: 587,
    userNodeMailer: 'tyrel.ullrich@ethereal.email',
    passNodeMailer: 'SHPDeCxnpKuT3hzJph'
  }