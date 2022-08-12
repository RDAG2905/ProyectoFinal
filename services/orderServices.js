
const daoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')
const {notificarPedido} = require('../helpers/mailSender') 
const util = require('util')
const { enviarSms , enviarWhatsapp } = require('../helpers/twilioHelper')
let Changuito = require('../BusinessModels/Cart')
const OrderRepository = require('../Repository/OrderRepository')
const CartRepository = require('../Repository/CartRepository')
const UserCart = require('../BusinessModels/Order')

const createOrderDB = async (idCart,idUser,user) => {
   
    let cartRepository = new CartRepository()
    let cart = await cartRepository.getCartById(idCart)

    if (!cart) throw new Error('No se encontró el carrito')
    
    
    let orderRepository = new OrderRepository()

    let order = new UserCart({idCart,idUser})

    let newOrder = await orderRepository.add(order)

    let chango = new Changuito(cart)
    if (newOrder){
        await notificarPedido(chango,user)
        await enviarSms('Su pedido ha sido recibido y se encuentra en proceso')
        let msg = "Se ha notificado el pedido"
        return msg
    }
}



const getOrdersDB = async (idUser) => {
    let orderRepository = new OrderRepository()
    return await orderRepository.getOrdersByUserId(idUser)
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