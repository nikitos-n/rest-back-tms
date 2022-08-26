const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const HttpError = require('../utils/requestResponseErrors')
const { Users } = require('./db/models')

const { TOKEN_KEYWORD, PASSWORD_SALT } = process.env

const createPasswordHash = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, PASSWORD_SALT, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

const generateToken = (userData) => {
  const token = jwt.sign(userData, TOKEN_KEYWORD, { expiresIn: '5m' })
  return token
}

const verifyToken = (token) => {
  const tokenData = jwt.verify(token, TOKEN_KEYWORD)
  return tokenData
}

const checkAuthPassword = async (findUserResult, hashedPassword) => {
  try {
    if(findUserResult.password === hashedPassword) {
      const { id, userName, email } = findUserResult
      const token = generateToken({ id, userName, email })
      return { token }
    } else {
      console.log('authService.checkAuthPassword err')
      throw new HttpError({ statusCode: 401, message: 'Unauthorized' })
    }
  } catch (err) {
    console.log(`authService.checkAuthPassword err: ${err}`)
    throw err
  }
}

const checkExistsUser = async (userData) => {
  try {
    const findUserResult = await Users.findOne({
      where: { ...userData }
    })
    if (!findUserResult) {
      console.log('usersService.checkExistsUser err')
      throw new HttpError({ statusCode: 401, message: 'Unauthorized' })
    }
    return findUserResult.dataValues
  } catch (err) {
    console.log(`usersService.checkExistsUser err: ${err}`)
    throw err
  }
}

module.exports = {
  createPasswordHash,
  checkAuthPassword,
  generateToken,
  verifyToken,
  checkExistsUser
}
