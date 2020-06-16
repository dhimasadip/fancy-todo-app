const { Todo, User } = require('../models')
const axios = require("axios")

class TodoController {

    static list(req,res,next) {
        
        Todo.findAll({
            include: User,
            where: {
                '$User.id$': req.user.id
            }
        })
        .then(data => {
            return res.status(200).json({data: data})
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static add(req,res,next) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date),
            UserId: req.user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        

        Todo.create(todo)
        .then(data => {
            return res.status(201).json(data)
        })
        .catch(err => {
            if (err.errors) {
                const err_data = err.errors.map(el => el.message)
                next({ str_code: 'TODO_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static edit(req,res,next) {
        const { id } = req.params

        Todo.findByPk(id)
            .then(data => {
                if(data) {
                    return res.status(200).json({data})
                } else {
                    next({ str_code: 'TODO_NOT_FOUND'})
                }
            })
            .catch(err => {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }

    static editHandler(req,res,next) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)
        }

        const { id } = req.params

        Todo.update(todo, {
            where: { id }
        })
            .then(data => {
                return res.status(200).json({ msg: `Successfully update todo` })
            })
            .catch(err => {
                if (err.errors) {
                    const err_data = err.errors.map(el => el.message)
                    next({ str_code: 'TODO_VALIDATION', err_data })
                } else {
                    next({ str_code: 'INTERNAL_SERVER_ERROR' })
                }
            })
    }

    static delete(req,res,next) {

        const { id } = req.params

        Todo.destroy({
            where: { id }
        })
        .then(data => {
            return res.status(200).json({msg: `Successfully delete todo`})
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }


    
    static notify(req,res,next) {
        const { id } = req.body
        
        Todo.findByPk(id, {
            include: User
        })
            .then(data => {
                
                if (data) {

                    return axios({
                        "method":"POST",
                        "url":"https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
                        "headers":{
                            "content-type":"application/json",
                            "x-rapidapi-host":"rapidprod-sendgrid-v1.p.rapidapi.com",
                            "x-rapidapi-key":"14c81a20a4mshc1ceafdea64a109p1e678fjsn1a48bb28b089",
                            "accept":"application/json",
                            "useQueryString":true
                        },
                        "data":{
                            "personalizations":[{
                                "to":[{
                                    "email":`${data.User.email}`
                                }],
                                "subject":`[REMINDER] ${data.title}`
                            }],
                            "from":{
                                "email":"fancy_todo@mail.com"
                                },
                                "content":[{
                                    "type":"text/plain",
                                    "value":`due date : ${data.due_date}\nstatus : ${data.status == 'done' ? 'DONE' : data.status == 'waiting' ? 'WAITING' : 'ON PROCESS'}\ndescription : ${data.description}
                                    `
                                }]
                        }
                    })

                } else {
                    return { str_code: 'TODO_NOT_FOUND' }
                }
            })
            .then(response => {
                
                if(response.str_code) {
                    next({ str_code: response.str_code})
                } else {
                    res.status(200).json({ msg: 'Successfully notify todo to your email'})
                }
            })
            .catch(err => {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }
    
}

module.exports = TodoController