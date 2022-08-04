

const OrderDto = require('../Dto/OrderDto')
const DaoFactory = require('../Dao/DaoFactory')
const config = require('config')
const tipo = config.get('tipoPersistencia.persistenciaE')


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
        return await this.dao.save(dto)
    }


    async removeById(id) {
        const dto = await this.dao.delete(id)
        return new  OrderDto(dto)
    }

    async getOrdersByUserId(id){
        const dto = await this.dao.getOrdersByUserId(id)
    }
}


module.exports = OrderRepo