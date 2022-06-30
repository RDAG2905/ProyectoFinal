
const productosRepo = require('./Repository')
const carrito = require('../Business/CarritoMongo')
class CarritoRepository{
    
    constructor(){
        this.primerId = 1  
        this.Carritos = [{
            id:1,
            productos:[]
        }]
        this.mensajeOk = 'El producto se agregó al carrito'  
        this.mensajeError = 'Producto inexistente'               
    }
   
   
    getCarritos(){this.carritos}
     
    getCarritoById(idCarrito){
        let Carrito = this.Carritos.find(pr => pr.id == idCarrito) 
        return Carrito   
    }

    getProductsByCarritoId(idCarrito){
        let Carrito = this.Carritos.find(pr => pr.id == idCarrito) 
        return Carrito.GetProducts()   
    }

    saveCarrito(Carrito){
        if (this.Carritos.length == 0){
            Carrito.id = this.primerId
         }else{
             let ids = this.Carritos.map(p=>p.id)            
             let maxId = Math.max(...ids)
             Carrito.id = maxId + 1
         }
         this.Carritos.push(Carrito)
         console.log(Carrito) 
         return Carrito.id
    }

    AgregarProductoAlCarrito(idCarrito,producto){       
            let carrito = this.Carritos.find(pr => pr.id == idCarrito)
            if(carrito){
                let producto_Agregado = carrito.AgregarProducto(producto)
                return producto_Agregado        
            }else{
                return null
            }
            
    } 
            

   


    eliminarCarrito(id){
        let carrito = this.Carritos.find( pr => pr.id == id)
        if(!carrito){
            return null
        }else{
            carrito.Vaciar()
            this.Carritos = this.Carritos.filter(prd => prd.id != id)
            return carrito
        }
        
    }

}

module.exports = CarritoRepository