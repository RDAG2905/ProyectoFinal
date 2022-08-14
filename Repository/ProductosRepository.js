
const util = require('util')
const ProductDto = require('../Dto/ProductDto')
const daoFactory = require('../Dao/DaoFactory')
const logger = require('../logger')

const tipo = 'productoMongo'

class ProductosRepo {

    constructor() {
        this.dao = new daoFactory(tipo).getDao()
    }


    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new ProductDto(dto))
    }


    async getById(idProd) {
        const dto = await this.dao.getById(idProd)
        logger.info(util.inspect(dto))
        return new ProductDto(dto)
    }


    async add(prod) {
        const dto = new ProductDto(prod)
        return await this.dao.save(dto)
    }


    async edit(prod,idBuscado) {
        const dto = new ProductDto(prod)
        return await this.dao.update(dto,idBuscado)
    }

    async removeById(idProd) {
        const dto = await this.dao.delete(idProd)
        return new ProductDto(dto)
    }
}


module.exports = ProductosRepo