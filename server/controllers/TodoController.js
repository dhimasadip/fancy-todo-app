const { Todo, User } = require('../models')
const jwt = require('jsonwebtoken')

class TodoController {

    static list(req,res) {
        
        
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
            res.status(400).json({err: err})
        })
    }

    static add(req,res) {
        

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
            res.status(400).json({err: err})
        })
    }

    static edit(req,res) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
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
            res.status(400).json({err: err})
        })
    }

    static delete(req,res) {

        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({msg: `Successfully delete todo`})
        })
        .catch(err => {
            res.status(500).json({err: err})
        })
    }
    
}

module.exports = TodoController