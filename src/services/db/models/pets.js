'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Pets.belongsTo(models.Users, { 
        foreignKey:'userId'
      })

      models.Pets.hasMany(models.PetPhotos, { 
        foreignKey:'petId',
        onDelete: 'CASCADE' 
      })
    }
  }
  Pet.init({
    petName: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pets',
  });
  return Pet;
};