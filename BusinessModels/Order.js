const { v4 } = require("uuid");

class Order {
  
     
    constructor(idUser,products,id){
       this.idUser = idUser,
       this.products = products
       this.id = id
    }
    

    createId(){
        this.id = v4()
    }
     
   
}
    
    
    module.exports = Order