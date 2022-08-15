


const CartDto = require('../Dto/CartDto')
const DaoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')
const util = require('util')

const tipo = 'carritoMongo'

class CartRepo {

    constructor() {
        this.dao = new DaoFactory(tipo).getDao()
    }


    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new CartDto(dto))
    }


    async getCartById(id) {
        const dto = await this.dao.getCart(id)
        return new  CartDto(dto)
    }


    async add(cart) {
        const dto = new  CartDto(cart)
        return await this.dao.save(dto)
    }


    async removeById(id) {
       return await this.dao.delete(id)
      
    }


    async editCart(cart){
        const dto = new CartDto(cart)
        logger.info(' cart Dto :' + util.inspect(dto))
        return await this.dao.editCart(dto)
    }


    
}


module.exports = CartRepo