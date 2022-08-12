const { v4 } = require("uuid");

class Product {
   
    #name
    #description
    #price
    #image

    constructor({ name,description,price,image}) {
      this.name = name,
      this.description = description,
      this.price = price,
      this.image= image
    }
  
   
  
    get name() { return this.#name }
  
    set name(nombre) {
      if (!nombre) throw new Error('the "name" is required');
      this.#name = nombre;
    }


    get description() { return this.#description }
  
    set description(descripcion) {
      if (!descripcion) throw new Error('the "description" is required');
      this.#description = descripcion;
    }
  
    get price() { return this.#price }
  
    set price(precio) {
      if (!precio) throw new Error('"price" is required');
      if (isNaN(precio)) throw new Error('price must be numerical');
      if (precio <= 0) throw new Error('price must be greater than zero');
      this.#price = precio;
    }
  
    get image() { return this.#image }
  
    set image(fotoUrl) {
      if (!fotoUrl) throw new Error('"image" is required');
      this.#image = fotoUrl;
    }

    
    createId(){
      this.id = v4()
  }
   

  }

  module.exports = Product