class ProductCart{
#product
#cant

    constructor(product,quantity){
      this.product = product,
      this.cant = quantity
    }

    get product() { return this.#product }

    set product(producto) {
        if (!producto) throw new Error('"product" is required')
        this.#product = producto
    }

    get cant() { return this.#cant }
  
    set cant(cantidad) {
      if (!cantidad) throw new Error('"cant" is required');
      if (isNaN(cantidad)) throw new Error('cant must be numerical');
      if (cantidad <= 0) throw new Error('cant must be greater than zero');
      this.#price = precio;
    }
 
}
module.exports = ProductCart