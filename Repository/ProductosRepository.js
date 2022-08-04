

const ProductDto = require('../Dto/ProductDto')
const daoFactory = require('../Dao/DaoFactory')
const config = require('config')
let tipo = config.get('tipoPersistencia.persistenciaA')


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
        return new ProductDto(dto)
    }


    async add(prod) {
        const dto = new ProductDto(prod)
        return await this.dao.save(dto)
    }


    async removeById(idProd) {
        const dto = await this.dao.deleteById(idProd)
        return new ProductDto(dto)
    }
}


module.exports = ProductosRepo