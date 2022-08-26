const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const petsValidator = require('../middlewares/validators/pets')
const petsController = require('../controllers/pets')

const router = Router()

router
  .get('/pets', petsController.getPets)
  .get('/pets/:petId', petsController.getPetById)

  .post('/pets', checkAuth, petsValidator.petCreateUpdate, petsController.createPet)
  .post('/pets/:petId/upload/photo', checkAuth, petsController.uploadPetPhoto)
  
  .put('/pets/:petId', checkAuth, petsValidator.petCreateUpdate, petsController.updatePetById)

  .delete('/pets/:petId', checkAuth, petsController.deletePetById)
  // .delete('/pets/:petId/upload/photo/:photoId', checkAuth, petsController.uploadPetPhoto)

module.exports = router
