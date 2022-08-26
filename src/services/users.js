const HttpError = require('../utils/requestResponseErrors')
const { Users } = require('./db/models')


const getUsersList = async (searchParams) => {
  try {
    const { offset, limit } = searchParams

    // Check that if one or two params is missed
    if ((!offset && limit ) || (offset && !limit)) {
      console.log('usersService.getUserList err')
      throw new HttpError({ statusCode: 400, message: 'Limit or offset params is not correct' }) 
    }

    let users
    if (offset && limit) {
      users = await Users.findAll({ 
        attributes: ['id', 'userName', 'email', 'photo'],
        offset, 
        limit 
      })
    } else {
      users = await Users.findAll({
        attributes: ['id', 'userName', 'email', 'photo']
      })
    }

    return users
  } catch (err) {
    console.log(`usersService.getUsersList err: ${err}`)
    throw err
  }
}

const getUserData = async (userId) => {
  try {
    const user = await Users.findAll({
      where: { id: userId },
      attributes: ['id', 'userName', 'email', 'photo']
    })

    if (!user[0]) {
      console.log('usersService.getUserData err')
      throw new HttpError({ statusCode: 404, message: 'User not found' })
    }
    return user[0]
  } catch (err) {
    console.log(`usersService.getUserData err: ${err}`)
    throw err
  }
}

const checkDublicateUser = async (userData) => {
  try {
    const findUserResult = await Users.findOne({
      where: {
        email: userData.email
      }
    })
    if (findUserResult) {
      console.log('usersService.checkDublicateUser err')
      throw new HttpError({ statusCode: 409, message: 'User with this email already exists' })
    }
  } catch (err) {
    console.log(`usersService.checkDublicateUser err: ${err}`)
    throw err
  }
}

const checkExistsUser = async (userData) => {
  try {
    const findUserResult = await Users.findOne({
      where: { ...userData },
      attributes: ['id', 'userName', 'email', 'photo']
    })
    if (!findUserResult) {
      console.log('usersService.checkExistsUser err')
      throw new HttpError({ statusCode: 404, message: 'User not found' })
    }
  } catch (err) {
    console.log(`usersService.checkExistsUser err: ${err}`)
    throw err
  }
}

const createNewUser = async (userData, hashedPassword) => {
  try {
    await Users.create({ ...userData, password: hashedPassword })
    return { user: userData }
  } catch (err) {
    console.log(`usersService.createNewUser err: ${err}`)
    throw err
  }
}

const updateUser = async (userId, updateData) => {
  try {
    console.log('userId ', userId)
    console.log('updateData ', updateData)
    const updateResult = await Users.update({ ...updateData }, {
      where: { id: userId },
      returning: true,
      attributes: ['id', 'userName', 'email', 'photo']
    })

    if (!updateResult[0]) {
      console.log('usersService.updateUser err')
      throw new HttpError({ statusCode: 404, message: 'User not found' })
    }

    const { password, ...updatedUser } = updateResult[1][0].dataValues
    return updatedUser
  } catch (err) {
    console.log(`usersService.updateUser err: ${err}`)
    throw err
  }
}

const deleteUser = async (userId) => {
  try {
    const deleteResult = await Users.destroy({
      where: {
        id: userId
      },
      returning: true,
    })

    if (!deleteResult) {
      console.log('usersService.deleteUser err')
      throw new HttpError({ statusCode: 404, message: 'User not found' })
    }
    return { userId }
  } catch (err) {
    console.log(`usersService.deleteUser err: ${err}`)
    throw err
  } 
}


module.exports = {
  getUsersList,
  getUserData,
  checkDublicateUser,
  checkExistsUser,
  createNewUser,
  updateUser,
  deleteUser
}
