const tableName = 'Pets'
const referenceTableName = 'Users'
const columnName = 'userId'


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.addColumn(
        tableName,
        columnName,
        {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: { model: referenceTableName, key: 'id' }
        }, 
        { transaction: t }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName)
  }
};
