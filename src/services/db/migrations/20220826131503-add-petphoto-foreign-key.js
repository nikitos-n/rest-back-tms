const tableName = 'PetPhotos'
const referenceTableName = 'Pets'
const columnName = 'petId'


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
