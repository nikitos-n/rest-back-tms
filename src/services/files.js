const readFormData = require('../utils/readFormData')
const HttpError = require('../utils/requestResponseErrors')

const uploadFile = async (req) => {
  try {
    const { filePath } = await readFormData(req)
    return filePath
  } 
  catch (err) {
    const { message } = err
    console.log(`uploadPhoto validation error ${message}`)
    const uploadError = new HttpError({ statusCode: 500, message })
    throw uploadError
  }
}

module.exports = {
  uploadFile
}
