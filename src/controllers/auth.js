const authService = require('../services/auth')
const usersService = require('../services/users')
const getCacheKey = require('../utils/getCacheKey')

const authRegister = async (req, res, next) => {
  try {
    const { password, ...userData } = req.body
    const hashedPassword = await authService.createPasswordHash(password)
    await usersService.checkDublicateUser(userData)
    const createdUser = await usersService.createNewUser(userData, hashedPassword)
    res.status(201).send(createdUser)
  } catch(err) {
    console.log(`authController.authRegister error ${err}`)
    return next(err)
  }
}

const authLogin = async (req, res, next) => {
  try {
    const userData = req.body
    const { email } = userData
    const findUserResult = await authService.checkExistsUser({ email })
    const hashedPassword = await authService.createPasswordHash(userData.password)
    const token = await authService.checkAuthPassword(findUserResult, hashedPassword)
    res.status(200).send(token)
  } catch (err) {
    console.log(`authController.authLogin error: ${err}`)
    return next(err)
  }
}

const authLogout = async (req, res, next) => {
  try {
    const { token, tokenCacheKey } = req
    await req.cacheClient.set(tokenCacheKey, token, { EX: 300 })
    console.log('test')
    res.sendStatus(200)
  } catch (err) {
    console.log(`authController.authLogout error: ${err}`)
    return next(err)
  }
}

module.exports = {
  authRegister,
  authLogin,
  authLogout
}
