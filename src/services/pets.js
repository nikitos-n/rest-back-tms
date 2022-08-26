const HttpError = require('../utils/requestResponseErrors')
const { Users, Pets } = require('./db/models')

const getPetsList = async (searchParams) => {
  try {
    const { offset, limit } = searchParams

    // Check that if one or two params is missed
    if ((!offset && limit ) || (offset && !limit)) {
      console.log('usersService.getUserList err')
      throw new HttpError({ statusCode: 400, message: 'Limit or offset params is not correct' }) 
    }

    let pets
    if (offset && limit) {
      pets = await Pets.findAll({ 
        attributes: ['id', 'petName', 'age', 'photo'],
        offset, 
        limit 
      })
    } else {
      pets = await Pets.findAll({
        attributes: ['id', 'petName', 'age', 'photo'],
      })
    }

    return pets
  } catch (err) {
    console.log(`petsService.getPetsList err: ${err}`)
    throw err
  }
}

const getPetData = async (petId) => {
  try {
    const pet = await Pets.findAll({
      where: { id: petId },
      attributes: ['id', 'petName', 'age', 'photo'],
    })

    if (!pet[0]) {
      console.log('petsService.getUserData err')
      throw new HttpError({ statusCode: 404, message: 'Pet not found' })
    }
    return pet[0]
  } catch (err) {
    console.log(`petsService.getPetData err: ${err}`)
    throw err
  }
}

const checkExistsPet = async (petData) => {
  try {
    const findPetResult = await Pets.findOne({
      where: { ...petData },
      attributes: ['id', 'petName', 'age', 'photo']
    })
    if (!findPetResult) {
      console.log('petsService.checkExistsPet err')
      throw new HttpError({ statusCode: 404, message: 'Pet not found' })
    }
  } catch (err) {
    console.log(`usersService.checkExistsUser err: ${err}`)
    throw err
  }
}

const createNewPet = async (userData, catData) => {
  try{
    const { id: userId } = userData 

    const user = await Users.findOne({
      where: {
        id: userId
      }
    })

    const pet = await Pets.create(catData) 
    await user.addPet(pet)
    await user.save()

    return { cat: { ...catData, userId } }
  } catch (err) {
    console.log(`petsService.createPet err: ${err}`)
    throw err
  }
}


const updatePet = async (petId, updateData) => {
  try {
    const updateResult = await Pets.update({ ...updateData }, {
      where: { id: petId },
      returning: true,
      attributes: ['id', 'petName', 'age', 'photo']
    })

    if (!updateResult[0]) {
      console.log('petsService.updatePet err')
      throw new HttpError({ statusCode: 404, message: 'Pet not found' })
    }

    const { id, petName, age, photo } = updateResult[1][0].dataValues
    const updatedPet = { id, petName, age, photo }
    return updatedPet
  } catch (err) {
    console.log(`usersService.updateUser err: ${err}`)
    throw err
  }
}

const deletePet = async (petId) => {
  try {
    const deleteResult = await Pets.destroy({
      where: {
        id: petId
      },
      returning: true,
    })

    if (!deleteResult) {
      console.log('petsService.deletePet err')
      throw new HttpError({ statusCode: 404, message: 'Pet not found' })
    }
    return { petId }
  } catch (err) {
    console.log(`usersService.deleteUser err: ${err}`)
    throw err
  } 
}


module.exports = {
  getPetsList,
  getPetData,
  checkExistsPet,
  createNewPet,
  updatePet,
  deletePet
}
