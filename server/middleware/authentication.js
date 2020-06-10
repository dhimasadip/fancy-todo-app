const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = (req,res,next) => {

    const { access_token } = req.headers
    
    if(!access_token) return res.status(404).json({msg: 'Token Not found'})

    try {
        const decode = jwt.verify(access_token, process.env.KEY)
        req.user = decode
    
        User.findByPk(req.user.id)
        .then(data => {
            if (data) {
                next()

            } else {
                next({ str_code: 'USER_NOT_FOUND' })
            }   
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    } catch {
        next({ str_code: 'INVALID_TOKEN' })

    }
    

}