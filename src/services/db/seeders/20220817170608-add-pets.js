const { faker }  = require('@faker-js/faker')
const { Users } = require('../models')

const tableName = 'Pets'

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await Users.findAll()

    const pets = new Array(10).fill(null).map(user => ({
      petName: faker.name.firstName(),
      age: faker.datatype.number({ min: 0, max: 30 }),
      userId: users[Math.floor(Math.random() * users.length)].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }))


    await queryInterface.bulkInsert(tableName, pets, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {})
  }
};
