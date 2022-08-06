const axios = require('axios')
const assert =  require('assert')
const { createServer } = require("../app");
const logger = require('../logger')

let server

async function conectar({ port = 0 }) {
    return new Promise((resolve, reject) => {
        server =  createServer().listen(port, err => {
            if (err) {
                reject(err)
            } else {
                resolve(port)
            }
        })
    })
}

async function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

describe('Connect to Server', () => {

    const url = "http://localhost:3000"
   
    const email = "admin@gmail.com"
    const password = "1234"
    const productoID = "62eedf5735cd8e68765f02ae"
    const productoNuevo = {                    
                            "name": "Inspiron 15 3000",
                            "description":"Notebook DELL",
                            "price": 100000,
                            "image": "/images/inspiron15.jpg"                          
                        }
    let token
   

    before(async () => {
        await conectar({ port: 3000 })
    })

    after(async () => {
        await desconectar()
    })

    beforeEach(() => { })

    afterEach(() => { })

    describe('LOGIN', () => {
        describe('API POST login', () => {
            it('deberia loguear al usuario y obtener el token', async () => {
                const { data } = await axios.post( url + '/login', {
                    "email":email,
                    "password":password
                })
               
                token = data.access_token

                assert.ok(data.access_token)
            })
        })
    })

    describe('PRODUCTOS', () => {
        describe('API GET api/productos', () => {
            it('Deberia retornar los productos', async () => {
                const { status } = await axios.get( url + '/api/productos')
                assert.strictEqual(status, 200)
            })
        })

        describe('API POST api/productos/', () => {
            it('deberia devolver la info del producto generado', async () => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                const { data } = await axios.post(url + '/api/productos',productoNuevo)
                assert.ok(data.name)
                assert.ok(data.description)
                assert.ok(data.price)               
                assert.ok(data.image)
            })
        })

        describe('API GET api/productos/id/{idProducto}', () => {
            it('deberia retornar la info del producto solicitado', async () => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                const { data } = await axios.get( url + '/api/productos?id=' + productoID)              
                assert.ok(data.name)
                assert.ok(data.description)
                assert.ok(data.price)               
                assert.ok(data.image)
            })
        })

        
        describe('al enviar datos incorrectos', () => {
            it('deberia devolver un error 400', async () => {
                return assert.rejects(
                    axios.post(url + '/api/productos', {}),
                    error => {
                        assert.strictEqual(error.response?.status, 400)
                        return true
                    }
                )
            })
        })

    })

})