const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const validateSession = require('./middlewares/validateSession')
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

const fecha = new Date()
const milisegundos = fecha.getTime()
app.use(cookieParser())
app.use(session({
   
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://ruben:WdaKBLhsGmS9kVcQ@cluster0.ca9xj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false ,
    cookie: {
        expires : new Date(milisegundos + 60000)
       // maxAge: 60000
    } 
}))

/** 
app.use((req,res,next)=>{
    let resp =''
    let horario = new Date()
    let horarioActual = horario.getTime() 
    let fecha = new Date(horarioActual)
    if (req.session.cookie.expires <= fecha) {
        res.redirect('/')
    }else{
        const fecha = new Date()
        const milisegundos = fecha.getTime()
        req.session.cookie.expires =  new Date(milisegundos + 60000)
    }
    next()
}
)
*/

////////////////////////////////////////////////////////////
/*         Aquí verificamos si la sesión expiró           */

app.use(validateSession)

////////////////////////////////////////////////////////////

let contador = 0

app.post('/login', (req, res) => {
    let bienvenida
    if (req.session.nombre) {    
      req.session.contador = req.session.contador + 1
      bienvenida = `Bienvenido ${req.session.nombre}, visitaste la pagina ${req.session.contador} veces`
     
    } else {
      req.session.nombre = req.body.nombre || 'Desconocido'
      req.session.contador = 1
      bienvenida = `Bienvenido ${req.session.nombre}`   
    }
    res.render("welcome",{bienvenida})
  })


app.get('/logout', (req,res) => {
    let nombre = req.session.nombre || 'Desconocido'
    req.session.destroy( err => {      
        if(!err) res.render("Despedida",{nombre})
        else res.send({status: 'Logout ERROR', body: err})
    })
})



app.get('/info', (req,res) => {
    console.log('------------ req.session -------------')
    console.log(req.session)
    console.log('--------------------------------------')

    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)
    console.log('--------------------------------------')

    console.log('----------- req.cookies ------------')
    console.log(req.cookies)
    console.log('--------------------------------------')

    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
    console.log('--------------------------------------')

    res.send('Send info ok!')
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

