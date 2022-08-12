class UserDto {

constructor(user){
    this.name = user.name,
    this.lastname = user.lastname,
    this.email = user.email,
    this.password = user.password,
    this.phone = user.phone,
    this.isAdmin = user.isAdmin,
    this.url = user.url
    this.id = user.id
}

}


module.exports = UserDto