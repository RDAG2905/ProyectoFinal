

    module.exports={
       
        server: {
            "port": 8080
        },
        mongoAtlas: {
            "connection": 'mongodb+srv://ruben:WdaKBLhsGmS9kVcQ@cluster0.ca9xj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'         
        },
        secret:{
            "value":'shhhhhhhhhhhhhhhhhhhhh'
        },
        mongoDB: {
            "connection": 'mongodb://localhost:27017/autenticacion'         
        },
        tipoPersistencia:{
            "persistenciaA":'productoMongo',
            'persistenciaB':'carritoMongo',
            'persistenciaC':'productoSql',
            'persistenciaD':'carritoSql',
            'persistenciaE':'pedidoMongo',
            'persistenciaF':'mensajeMongo'
        },
        optionsSqlLite3 : {
            client: 'sqlite3', 
            connection: {
              filename: "./DB/mydb.sqlite"
            },
            useNullAsDefault : true
        },
        optionsMySql : {
            client: 'mysql',
            connection: {
              host : '127.0.0.1',
              port : 3306,
              user : 'root',
              password : '',
              database : 'ecommerce2'
            }
                     
        }
        
    }

    