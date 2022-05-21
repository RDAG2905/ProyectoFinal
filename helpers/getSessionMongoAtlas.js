
const session = require('express-session')
const config = require('config')
const getMiliseconds = require('./getMiliseconds')
/* ------------------------------------------------*/
/*           Persistencia por MongoDB              */
/* ------------------------------------------------*/
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
/* ------------------------------------------------*/


const sesion = session({  
    store: MongoStore.create({ 
        mongoUrl: config.get('mongoAtlas.connection'),
        mongoOptions: advancedOptions
    }),
    secret: config.get('secret.value'),
    resave: false,
    saveUninitialized: false ,
    cookie: {
        expires : new Date(getMiliseconds() + 60000)
    }
})


module.exports = sesion
