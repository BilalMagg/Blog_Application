'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'user_id' , onDelete: 'CASCADE' , onUpdate: 'CASCADE'});
      User.hasMany(models.Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' , onUpdate: 'CASCADE'});
      User.hasMany(models.Vote, { foreignKey: 'user_id', onDelete: 'CASCADE' , onUpdate: 'CASCADE'});
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};