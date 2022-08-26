const HttpError = require('../utils/requestResponseErrors')
const authService = require('../services/auth')
const getCacheKey = require('../utils/getCacheKey')

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new HttpError({ statusCode: 401, message: 'Unauthorized' })
  }
  try {
    const [_, token] = authorization.split(' ')

    const cacheKey = getCacheKey('authLogoutList', { token })
    const cachedData = await req.cacheClient.get(cacheKey)

    if(cachedData) {
      throw new HttpError({ message: 'Unauthorized' })
    }

    req.user = authService.verifyToken(token)
    req.token = token
    req.tokenCacheKey = cacheKey 
    next()
  } catch (err) {
    console.log(`checkAuth middleware err: ${err}`)
    err.statusCode = 401
    next(err)
  }
}

module.exports = checkAuth
