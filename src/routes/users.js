const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const usersValidator = require('../middlewares/validators/users')
const usersController = require('../controllers/users')

const router = Router()

router
  .get('/users', checkAuth, usersController.getUsers)
  .get('/users/:userId', checkAuth, usersController.getUserById)

  .post('/users/:userId/upload/photo', checkAuth, usersController.uploadUserPhoto)
  
  .put('/users/:userId', checkAuth, usersValidator.userUpdate, usersController.updateUserById)

  .delete('/users/:userId', checkAuth, usersController.deleteUserById)

module.exports = router
