
const login = (req, res) => {
 
let bienvenida
let contador = 0
if (req.session.nombre) {    
  req.session.contador = req.session.contador + 1
  bienvenida = `Bienvenido ${req.session.nombre}, visitaste la pagina ${req.session.contador} veces`
 
} else {
  req.session.nombre = req.body.nombre || 'Desconocido'
  req.session.contador = 1
  bienvenida = `Bienvenido ${req.session.nombre}`   
}
  res.render("welcome",{bienvenida})
}



const logout = (req,res) => {
    let nombre = req.session.nombre || 'Desconocido'
    req.session.destroy( err => {      
        if(!err) res.render("Despedida",{nombre})
        else res.send({status: 'Logout ERROR', body: err})
    })
}



const info = (req,res) => {
  console.log('------------ req.session -------------')
  console.log(req.session)
  console.log('--------------------------------------')

  console.log('----------- req.sessionID ------------')
  console.log(req.sessionID)
  console.log('--------------------------------------')

  console.log('----------- req.cookies ------------')
  console.log(req.cookies)
  console.log('--------------------------------------')

  console.log('---------- req.sessionStore ----------')
  console.log(req.sessionStore)
  console.log('--------------------------------------')

 res.sen('info ok')
}


module.exports = {
    login,logout,info
}