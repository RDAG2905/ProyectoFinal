const passport = require('passport')

 const registroController = passport.authenticate('signup', {
    successRedirect: '/successRegister',
    failureRedirect: '/failRegister',
})


 const loginController = passport.authenticate('login', {
    successRedirect: '/successLogin',
    failureRedirect: '/failLogin',
})


 function successRegisterController(req, res) {
    res.json(req.user)   
}


 function failRegisterController(req, res) {
    res.status(400).json({ err: 'Falló el registro' })
}

 function successLoginController(req, res) {
    req.user = passport.session
    res.json({ msg: 'ok' })
}

 function failLoginController(req, res) {
    res.status(401).json({ err: 'fallo el login' })
}


 function logoutController(req, res) {
    if (req.isAuthenticated()) {
        req.logout()
    }
    res.sendStatus(200)
} 


module.exports = {
    registroController,
    loginController,
    successRegisterController,
    failRegisterController,
    successLoginController,
    failLoginController,
    logoutController
}
