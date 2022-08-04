


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
       // const dto = await this.dao.delete(id)
       // return new  CartDto(dto)
    }


    async editCart(cart){
        return await this.dao.editCart(cart)
    }
}

/*
    async addProduct(idCart,cartProduct) {
        return await this.dao.addProductToCart(idCart,cartProduct)
    }
*/

module.exports = CartRepo