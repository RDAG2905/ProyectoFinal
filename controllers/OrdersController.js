const logger = require("../logger")
const services = require('../services/orderServices')


const createOrder = (req,res)=>{
    const user = req.user
    services.createOrderDB(user)
            .then(x =>
                res.json(x))
            .catch(err=>{
                logger.error(err.stack)
                let msg = 'Error creating Order . ' + err
                res.send({msg})
            })           
}




const getOrders = (req,res)=>{
    let id = req.user.id  
    services.getOrdersDB(id)
            .then(orders =>
                res.send({orders}))
            .catch(err=>{
                logger.error(err.stack)
                let msg = 'Error getting Orders . ' + err 
                res.send({msg})
            })      

}



module.exports = {
    createOrder,getOrders
}