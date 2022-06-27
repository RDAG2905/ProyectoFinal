const session = require('express-session')
const getMiliseconds = require('../helpers/getMiliseconds')

const config = require('config')

const sesion = session({
                secret: process.env.SECRET || config.get('secret.value'),
                resave: false,
                saveUninitialized: false,
                cookie: {
                    expires : new Date(getMiliseconds() + 600000)
                }
              })
              
module.exports = sesion