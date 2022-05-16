const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const validateSession = require('./middlewares/validateSession')
const getMiliseconds = require('./helpers/getMiliseconds')
const controller = require('./controllers/controller')
const getSession= require('./helpers/getSession')
/* ------------------------------------------------*/
/*           Persistencia por MongoDB              */
/* ------------------------------------------------*/
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
/* ------------------------------------------------*/



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
const handlebars = require('express-handlebars')    
const { header, redirect } = require('express/lib/response')
const config = require('config')
app.engine(
    "hbs",
    handlebars.engine({
        etname: ".hbs",
        defaultLayout : "layout.hbs",
        layoutsDir: __dirname + "/public/layouts",
        partialsDir: __dirname + "/public/plantillas"
    })
)

app.set("views","./public/plantillas")
app.set("view engine","hbs")


app.use(cookieParser())
//app.use(getSession)
app.use(session({  
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
}))

///////////////////////////////////////////////////////////////////////
/*         Middleware para verificar si la sesión expiró           */

app.use(validateSession)

//////////////////////////////////////////////////////////////////////

app.post('/login', controller.login)
app.get('/logout', controller.logout)
app.get('/info',controller.info)


const PORT = config.get('server.port')||process.env.port
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

