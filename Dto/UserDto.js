class UserDto {

constructor(user){
    this.username = user.username,
    this.nombre = user.nombre,
    this.direccion = user.direccion,
    this.edad = user.edad,
    this.telefono = user.telefono,
    this.isAdmin = user.isAdmin,
    this.fotoUrl = user.fotoUrl
}

}


module.exports = UserDto