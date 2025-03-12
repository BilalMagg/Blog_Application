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
      this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
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