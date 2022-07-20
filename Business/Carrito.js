const logger = require("../logger")

class Carrito{

    constructor(carrito){
        logger.info(`carrito constructo : ${carrito}`)
        if(carrito){
            this._id = carrito._id
            this.timestamp = carrito.timestamp   
            this.productos = carrito.productos
            this.usuarioId = carrito.usuarioId
            this.totalGeneral = 0
            this.calcularTotal()
        }
    }
   
    
    Vaciar(){this.productos = []}
    
    AgregarProducto(producto){ this.productos.push(producto)}
    
    EliminarProducto(idProducto){
    this.productos = this.productos.filter(p=>p.id != idProducto)}

    GetProducts(){this.productos}

    calcularTotal(){
        if(this.productos.length > 0){
            this.productos.forEach(element => {
                this.totalGeneral += element.cantidad * element.precio 
            });
        }else{
            this.totalGeneral = 0
        }
        
    }
}

module.exports = Carrito