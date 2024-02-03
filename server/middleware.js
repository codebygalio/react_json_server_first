module.exports = ( req, res, next ) => {
    const reqMethod = req.method.toLocaleLowerCase()
    const reqUrl = req.path.toLocaleLowerCase()
    if(reqUrl === '/login' && reqMethod === 'post'){
        if(req.body.username === 'name1' && req.body.password === '123456'){
            return res.status(200).json({
                user:{
                    name: '自定义用户名',
                    token:'123token'
                }
            })
        }
        return res.status(400).json({message: '用户名或密码错误'})
    }
    if(reqUrl === '/register' && reqMethod === 'post'){
        return res.status(200).json({
            user:{
                name: '自定义用户名',
                token:'123token'
            }
        })
    }
    if(reqUrl === '/me' && reqMethod === 'get'){
        return res.status(200).json({
            user:{
                user:{
                    name: '自定义用户名',
                    token:'123token'
                }
            }
        })
    }
    
    next()
}