const { Todo } = require('../models')

module.exports = (req,res,next) => {

    const { id } = req.params

    Todo.findByPk(id)
    .then(data => {
        if (!data) {
            res.status(404).json({msg: `Todo not found`})
        } else if (data.UserId != req.user.id) {
            res.status(403).json({msg: `You're not authorized!`})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({err: err, msg: `Internal server error`})
        
    })
}
