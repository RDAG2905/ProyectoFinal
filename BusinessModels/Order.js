const { v4 } = require("uuid");

class Order {
  
     
    constructor({ idCart,idUser,products}){
       this.idCart =  idCart,
       this.idUser = idUser,
       this.products = products
    }
    

    createId(){
        this.id = v4()
    }
     
   
}
    
    
    module.exports = Order