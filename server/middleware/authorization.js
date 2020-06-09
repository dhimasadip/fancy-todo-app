const { Todo } = require('../models')

module.exports = (req,res,next) => {

    const { id } = req.params

    Todo.findByPk(id)
    .then(data => {
        if (!data) {
            next({ str_code: 'TODO_NOT_FOUND' })

        } else if (data.UserId != req.user.id) {
            next({ str_code: 'UNAUTHORIZED' })

        } else {
            next()
        }
    })
    .catch(err => {
        next({ str_code: 'INTERNAL_SERVER_ERROR' })
    })
}
