const express = require('express')
const cookieParser = require('cookie-parser')
const Db = require('./controllers/DbController')

let util = require('util');
const parseArgs = require('minimist');
const dotenv = require('dotenv').config()
const randomRouter = require('./Rutas/RandomRouter')
const routerProductos = require('./Rutas/RouterProductos')
const routerCarrito = require('./Rutas/RouterCarrito')
const routerPedidos = require('./Rutas/RouterPedidos')
const routerAuth = require('./Rutas/AuthRouter')
const routerSystem = require('./Rutas/SystemRouter')
const routerHtml= require('./Rutas/HtmlOnWireRouter')

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
global.celAdmin = "+5491125111726"

const jwt = require('./middlewares/jwt')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
 
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

app.use('/views',routerHtml)
app.use('/api/randoms',randomRouter)
app.use('/files', uploadFilesRouter)
app.use('', routerAuth)
app.use('/api/productos',routerProductos)
app.use('/api/carrito',jwt.auth,routerCarrito)
app.use('/api/pedidos',jwt.auth,routerPedidos)
app.use('/api/system',routerSystem)


///////////// Manejo de rutas no implementadas ////////////////

app.use((req, res, next) => {
  const { url, method } = req
  const respuesta = `Ruta ${req.originalUrl} y metodo ${req.method} no implementados`
  res.status(404).send(respuesta)
});


app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Ocurrió un Error. Consulte con el administrador del sistema');
  next()
 });
 



//Db.conectarDB(process.env.MONGOATLASCONNECTION, err => {  
Db.conectarDB(process.env.MONGODB, err => { 
    if (err) 
    logger.error(`error en conexión de base de datos : ${err}`)
    else
    logger.info('BASE DE DATOS CONECTADA');
})


const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


httpServer.listen(PORT, () => {    
    logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})

httpServer.on('error', error => logger.error(`Error en servidor: ${error}`))

}