class Carrito{

    constructor(id){
        this.usuarioId = id
        this.productos = []
    }
    
    Vaciar(){this.productos = []}
    
    AgregarProducto(producto){ this.productos.push(producto)}
    
    EliminarProducto(idProducto){
    this.productos = this.productos.filter(p=>p.id != idProducto)}

    GetProducts(){this.productos}
}

module.exports = Carrito