class OrderDto {
  
     
    constructor({ idCart,idUser,id,productos}){
       this.idCart =  idCart,
       this.idUser = idUser,
       this.id = id,
       this.productos = productos
    }
    
   
}
    
    
    module.exports = OrderDto