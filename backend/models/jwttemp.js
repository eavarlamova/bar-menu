'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JWTtemp extends Model {
    static associate(models) {
    }
  };
  JWTtemp.init({
    jwt: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JWTtemp',
  });
  return JWTtemp;
};