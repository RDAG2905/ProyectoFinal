
const getMiliseconds = require('../helpers/getMiliseconds')

const validateSession = (req,res,next)=>{
    let fecha = getMiliseconds()
    if (req.session.cookie.expires <= fecha) {
        res.redirect('/')
    }else{
        req.session.cookie.expires =  new Date(getMiliseconds() + 60000)
    }
    next()
}

module.exports = validateSession;