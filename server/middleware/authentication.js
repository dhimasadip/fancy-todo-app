const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = (req,res,next) => {

    const { access_token } = req.headers

    if(!access_token) res.status(404).json({msg: 'Token Not found'})

    try {
        const decode = jwt.verify(access_token, process.env.KEY)
        req.user = decode
    
        User.findByPk(req.user.id)
        .then(data => {
            if (data) {
                next()
            } else {
                res.status(404).json({msg: 'User not found'})
            }   
        })
        .catch(err => {
            // res.status(500).json({err: err, msg: 'Internal server error'})
            next({str_code: 'INTERNAL_SERVER_ERROR'})
        })
    } catch {
        // res.status(404).json({ msg: 'Invalid Token'})
        next({str_code: 'INVALID_TOKEN'})

    }
    

}