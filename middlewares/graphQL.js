const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const {obtenerProductos, obtenerUnProducto, agregarProducto, borrarProducto} = require('../controllers/GraphQLController')

const schema = buildSchema(`
  input ProductoInput {
    name: String
    description: String
    price: Int
    image: String
    quantity : Int
  }
  type Producto {
    id: ID!
    name: String
    description: String
    price: Int    
    image: String
    quantity : Int
  }
  type Query {
    obtenerProductos: [Producto]
    obtenerUnProducto(id: ID!): Producto
  }
  type Mutation {
    agregarProducto(datos: ProductoInput!): Producto
    borrarProducto(id: ID!): Producto
  }
`)

const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    obtenerProductos,
    obtenerUnProducto, 
    agregarProducto,
    borrarProducto,
  },
  graphiql: true,
})

module.exports = { graphqlMiddleware }