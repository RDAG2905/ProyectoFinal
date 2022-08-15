const logger = require("../logger")
const util = require("util")

class ShoppingCart{

    constructor(carrito){
       
        if(carrito){
            this.id = carrito.id
            this.timestamp = carrito.timestamp   
            this.productos = carrito.productos 
            this.totalGeneral = 0        
            this.calcularTotal()
        }
    }
   
    
    initialize =(userId)=>{
        this.id = userId
        this.productos = []       
    }

    removeAll(){this.productos = []}
    

    addProduct(producto){ 
        if(!producto){
            throw new Error('Product was not provided. Failed Operation')
        }
        this.productos.push(producto)
    }
    

    removeProduct(idProducto){
        if(!idProducto){
            throw new Error('Product Id was not provided. Failed Operation')
        }
        this.productos .forEach(element => {
            logger.info('element : ' + util.inspect(element.product.id))
        });
        let exists = this.productos.some(p=>p.product.id == idProducto)
        if(!exists){
           throw new Error('ShoppingCart Product not found')
        }
           this.productos = this.productos.filter(p=>p.product.id != idProducto)
        }

    
    GetProducts(){this.productos}

    
    isEmpty(){
        return this.productos.length == 0
    }

   
    calcularTotal(){
        if(this.productos.length > 0){
            this.productos.forEach(element => {
                this.totalGeneral += element.product.price * element.quantity
            });
        }else{
            this.totalGeneral = 0
        }
        
    }


}


module.exports = ShoppingCart