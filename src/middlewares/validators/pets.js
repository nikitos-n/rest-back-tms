const Joi = require('joi')
const HttpError = require('../../utils/requestResponseErrors')

const petCreateUpdate = (req, res, next) => {
  const validateSchema = Joi.object().keys({
    petName: Joi.string().required(),
    age: Joi.number().min(0).max(30).required()
  }) 

  const { error } = validateSchema.validate(req.body)

  if (error) {
    const { message } = error.details[0]
    console.log(`petCreateUpdate validation error ${message}`)
    const validationError = new HttpError({ statusCode: 400, message })
    return next(validationError)
  }

  next()
}

module.exports = {
  petCreateUpdate
}
