
const daoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')
const {notificarPedido} = require('../helpers/mailSender') 
const util = require('util')
const { enviarSms , enviarWhatsapp } = require('../helpers/twilioHelper')
let Changuito = require('../BusinessModels/Cart')
const OrderRepository = require('../Repository/OrderRepository')
const CartRepository = require('../Repository/CartRepository')
const UserOrder = require('../BusinessModels/Order')
const cartRepository = new CartRepository()
const orderRepository = new OrderRepository()


const createOrderDB = async (user) => {
    
    let cart = await cartRepository.getCartById(user.id)

    if (!cart) throw new Error('shoppingCart not found')
    let chango = new Changuito(cart)
    if(chango.isEmpty()) throw new Error('shoppingCart is empty. It cannot create orders')
    
logger.info(` 1 - chango : ${util.inspect(chango)}`)

    let order = new UserOrder(user.id,chango.productos)

logger.info(` 2 - order : ${util.inspect(order)}`)   

    order.createId()
    let newOrder = await orderRepository.add(order)

    logger.info(` 3 - neworder : ${newOrder}`)   

    if (newOrder){
        await notificarPedido(chango,user)
        chango.removeAll()
        await cartRepository.editCart(chango)
        let msg = "Se ha notificado el pedido"
        return msg
    }
}



const getOrdersDB = async (idUser) => {
    return await orderRepository.getOrdersByUserId(idUser)
}



module.exports = { createOrderDB , getOrdersDB }

