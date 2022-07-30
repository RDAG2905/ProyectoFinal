const logger = require("../logger")
const services = require('../services/orderServices')


const createOrder = (req,res)=>{
    const { idCart,idUser } = req.body
    const user = req.user
    services.createOrderDB(idCart,idUser,user)
            .then(x =>
                res.json(x))
            .catch(err=>{
                logger.error(err.stack)
                let msg = 'Error al crear la Orden'
                res.send({msg})
            })           
}




const getOrders = (req,res)=>{
    let id = req.params.idUser   
    services.getOrdersDB(id)
            .then(orders =>
                res.send({orders}))
            .catch(err=>{
                logger.error(err.stack)
                let msg = 'Error al obtener los Pedidos'
                res.send({msg})
            })      

}



module.exports = {
    createOrder,getOrders
}