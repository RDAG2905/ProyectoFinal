
const UserDto = require('../Dto/UserDto')
const daoFactory = require('../Dao/DaoFactory')

const tipo = 'usuarioMongo'

class UserRepo {

    constructor() {
        this.dao = new daoFactory(tipo).getDao()
    }


    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new UserDto(dto))
    }


    async getById(id) {
        const dto = await this.dao.getById(id)
        return new UserDto(dto)
    }

    async getByEmail(email) {
        let dto = await this.dao.getUserByUserName(email)
        if(!dto){
            return false
        }
        return new  UserDto(dto)
    }

    async add(user) {
        const dto = new  UserDto(user)
        return await this.dao.save(dto)
    }


    async removeById(id) {
        const dto = await this.dao.delete(id)
        return dto
    }
}


module.exports = UserRepo