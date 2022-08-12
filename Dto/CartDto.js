class CartDto{

constructor(carrito){
    this._id = carrito._id
    this.id = carrito.id
    this.timestamp = carrito.timestamp   
    this.productos = carrito.productos
    this.usuarioId = carrito.usuarioId
    
}


}


module.exports = CartDto