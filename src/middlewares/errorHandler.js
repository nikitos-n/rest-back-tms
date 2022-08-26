const errorHandler = async (error, req, res, next) => {
  console.log(`errorHandler middleware error: ${error}`)
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal server error'
  
  res.status(statusCode).send(message)
}

module.exports = errorHandler
