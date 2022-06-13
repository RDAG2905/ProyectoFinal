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
global.root = __dirname;
const bCrypt = require('./helpers/bCryptHelper')
var util = require('util');
const parseArgs = require('minimist');
const dotenv = require('dotenv').config()
const randomRouter = require('./Rutas/RandomRouter')
const cluster = require('cluster')
const {cpus} = require('os')
let {PORT} = parseArgs(process.argv.slice(2)) ;
if (!PORT) { PORT = 8080}
const modoCluster = process.argv[4] == 'CLUSTER'
const compression = require('compression')
const logger = require('./logger.js')

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    (req, username, password, done) => {
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
            password: bCrypt.createHash(password)
          }
       
  
        User.create(newUser, (err, userWithId) => {
          if (err) {
            logger.error('Error in Saving user: ' + err);
            return done(err);
          }
          logger.info(user)
          logger.info('User Registration succesful');
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


app.use(cookieParser())
app.use(getSession)

app.use(passport.initialize())
app.use(passport.session())

///////////////////////////////////////////////////////////////////////
/*         Middleware para verificar si la sesión expiró           */

app.use(validateSession)

//////////////////////////////////////////////////////////////////////


app.post("/login",passport.authenticate('login', { failureRedirect: '/failLogin' }), controller.postLogin)
app.get('/failLogin', controller.getFailLogin);
app.post('/signup', passport.authenticate('signup', { successRedirect: '/signup', failureRedirect: '/failSignup' }), controller.postSignup);
app.get('/failSignup', controller.getFailSignup);
app.get('/signup', controller.postLogin);
app.get('/logout', controller.logout);
app.get('/registerView', controller.getRegisterView);

//// Compression //// 
app.get('/infoZip',compression(),controller.info)
 
/////////////////////

app.get('/info',controller.info)
app.use('/api/randoms',randomRouter)
app.use((req, res, next) => {
  const { url, method } = req
  const respuesta = `Ruta ${req.originalUrl} y metodo ${req.method} no implementados`
  logger.warn(respuesta)
    next()
});

Db.conectarDB(process.env.MONGODBCONNECTION, err => {  
    if (err) //return console.log('error en conexión de base de datos', err);
    logger.error(`error en conexión de base de datos : ${err}`)
    else
    logger.info('BASE DE DATOS CONECTADA');
})


app.listen(PORT, () => {    
    logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})

app.on('error', error => logger.error(`Error en servidor: ${error}`))

}