const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

class UserController {

    static register(req,res,next) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(user)
        .then(data => {
            res.status(201).json({
                msg: 'Successfully created new user.'
            })
        })
        .catch(err => {
            
            if(err.errors) {
                const err_data = err.errors.map(el => el.message)
                res.status(400).json({ msg: err_data })

            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
            
        })
    }

    static login(req,res,next) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: { email: user.email}
        })
        .then(data => {
            if (data) {
                if(bcrypt.compareSync(user.password, data.password)) {
                    const access_token = jwt.sign({
                        id: data.id,
                        email: data.email
                    }, process.env.KEY)

                    req.headers.access_token = access_token
                    
                    res.status(200).json({
                        access_token,
                        msg: `You're logged in`
                    })
                } else {
                    next({ str_code: 'INCORRECT_PASSWORD' })
                }

            } else {
                next({ str_code: 'EMAIL_NOT_FOUND' })

            }
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }
}

module.exports = UserController