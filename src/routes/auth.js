const { Router } = require('express')
const router = Router()


router
  .post('/auth/register', (req, res) => {
    console.log('Register')
    res.sendStatus(201)
  })
  .post('/auth/login', (req, res) => {
    console.log('Login')
    res.sendStatus(200)
  })

module.exports = router
