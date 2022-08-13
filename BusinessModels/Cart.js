const logger = require("../logger")
const { v4 } = require("uuid")

class ShoppingCart{

    constructor(carrito){
       
        if(carrito){
            this._id = carrito._id
            this.id = carrito.id
            this.timestamp = carrito.timestamp   
            this.productos = carrito.productos
            this.usuarioId = carrito.usuarioId
            this.totalGeneral = 0
            this.calcularTotal()
        }
    }
   
    
    Vaciar(){this.productos = []}
    

    addProduct(producto){ 
        if(!producto){
            throw new Error('Product was not added')
        }
        this.productos.push(producto)
    }
    

    removeProduct(idProducto){
    this.productos = this.productos.filter(p=>p.id != idProducto)}

    
    GetProducts(){this.productos}

   
    calcularTotal(){
        if(this.productos.length > 0){
            this.productos.forEach(element => {
                this.totalGeneral += element.product.cant * element.price 
            });
        }else{
            this.totalGeneral = 0
        }
        
    }


    createId(){
        this.id = v4()
    }
}


module.exports = ShoppingCart