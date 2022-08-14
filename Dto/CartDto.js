class CartDto{

constructor(carrito){
    this.id = carrito.id
    this.timestamp = carrito.timestamp   
    this.productos = carrito.productos
}


}


module.exports = CartDto