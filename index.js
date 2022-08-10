require('dotenv').config()

const http = require('http')
const express = require('express')
const authRouter = require('./src/routes/auth')

const { APP_PORT: PORT, APP_HOST: HOST } = process.env

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authRouter)

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
