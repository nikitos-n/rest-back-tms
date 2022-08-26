class HttpError extends Error {
  constructor({ statusCode = 500, status = 'Fail', message = 'Internal server error' }) {
    super(message)
    this.statusCode = statusCode
    this.status = status
    this.message = message
  }
}

module.exports= HttpError
