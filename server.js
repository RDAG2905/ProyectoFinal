global.root = __dirname
const express = require('express')
const logger = require('./logger')

const uploadFilesRouter = require('./Routes/uploadFileRouter.js')
const userRouter = require('./Routes/UserRouter')
const productRouter= require('./Routes/RouterProductos')

const randomRouter = require('./Routes/RandomRouter')

const routerCarrito = require('./Routes/RouterCarrito')
const routerPedidos = require('./Routes/RouterPedidos')
const routerAuth = require('./Routes/AuthRouter')
const routerSystem = require('./Routes/SystemRouter')
const routerHtml= require('./Routes/HtmlOnWireRouter')

const path = require('path')
const handlebars = require('express-handlebars')    
const { header, redirect } = require('express/lib/response')


const jwt = require('./middlewares/jwt')

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
    
    
    app.use('/views',routerHtml)
    app.use('/api/randoms',randomRouter)
    app.use('/api/system',routerSystem)

    ///////////////////////////////////////

    app.use('', routerAuth)
    app.use('/api/images', uploadFilesRouter)
    app.use('/api/users',userRouter)
    app.use('/api/products',productRouter)
    app.use('/api/shoppingcartproducts',jwt.auth,routerCarrito)
    app.use('/api/orders',jwt.auth,routerPedidos)

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