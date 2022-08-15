
const path = require('path')
const dotenv = require('dotenv')

const config = require('./config/config')
const Db = require('./controllers/DbController')

let util = require('util');
const parseArgs = require('minimist');

const { init } = require('./server')

const cluster = require('cluster')
const {cpus} = require('os')


const modoCluster = process.argv[4] == 'CLUSTER'
const compression = require('compression')
const logger = require('./logger.js')




const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const webSocket = require('./WebSocket/socket')

 
  
    dotenv.config({
        path:
          
          process.argv[2] == 'desa'
            ? path.resolve(__dirname, 'desa.env')
            : path.resolve(__dirname, 'prod.env'),
      })



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

const app = init()
  

Db.conectarDB(process.env.MONGODB, err => { 
    if (err) 
    logger.error(`error en conexión de base de datos : ${err}`)
    else
    logger.info('BASE DE DATOS CONECTADA');
})

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
webSocket(io)


httpServer.listen(process.env.PORT, () => {    
    logger.info(`Servidor express escuchando en el puerto ${process.env.PORT}`)
})

httpServer.on('error', error => logger.error(`Error en servidor: ${error}`))

}

