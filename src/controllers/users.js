const usersService = require('../services/users')
const filesService = require('../services/files')
const getCacheKey = require('../utils/getCacheKey')

const getUsers = async (req, res, next) => {
  try {
    const { offset, limit } = req.query
    const cacheKey = getCacheKey('getUsers', { offset, limit })
    const cachedData = await req.cacheClient.get(cacheKey)
    let users = []
    if (!cachedData) {
      users = await usersService.getUsersList({ offset, limit })
      await req.cacheClient.set(cacheKey, JSON.stringify(users), { EX: 60 })
      res.set('X-DATA-SOURCE', 'DATABASE')
    } else {
      users = JSON.parse(cachedData)
      res.set('X-DATA-SOURCE', 'CACHE')
    }
    res.status(200).send(users)
  } catch (err) {
    console.log(`usersController.getUsers err: ${err}`)
    next(err)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await usersService.getUserData(userId)
    // const cats = await catModel.fetchCatByOwnerId(userId)
    // user.cats = cats
    res.status(200).send(user)
  } catch (err) {
    console.log(`usersController.getUserById err: ${err}`)
    next(err)
  }
}


const updateUserById = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { userName } = req.body
    const updatedResult = await usersService.updateUser(userId, { userName })
    res.status(200).send(updatedResult)
  } catch (err) {
    console.log(`usersController.updateUserById err: ${err}`)
    next(err)
  }
}

const uploadUserPhoto = async (req, res, next) => {
  try {
    const { userId } = req.params
    await usersService.checkExistsUser({ id: userId })
    const filePath = await filesService.uploadFile(req)
    await usersService.updateUser(userId, { photo: filePath })
    res.status(200).send({ filePath })
  } catch (err) {
    console.log(`usersController.uploadUserPhoto err: ${err}`)
    next(err)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params
    const deletedResult = await usersService.deleteUser(userId)
    res.status(200).send(deletedResult)
  } catch (err) {
    console.log(`usersController.deleteUserById err: ${err}`)
    next(err)
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  uploadUserPhoto,
  deleteUserById
}
