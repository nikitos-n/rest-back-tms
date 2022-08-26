const process = require('process')
const fs = require('fs')
const formidable = require('formidable')

const { APP_HOST, APP_PORT } = process.env
const uploadDir = `${process.cwd()}/uploads`

const readUploadedFilesName = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir(uploadDir, (err, files) => {
      if(err) {
        reject(new Error(`Read upload dir error: ${err}`))
      }
      resolve(files)
    })
  })
}

const parseFormData = async (req, uploadedFiles) => {
  const pathArr = req.path.split('/')
  const photoName = `${pathArr[1]}_${pathArr[2]}`

  return new Promise((resolve, reject) => {
    new formidable.IncomingForm({
      uploadDir,
      multiples: false,
      filename: ($, _, { originalFilename }) => `${photoName}_${originalFilename}`
    })
    .parse(req, (err, _, files) => {
      if (err) {
        reject(new Error(`Loading file error: ${err}`))
      }

      if(uploadedFiles.includes(files.photo.newFilename)) {
        reject(new Error(`Photo with this name exists`))
      }

      resolve({ filePath: `http://${APP_HOST}:${APP_PORT}/uploads/${files.photo.newFilename}` })
    })
  })
}

const readFormData = async (req) => {
  try {
    const uploadedFiles = await readUploadedFilesName()
    const parsedResult = await parseFormData(req, uploadedFiles)
    return parsedResult
  } catch (err) {
    console.log(`parseFormData err: ${err}`)
    throw err
  }
}

module.exports = readFormData
