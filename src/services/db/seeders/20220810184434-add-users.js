const { faker }  = require('@faker-js/faker')

const tableName = 'Users'

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = new Array(5).fill(null).map(user => ({
      userName: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: 'test123',
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    
    await queryInterface.bulkInsert(tableName, users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {})
  }
};