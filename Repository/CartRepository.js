


const CartDto = require('../Dto/CartDto')
const DaoFactory = require('../Dao/DaoFactory')
const config = require('config')
const tipo = config.get('tipoPersistencia.persistenciaB')


class CartRepo {

    constructor() {
        this.dao = new DaoFactory(tipo).getDao()
    }


    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new CartDto(dto))
    }


    async getById(id) {
        const dto = await this.dao.getById(id)
        return new  CartDto(dto)
    }


    async add(cart) {
        const dto = new  CartDto(cart)
        return await this.dao.save(dto)
    }


    async removeById(id) {
        const dto = await this.dao.delete(id)
        return new  CartDto(dto)
    }
}


module.exports = CartRepo