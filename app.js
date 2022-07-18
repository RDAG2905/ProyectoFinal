const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const validateSession = require('./middlewares/validateSession')
const getMiliseconds = require('./helpers/getMiliseconds')
const controller = require('./controllers/controller')
const getSession= require('./helpers/getSession')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User');
const Db = require('./controllers/DbController')
const config = require('config');

const bCrypt = require('./helpers/bCryptHelper')
let util = require('util');
const parseArgs = require('minimist');
const dotenv = require('dotenv').config()
const randomRouter = require('./Rutas/RandomRouter')
const routerProductos = require('./Rutas/RouterProductos')
const routerCarrito = require('./Rutas/RouterCarrito')
const routerPedidos = require('./Rutas/RouterPedidos')
const cluster = require('cluster')
const {cpus} = require('os')

let PORT = process.env.PORT
const modoCluster = process.argv[4] == 'CLUSTER'
const compression = require('compression')
const logger = require('./logger.js')
const uploadFilesRouter = require('./Rutas/uploadFileRouter.js')
const path = require('path')


global.root = __dirname;
global.adminEmail = "tyrel.ullrich@ethereal.email"
global.celAdmin = ""

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    (req, username, password, done) => {
      
     // logger.info(Object.values(req.body))
      User.findOne({ 'username': username }, function (err, user) {
  
        if (err) {
          logger.error('Error in SignUp: ' + err);
          return done(err);
        }
  
        if (user) {
          logger.info('User already exists');
          return done(null, false)
        }
        
        const newUser = {
            username: username,
            password: bCrypt.createHash(password),
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            edad : req.body.edad,
            telefono: req.body.telefono,
            tipoUsuario : req.body.tipoUsuario,
            fotoUrl : req.body.fotoUrl
          }
       
  
        User.create(newUser, (err, userWithId) => {
          if (err) {
            logger.error('Error in Saving user: ' + err);
            return done(err);
          }
          
          logger.info('User Registration succesful');
          passport.session = newUser
        //  logger.info(`usuarioSession : ${passport.session}`)
          return done(null, userWithId);
        });
      });
    })
  )
  

  passport.use('login', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err)
          return done(err);
  
        if (!user) {
          logger.info('User Not Found with email ' + username);
          return done(null, false);
        }
  
        if (!bCrypt.isValidPassword(user, password)) {
          logger.info('Invalid Password');
          return done(null, false);
        }
        logger.info(`__dirname: ${__dirname}`)
        passport.session = user
       
       // logger.info(passport.session)
       
        return done(null, user);
      });
    })
  );
  


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });
  
 
  /////////////////////////////////////
  /// Definiendo el número de procesos
  ////////////////////////////////////

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length

    logger.info(`Número de procesadores: ${numCPUs}`)
    logger.info(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
         logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    })


} else {

const app = express()
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb',extended:true}));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "/files")));
//app.use(express.static('files'));


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


app.use(cookieParser())
app.use(getSession)

app.use(passport.initialize())
app.use(passport.session())

///////////////////////////////////////////////////////////////////////
/*         Middleware para verificar si la sesión expiró           */

app.use(validateSession)

//////////////////////////////////////////////////////////////////////


app.post("/login",passport.authenticate('login', { failureRedirect: '/failLogin' }),controller.postLogin)
app.get('/failLogin', controller.getFailLogin);
app.post('/signup', passport.authenticate('signup', { successRedirect: '/signup', failureRedirect: '/failSignup' }));
//app.post('/signup', controller.postSignup);
//app.post('/upload',upload.single('myFile'));

app.get('/failSignup', controller.getFailSignup);
app.get('/signup', controller.postSignup);
app.get('/logout', controller.logout);
app.get('/registerView', controller.getRegisterView);
app.get('/getUserData', controller.getUserData);

//// Compression //// 
app.get('/infoZip',compression(),controller.info)
 
/////////////////////

app.get('/info',controller.info)
app.use('/api/randoms',randomRouter)
app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarrito)
app.use('/api/pedidos',routerPedidos)
app.use('/files', uploadFilesRouter)

///////////// Manejo de rutas no implementadas ////////////////

app.use((req, res, next) => {
  const { url, method } = req
  const respuesta = `Ruta ${req.originalUrl} y metodo ${req.method} no implementados`
  res.status(404).send(respuesta)
});


///////////// Manejo de errores global ////////////////

app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Ocurrió un Error. Consulte con el administrador del sistema');
 });
 



//Db.conectarDB(process.env.MONGOATLASCONNECTION, err => {  
Db.conectarDB(process.env.MONGODB, err => { 
    if (err) 
    logger.error(`error en conexión de base de datos : ${err}`)
    else
    logger.info('BASE DE DATOS CONECTADA');
})


app.listen(PORT, () => {    
    logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})

app.on('error', error => logger.error(`Error en servidor: ${error}`))

}