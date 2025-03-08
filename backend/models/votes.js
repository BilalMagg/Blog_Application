'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Votes.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    vote: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Votes;
};