export function isAuth(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

export function isNotAuth(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/index')
    }else{
        next()
    }
}

export function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.admin){
        next()
    }else{
        res.status(401).json({msg: 'No esta autorizado para realizar esta acción'})
    }
}