const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/list', TodoController.list)
router.post('/add', TodoController.add)

router.post('/edit/:id', authorization, TodoController.edit)
router.get('/delete/:id', authorization , TodoController.delete)

module.exports = router