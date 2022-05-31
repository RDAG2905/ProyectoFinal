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

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    (req, username, password, done) => {
      User.findOne({ 'username': username }, function (err, user) {
  
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
  
        if (user) {
          console.log('User already exists');
          return done(null, false)
        }
        const newUser = {
            username: username,
            password: bCrypt.createHash(password)
          }
       
  
        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('Error in Saving user: ' + err);
            return done(err);
          }
          console.log(user)
          console.log('User Registration succesful');
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
          console.log('User Not Found with email ' + username);
          return done(null, false);
        }
  
        if (!bCrypt.isValidPassword(user, password)) {
          console.log('Invalid Password');
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
app.use((req, res, next) => {
    next()
  });

app.post("/login",passport.authenticate('login', { failureRedirect: '/failLogin' }), controller.postLogin)
app.get('/failLogin', controller.getFailLogin);
app.post('/signup', passport.authenticate('signup', { successRedirect: '/signup', failureRedirect: '/failSignup' }), controller.postSignup);
app.get('/failSignup', controller.getFailSignup);
app.get('/signup', controller.postLogin);
app.get('/logout', controller.logout);
app.get('/registerView', controller.getRegisterView);
app.get('/info',(req,res)=>{
  let argumentos = []
  process.argv.forEach(function (val, index, array) {
    argumentos.push(val)
  })
  let valores =  {
                  arguments : argumentos,
                  plataforma : process.platform,
                  version : process.version,
                  rss : process.memoryUsage().rss,
                  execPath : process.execPath,
                  processId : process.pid,
                  folder : process.cwd()
 
                }
  res.render('processInfo',valores)
})

app.use('/api/randoms',randomRouter)





Db.conectarDB(config.get('mongoDB.connection'), err => {
  
    if (err) return console.log('error en conexión de base de datos', err);
    console.log('BASE DE DATOS CONECTADA');
})




let {PORT} = parseArgs(process.argv.slice(2)) ;
if (!PORT) { PORT = 8080}
console.log(process.env)

app.listen(PORT, () => { 
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

