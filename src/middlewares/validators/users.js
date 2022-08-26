const Joi = require('joi')
const HttpError = require('../../utils/requestResponseErrors')

const {userName: userNamePattern, password: passwordPattern} = require('./patterns')

const userRegister = (req, res, next) => {
  const validateSchema = Joi.object().keys({
    userName: Joi.string().min(5).max(255).regex(userNamePattern).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).regex(passwordPattern).required()
  }) 

  const { error } = validateSchema.validate(req.body)

  if (error) {
    const { message } = error.details[0]
    console.log(`userRegister validation error ${message}`)
    const validationError = new HttpError({ statusCode: 400, message })
    return next(validationError)
  }

  next()
}

const userLogin = (req, res, next) => {
  const validateSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).regex(passwordPattern).required()
  }) 

  const { error } = validateSchema.validate(req.body)

  if (error) {
    const { message } = error.details[0]
    console.log(`userLogin validation error ${message}`)
    const validationError = new HttpError({ statusCode: 401, message: 'Unauthorized' })
    return next(validationError)
  }

  next()
}

const userUpdate = (req, res, next) => {
  const validateSchema = Joi.object().keys({
    userName: Joi.string().min(5).max(255).regex(userNamePattern).required(),
  }) 

  const { error } = validateSchema.validate(req.body)

  if (error) {
    const { message } = error.details[0]
    console.log(`userUpdate validation error ${message}`)
    const validationError = new HttpError({ statusCode: 400, message })
    return next(validationError)
  }

  next()
}

module.exports = {
  userRegister,
  userLogin,
  userUpdate
}
