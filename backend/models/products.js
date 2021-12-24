'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Users, {
        foreignKey: 'users_id',
        as: 'author',
      });
    }
  };
  Products.init({
    photo: DataTypes.STRING,
    steps: DataTypes.STRING,
    product: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    descriptions: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};