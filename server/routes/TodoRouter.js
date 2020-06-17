const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)
router.get('/', TodoController.list) 
router.post('/', TodoController.add) 

router.post('/notify', TodoController.notify)
router.get('/:id', authorization, TodoController.edit)
router.put('/:id', authorization, TodoController.editHandler)
router.delete('/:id', authorization , TodoController.delete)

module.exports = router