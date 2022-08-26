const HttpError = require('../utils/requestResponseErrors')
const authService = require('../services/auth')

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new HttpError({ statusCode: 401, message: 'Unauthorized' })
  }
  try {
    const [_, token] = authorization.split(' ')
    req.user = authService.verifyToken(token)
    next()
  } catch (err) {
    console.log(`checkAuth middleware err: ${err}`)
    err.statusCode = 401
    next(err)
  }
}

module.exports = checkAuth
