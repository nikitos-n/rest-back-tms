const { Router } = require('express')
const usersValidator = require('../middlewares/validators/users')
const authController = require('../controllers/auth')

const router = Router()

router
  .post('/auth/register', usersValidator.userRegister, authController.authRegister)
  .post('/auth/login', usersValidator.userLogin, authController.authLogin)

module.exports = router
