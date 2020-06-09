const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

class UserController {

    static register(req,res) {
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
                res.status(400).json({
                    msg: err.errors[0].message
                })
            }
            res.status(500).json({
                msg: 'Internal Server Error!'
            })
        })
    }

    static login(req,res) {
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
                    res.status(400).json({
                        msg: `Incorrect Password`
                    })
                }
            } else {
                res.status(400).json({
                    msg: `Email Not found`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error!'
            })
        })
    }
}

module.exports = UserController