

const MensajeDto = require('../Dto/MensajeDto')
const daoFactory = require('../Dao/DaoFactory')

const tipo = 'mensajeMongo'

class MensajesRepo {

    constructor() {
        this.dao = new daoFactory(tipo).getDao()
    }

    async getAllMessages() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new  MensajeDto(dto))
    }

    
    async getById(id) {
        const dto = await this.dao.getById(id)
        return new  MensajeDto(dto)
    }


    async add(prod) {
        const dto = new  MensajeDto(prod)
        return await this.dao.save(dto)
    }


    async removeById(id) {
        const dto = await this.dao.deleteById(id)
        return new  MensajeDto(dto)
    }
}


module.exports = MensajesRepo