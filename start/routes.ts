/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return "Todolist API with AdonisJS"
})

router.get('/todos', '#controllers/todos_controller.index')
router.post('/todos', '#controllers/todos_controller.create')
router.patch('/todos/:id', '#controllers/todos_controller.update')
router.delete('/todos/:id', '#controllers/todos_controller.delete')
router.delete('/todos/:id/soft-delete', '#controllers/todos_controller.softDelete')
router.patch('/todos/:id/restore', '#controllers/todos_controller.restore')
