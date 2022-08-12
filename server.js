const express = require('express')
const cookieParser = require('cookie-parser')

const randomRouter = require('./Rutas/RandomRouter')
const routerProductos = require('./Rutas/RouterProductos')
const routerCarrito = require('./Rutas/RouterCarrito')
const routerPedidos = require('./Rutas/RouterPedidos')
const routerAuth = require('./Rutas/AuthRouter')
const routerSystem = require('./Rutas/SystemRouter')
const routerHtml= require('./Rutas/HtmlOnWireRouter')
const uploadFilesRouter = require('./Rutas/uploadFileRouter.js')
const path = require('path')
const handlebars = require('express-handlebars')    
const { header, redirect } = require('express/lib/response')


const jwt = require('./middlewares/jwt')
const { graphqlMiddleware } = require('./middlewares/graphQL')

const init =() =>{
    
    const app = express()

    app.use(express.json({limit: '25mb'}));
    app.use(express.urlencoded({limit: '25mb',extended:true}));
    
    app.use(express.static('public'));
    app.use(express.static(path.join(__dirname, "/files")));
    
   
    
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
    //app.use(cookieParser())
    
    app.use('/graphql', graphqlMiddleware)
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
     
   return app
}


module.exports = { init }