



const postLogin = (req, res)=> {
  req.session.nombre = req.body.username
  let bienvenida =`Bienvenido ${req.session.nombre}`
  res.render("welcome",{bienvenida})
}


const getFailLogin = (req, res) =>{
  console.log('error en login');
  res.sendFile(global.root + '/public/ErrorLogin.html');
}

function postSignup (req, res) {
  var user = req.user;
  let bienvenida =`Usuario generado ${user.username}`
  res.render("welcome",{bienvenida})
 
}


function getFailSignup (req, res) {
  console.log('error en signup');
  res.sendFile(global.root + '/public/ErrorSignup.html');
}



function getRegisterView (req, res) {
  res.sendFile(global.root + '/public/Register.html');
}



const logout = (req,res) => {
    let nombre = req.session.nombre || 'Desconocido'
    req.session.destroy( err => {      
        if(!err) {
          console.log(req.session)
          res.render("Despedida",{nombre})
        }
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
    postLogin,getFailLogin,getRegisterView,postSignup,getFailSignup,logout,info
}