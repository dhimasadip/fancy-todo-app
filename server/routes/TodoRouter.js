const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)
router.get('/list', TodoController.list)
router.post('/add', TodoController.add) 

router.get('/edit/:id', authorization, TodoController.edit)
router.put('/edit/:id', authorization, TodoController.editHandler)
router.delete('/delete/:id', authorization , TodoController.delete)

module.exports = router