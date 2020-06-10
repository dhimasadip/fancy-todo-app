const { Todo, User } = require('../models')

class TodoController {

    static list(req,res,next) {
        
        Todo.findAll({
            include: User,
            where: {
                '$User.id$': req.user.id
            }
        })
        .then(data => {
            res.status(200).json({data: data})
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
            res.status(201).json({msg: `Successfully create todo`})
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static edit(req,res,next) {
        Todo.findByPk(req.params.id)
        .then(data => {
            res.status(200).json({data})
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


        Todo.update(todo, {
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({msg: `Successfully update todo`})
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static delete(req,res,next) {

        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({msg: `Successfully delete todo`})
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }
    
}

module.exports = TodoController