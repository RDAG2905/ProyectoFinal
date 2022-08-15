

const OrderDto = require('../Dto/OrderDto')
const DaoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')
const util = require('util')

const tipo = 'pedidoMongo'

class OrderRepo {

    constructor() {
        this.dao = new DaoFactory(tipo).getDao()
    }


    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new OrderDto(dto))
    }


    async getById(id) {
        const dto = await this.dao.getById(id)
        return new  OrderDto(dto)
    }


    async add(orden) {
        const dto = new  OrderDto(orden)
logger.info(` 4 - dto : ${util.inspect(dto)}`)   
        return await this.dao.save(dto)
    }


    async removeById(id) {
        const dto = await this.dao.delete(id)
        return new  OrderDto(dto)
    }

    async getOrdersByUserId(id){
        return await this.dao.getOrdersByUserId(id)
    }
}


module.exports = OrderRepo