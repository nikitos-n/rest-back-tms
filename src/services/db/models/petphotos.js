'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.PetPhotos.belongsTo(models.Pets, { 
        foreignKey:'petId'
      })
    }
  }
  PetPhoto.init({
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PetPhotos',
  });
  return PetPhoto;
};