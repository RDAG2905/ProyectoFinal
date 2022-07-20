class ProductoCarrito{

    constructor(producto){
        this._id = producto._id
        this.timestamp = producto.timestamp
        this.nombre = producto.nombre
        this.precio = producto.precio
        this.fotoUrl = this.fotoUrl
        this.cantidad = 0
    }
    
   

}
module.exports = ProductoCarrito