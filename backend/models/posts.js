'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.Comment, { foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.Vote, { foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};