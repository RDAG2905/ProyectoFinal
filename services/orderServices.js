const config = require('config');
const daoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')
const {notificarPedido} = require('../helpers/mailSender') 
const util = require('util')
const { enviarSms , enviarWhatsapp } = require('../helpers/twilioHelper')
let Changuito = require('../Business/Carrito')


const createOrderDB = async (idCart,idUser) => {
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
    let cartDao = factory.getDao()
    let cart = await cartDao.getCart(idCart)
    if (!cart) throw new Error('No se encontró el carrito')
    factory = new daoFactory(config.get('tipoPersistencia.persistenciaE')) 
    let orderDao = factory.getDao()
    let order = {idCart,idUser}
    let newOrder = await orderDao.save(order)
    let chango = new Changuito(cart)
    if (newOrder){
        notificarPedido(chango)
        enviarSms('Su pedido ha sido recibido y se encuentra en proceso')
        let msg = "Se ha notificado el pedido"
        return msg
    }
}



const getOrdersDB = async (idUser) => {
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaE')) 
    let dao = factory.getDao()
    return await dao.getByUserId(idUser)
}



module.exports = { createOrderDB , getOrdersDB }

/*
router.post('/crearPedido', async (req,res)=>{
    let carritoReq = req.body
    logger.info(`carritoReq :  ${util.inspect(carritoReq)}`)
    let factory = new daoFactory(config.get('tipoPersistencia.persistenciaB')) 
        let dao = factory.getDao()
        let carrito;
        try {
            carrito = await dao.getCarritoConProductos(JSON.stringify(carritoReq))
        } catch (error) {
            logger.error(error)
        }
       
        if(!carrito){           
            let error = `Carrito de compras vacio : ${carrito}`
            logger.info(`carrito vacio :  ${carrito}`)
            res.send({error})
        } else{
           
            let lista = ""
            let chango = new Changuito(carrito)
            notificarPedido(chango)
            enviarSms('Su pedido ha sido recibido y se encuentra en proceso')

            let msg = "Se ha notificado el pedido"
            res.send({msg})
        }

})*/