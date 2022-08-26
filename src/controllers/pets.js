const petsService = require('../services/pets')
const filesService = require('../services/files')

const getPets = async (req, res, next) => {
  try {
    const { offset, limit } = req.query
    const pets = await petsService.getPetsList({ offset, limit })
    res.status(200).send(pets)
  } catch (err) {
    console.log(`petsController.getPets err: ${err}`)
    next(err)
  }
}

const getPetById = async (req, res, next) => {
  try {
  const { petId } = req.params
    const pet = await petsService.getPetData(petId)
    res.status(200).send(pet)
  } catch (err) {
    console.log(`petsController.getPetById err: ${err}`)
    next(err)
  }
}

const createPet = async (req, res, next) => {
  try {
    const catData = req.body
    const userData = req.user
    const createdPet = await petsService.createNewPet(userData, catData)
    res.status(201).send(createdPet)
  } catch (err) {
    console.log(`petsController.createPet err: ${err}`)
    next(err)
  }
}

const updatePetById = async (req, res, next) => {
  try {
    const { petId } = req.params
    const updateData = req.body
    const updatedPet = await petsService.updatePet(petId, updateData)
    res.status(201).send(updatedPet)
  } catch (err) {
    console.log(`petsController.updatePetById err: ${err}`)
    next(err)
  }
}

const uploadPetPhoto = async (req, res, next) => {
  try {
    const { petId } = req.params
    await petsService.checkExistsPet({ id: petId })
    const filePath = await filesService.uploadFile(req)
    await petsService.updatePet(petId, { photo: filePath })
    res.status(200).send({ filePath })
  } catch (err) {
    console.log(`usersController.uploadUserPhoto err: ${err}`)
    next(err)
  }
}

const deletePetById = async (req, res, next) => {
  try {
    const { petId } = req.params
    const deletedResult = await petsService.deletePet(petId)
    res.status(200).send(deletedResult)
  } catch (err) {
    console.log(`petsController.deletePetById err: ${err}`)
    next(err)
  }
}

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePetById, 
  uploadPetPhoto,
  deletePetById
}
