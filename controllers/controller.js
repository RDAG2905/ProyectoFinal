



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
  let argumentos = []
  process.argv.forEach(function (val, index, array) {
    argumentos.push(val)
  })
  let valores =  {
                  arguments : argumentos,
                  plataforma : process.platform,
                  version : process.version,
                  rss : process.memoryUsage().rss,
                  execPath : process.execPath,
                  processId : process.pid,
                  folder : process.cwd(),
                  procesadores : process.env.NUMBER_OF_PROCESSORS
 
                }
  res.render('processInfo',valores)
}


module.exports = {
    postLogin,getFailLogin,getRegisterView,postSignup,getFailSignup,logout,info
}