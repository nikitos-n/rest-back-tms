require('dotenv').config()

const http = require('http')
const express = require('express')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
// const authRouter = require('../../src/routes/auth')
// const usersRouter = require('../../src/routes/users')
// const petsRouter = require('../../src/routes/pets')
// const errorHandler = require('../../src/middlewares/errorHandler')

// const { sequelize } = require('../../src/services/db/models')
// const getCacheClient = require('../../src/services/cache')

const { APP_PORT: PORT } = process.env

const app = express()
const server = http.createServer(app)

const swaggerPath = path.resolve(__dirname, '../swagger.yml')
const swaggerDocument = yaml.load(swaggerPath)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(async (req, res, next) => {
//   req.cacheClient = await getCacheClient()
//   next()
// })

// app.use('/api', authRouter)
// app.use('/api', usersRouter)
// app.use('/api', petsRouter)

// app.use(errorHandler)

async function main() {
  try {
      // await sequelize.sync({ force: false })
      // console.log('Connection has been established successfully.')
      
      server.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`)
      })
  } catch (error) {
      console.error('Unable to connect to the database:', error)
  }
}

main()
