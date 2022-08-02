class Product {
    #id
    #name
    #description
    #price
    #image
  
    constructor({ id,name,description,price,image }) {
      this.id = id,
      this.name = name,
      this.description = description,
      this.price = price,
      this.image= image
    }
  
    get id() { return this.#id }
  
    set id(id) {
      if (!id) throw new Error('"id" es un campo requerido');
      this.#id = id;
    }
  
    get name() { return this.#name }
  
    set name(nombre) {
      if (!nombre) throw new Error('"nombre" es un campo requerido');
      this.#name = nombre;
    }


    get description() { return this.#description }
  
    set description(descripcion) {
      if (!descripcion) throw new Error('"descripción" es un campo requerido');
      this.#description = descripcion;
    }
  
    get price() { return this.#price }
  
    set price(precio) {
      if (!precio) throw new Error('"precio" es un campo requerido');
      if (isNaN(precio)) throw new Error('"precio" debe ser numérico');
      if (precio < 0) throw new Error('"precio" debe ser positivo');
      this.#price = precio;
    }
  
    get image() { return this.#image }
  
    set image(fotoUrl) {
      if (!fotoUrl) throw new Error('"la foto" es un campo requerido');
      this.#image = fotoUrl;
    }

  }