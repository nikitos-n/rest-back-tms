const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const usersValidator = require('../middlewares/validators/users')
const authController = require('../controllers/auth')

const router = Router()

router
  .post('/auth/register', usersValidator.userRegister, authController.authRegister)
  .post('/auth/login', usersValidator.userLogin, authController.authLogin)
  .post('/auth/logout', checkAuth, authController.authLogout)

module.exports = router
