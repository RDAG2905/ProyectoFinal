

const MensajeDto = require('../Dto/MensajeDto')
const daoFactory = require('../Dao/DaoFactory')
const config = require('config')
const tipo = config('tipoPersistencia.persistenciaF')


class MensajesRepo {

    constructor() {
        this.dao = new daoFactory(tipo)
    }

    async getAll() {
        const dtos = await this.dao.getAll({})
        return dtos.map(dto => new  MensajeDto(dto))
    }

    async getById(idProd) {
        const dto = await this.dao.getById(idProd)
        return new  MensajeDto(dto)
    }

    async add(prod) {
        const dto = new  MensajeDto(prod)
        return await this.dao.save(dto)
    }

    async removeById(idProd) {
        const dto = await this.dao.deleteById(idProd)
        return new  MensajeDto(dto)
    }
}


module.exports = MensajesRepo