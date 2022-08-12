
const parseArgs = require('minimist')

const MONGO_URI = process.env.MONGODB
const PORT =  process.env.PORT


module.exports =  {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    HOST: process.env.HOST ?? '127.0.0.1',
    PORT,
    PRIVATE_KEY : "myprivatekey",
    MONGO_URI 
  }